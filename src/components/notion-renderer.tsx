import { Fragment, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { NotionBlock, NotionRichText } from "@/lib/notion.functions";

function RichText({ items }: { items: NotionRichText[] | undefined }) {
  if (!items || items.length === 0) return null;
  return (
    <>
      {items.map((t, i) => {
        let node: ReactNode = t.plain_text;
        const a = t.annotations;
        if (a?.code) node = <code className="rounded bg-muted px-1 py-0.5 text-[0.9em]">{node}</code>;
        if (a?.bold) node = <strong>{node}</strong>;
        if (a?.italic) node = <em>{node}</em>;
        if (a?.underline) node = <span className="underline underline-offset-2">{node}</span>;
        if (a?.strikethrough) node = <span className="line-through">{node}</span>;
        if (t.href) {
          node = (
            <a
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              {node}
            </a>
          );
        }
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}

type ListItemBlock = NotionBlock & { _listType: "bulleted" | "numbered" };

// Group consecutive list items so we can render <ul>/<ol> wrappers.
function groupBlocks(blocks: NotionBlock[]): (NotionBlock | ListItemBlock[])[] {
  const out: (NotionBlock | ListItemBlock[])[] = [];
  let buffer: ListItemBlock[] = [];
  let bufferType: "bulleted" | "numbered" | null = null;

  const flush = () => {
    if (buffer.length) {
      out.push(buffer);
      buffer = [];
      bufferType = null;
    }
  };

  for (const b of blocks) {
    const listType =
      b.type === "bulleted_list_item"
        ? "bulleted"
        : b.type === "numbered_list_item"
          ? "numbered"
          : null;
    if (listType) {
      if (bufferType && bufferType !== listType) flush();
      bufferType = listType;
      buffer.push({ ...b, _listType: listType });
    } else {
      flush();
      out.push(b);
    }
  }
  flush();
  return out;
}

function getRichText(block: NotionBlock, key: string): NotionRichText[] | undefined {
  const payload = block[key] as { rich_text?: NotionRichText[] } | undefined;
  return payload?.rich_text;
}

function BlockNode({ block }: { block: NotionBlock }) {
  const children = block.children ?? [];
  switch (block.type) {
    case "paragraph": {
      const rt = getRichText(block, "paragraph");
      const hasText = rt && rt.length > 0;
      if (!hasText && children.length === 0) return <div className="h-2" />;
      return (
        <div className="text-[15px] leading-relaxed text-foreground/90">
          {hasText && <p><RichText items={rt} /></p>}
          {children.length > 0 && (
            <div className="mt-2 border-l border-border pl-4">
              <NotionRenderer blocks={children} />
            </div>
          )}
        </div>
      );
    }
    case "heading_1":
      return (
        <h2 className="mt-10 font-display text-3xl font-bold tracking-tight">
          <RichText items={getRichText(block, "heading_1")} />
        </h2>
      );
    case "heading_2":
      return (
        <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-primary">
          <RichText items={getRichText(block, "heading_2")} />
        </h3>
      );
    case "heading_3":
      return (
        <h4 className="mt-6 font-display text-lg font-bold tracking-tight">
          <RichText items={getRichText(block, "heading_3")} />
        </h4>
      );
    case "quote":
      return (
        <blockquote className="my-4 border-l-4 border-primary/50 bg-accent/40 px-5 py-3 text-[15px] italic text-foreground/90">
          <RichText items={getRichText(block, "quote")} />
          {children.length > 0 && <NotionRenderer blocks={children} />}
        </blockquote>
      );
    case "callout": {
      const payload = block.callout as
        | { rich_text?: NotionRichText[]; icon?: { emoji?: string } }
        | undefined;
      return (
        <div className="my-4 flex gap-3 rounded-xl border border-border bg-accent/40 px-4 py-3">
          {payload?.icon?.emoji && (
            <span className="text-lg leading-6">{payload.icon.emoji}</span>
          )}
          <div className="text-[15px] leading-relaxed">
            <RichText items={payload?.rich_text} />
            {children.length > 0 && (
              <div className="mt-2">
                <NotionRenderer blocks={children} />
              </div>
            )}
          </div>
        </div>
      );
    }
    case "divider":
      return <hr className="my-6 border-border" />;
    case "code": {
      const payload = block.code as { rich_text?: NotionRichText[] } | undefined;
      return (
        <pre className="my-4 overflow-x-auto rounded-xl border border-border bg-muted/60 p-4 text-xs">
          <code>{payload?.rich_text?.map((t) => t.plain_text).join("")}</code>
        </pre>
      );
    }
    case "to_do": {
      const payload = block.to_do as
        | { rich_text?: NotionRichText[]; checked?: boolean }
        | undefined;
      return (
        <label className="flex items-start gap-2 py-1 text-[15px]">
          <input
            type="checkbox"
            defaultChecked={!!payload?.checked}
            className="mt-1 h-4 w-4 accent-primary"
            readOnly
          />
          <span className={payload?.checked ? "text-muted-foreground line-through" : ""}>
            <RichText items={payload?.rich_text} />
          </span>
        </label>
      );
    }
    case "toggle": {
      const payload = block.toggle as { rich_text?: NotionRichText[] } | undefined;
      return (
        <Accordion type="multiple" className="my-2">
          <AccordionItem
            value={block.id}
            className="overflow-hidden rounded-xl border border-border bg-background px-4"
          >
            <AccordionTrigger className="py-3 text-left font-semibold hover:no-underline">
              <RichText items={payload?.rich_text} />
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-0">
              {children.length > 0 ? (
                <NotionRenderer blocks={children} />
              ) : (
                <p className="text-sm text-muted-foreground">No details.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }
    case "image": {
      const payload = block.image as
        | {
            file?: { url: string };
            external?: { url: string };
            caption?: NotionRichText[];
          }
        | undefined;
      const url = payload?.file?.url ?? payload?.external?.url;
      if (!url) return null;
      return (
        <figure className="my-5">
          <img src={url} alt="" className="w-full rounded-xl border border-border" />
          {payload?.caption && payload.caption.length > 0 && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              <RichText items={payload.caption} />
            </figcaption>
          )}
        </figure>
      );
    }
    case "bookmark":
    case "embed":
    case "link_preview": {
      const payload = block[block.type] as { url?: string } | undefined;
      if (!payload?.url) return null;
      return (
        <a
          href={payload.url}
          target="_blank"
          rel="noreferrer"
          className="my-3 block truncate rounded-lg border border-border bg-card px-4 py-3 text-sm text-primary hover:bg-accent"
        >
          {payload.url}
        </a>
      );
    }
    case "child_page": {
      const payload = block.child_page as { title?: string } | undefined;
      return (
        <div className="my-2 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
          📄 {payload?.title ?? "Untitled page"}
        </div>
      );
    }
    default:
      return null;
  }
}

function ListItemNode({ item }: { item: ListItemBlock }) {
  const payload = item[item.type] as { rich_text?: NotionRichText[] } | undefined;
  return (
    <li className="text-[15px] leading-relaxed text-foreground/90">
      <RichText items={payload?.rich_text} />
      {item.children && item.children.length > 0 && (
        <div className="mt-1">
          <NotionRenderer blocks={item.children} />
        </div>
      )}
    </li>
  );
}

export type InlineEmbed = {
  match: RegExp | string;
  render: () => ReactNode;
  position?: "after" | "replace";
};

function blockPlainText(block: NotionBlock): string {
  const payload = block[block.type] as { rich_text?: NotionRichText[] } | undefined;
  return payload?.rich_text?.map((t) => t.plain_text).join(" ") ?? "";
}

function matchEmbed(text: string, embeds: InlineEmbed[] | undefined) {
  if (!embeds || !text) return undefined;
  const lower = text.toLowerCase();
  return embeds.find((e) =>
    typeof e.match === "string" ? lower.includes(e.match.toLowerCase()) : e.match.test(text),
  );
}

export function NotionRenderer({
  blocks,
  inlineEmbeds,
}: {
  blocks: NotionBlock[];
  inlineEmbeds?: InlineEmbed[];
}) {
  const grouped = groupBlocks(blocks);
  return (
    <div className="space-y-3">
      {grouped.map((entry, idx) => {
        if (Array.isArray(entry)) {
          const type = entry[0]._listType;
          const className =
            type === "bulleted"
              ? "list-disc space-y-1 pl-6"
              : "list-decimal space-y-1 pl-6";
          const items = entry.map((it) => {
            const embed = matchEmbed(blockPlainText(it), inlineEmbeds);
            return (
              <Fragment key={it.id}>
                {embed?.position === "replace" ? null : <ListItemNode item={it} />}
                {embed && <li className="list-none py-2">{embed.render()}</li>}
              </Fragment>
            );
          });
          if (type === "numbered") {
            return (
              <ol key={idx} className={className}>
                {items}
              </ol>
            );
          }
          return (
            <ul key={idx} className={className}>
              {items}
            </ul>
          );
        }
        const embed = matchEmbed(blockPlainText(entry), inlineEmbeds);
        return (
          <Fragment key={entry.id}>
            {embed?.position === "replace" ? null : <BlockNode block={entry} />}
            {embed && <div className="my-4">{embed.render()}</div>}
          </Fragment>
        );
      })}
    </div>
  );
}
