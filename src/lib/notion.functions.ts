import { createServerFn } from "@tanstack/react-start";

export type NotionRichText = {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
};

export type NotionJson =
  | string
  | number
  | boolean
  | null
  | NotionJson[]
  | { [k: string]: NotionJson };

export type NotionBlock = {
  id: string;
  type: string;
  has_children: boolean;
  children?: NotionBlock[];
  [key: string]: NotionJson | NotionBlock[] | undefined;
};

const GATEWAY = "https://connector-gateway.lovable.dev/notion/v1";
const MAX_DEPTH = 6;

async function fetchChildren(
  blockId: string,
  depth: number,
  lovableKey: string,
  notionKey: string,
): Promise<NotionBlock[]> {
  const results: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const url = new URL(`${GATEWAY}/blocks/${blockId}/children`);
    url.searchParams.set("page_size", "100");
    if (cursor) url.searchParams.set("start_cursor", cursor);
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": notionKey,
      },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Notion gateway ${res.status}: ${body}`);
    }
    const data = (await res.json()) as {
      results: NotionBlock[];
      has_more: boolean;
      next_cursor: string | null;
    };
    for (const block of data.results) {
      if (block.has_children && depth < MAX_DEPTH) {
        block.children = await fetchChildren(block.id, depth + 1, lovableKey, notionKey);
      }
      results.push(block);
    }
    cursor = data.has_more ? data.next_cursor ?? undefined : undefined;
  } while (cursor);
  return results;
}

export const getNotionPage = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => {
    const obj = data as { pageId?: string };
    if (!obj?.pageId || typeof obj.pageId !== "string") {
      throw new Error("pageId is required");
    }
    return { pageId: obj.pageId };
  })
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const notionKey = process.env.NOTION_API_KEY;
    if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
    if (!notionKey) throw new Error("NOTION_API_KEY is not configured");

    // Fetch page metadata (for title).
    const pageRes = await fetch(`${GATEWAY}/pages/${data.pageId}`, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": notionKey,
      },
    });
    if (!pageRes.ok) {
      const body = await pageRes.text();
      throw new Error(`Notion page ${pageRes.status}: ${body}`);
    }
    const page = (await pageRes.json()) as {
      properties?: Record<string, { title?: NotionRichText[] }>;
    };
    const titleProp = page.properties
      ? Object.values(page.properties).find((p) => Array.isArray(p.title))
      : undefined;
    const title =
      titleProp?.title?.map((t) => t.plain_text).join("") || "Untitled";

    const blocks = await fetchChildren(data.pageId, 0, lovableKey, notionKey);
    return { title, blocks };
  });
