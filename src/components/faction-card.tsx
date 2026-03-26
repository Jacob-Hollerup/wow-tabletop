/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface FactionCardProps {
  href: string;
  name: string;
  crest: string;
  color?: string;
  subtitle?: string;
  meta?: React.ReactNode;
  badge?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function FactionCard({
  href,
  name,
  crest,
  color,
  subtitle,
  meta,
  badge,
  style,
  className,
}: FactionCardProps) {
  const hasColoredBorder = !!color;

  return (
    <Link
      href={href}
      className={`group flex items-start gap-4 border border-border bg-surface p-5 transition-colors hover:bg-surface-hover ${
        hasColoredBorder ? "rounded-r-xl rounded-l-none" : "rounded-xl"
      } ${className ?? ""}`}
      style={{
        ...(hasColoredBorder && {
          borderLeftColor: color,
          borderLeftWidth: "3px",
        }),
        ...style,
      }}
    >
      <img
        src={crest}
        alt=""
        width={40}
        height={40}
        className="mt-0.5 shrink-0 rounded object-contain"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-bold text-foreground">
            {name}
          </h3>
          {badge}
        </div>
        {subtitle && (
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        )}
        {meta && (
          <div className="mt-2 flex items-center gap-3 text-xs text-muted">
            {meta}
          </div>
        )}
      </div>
      <span className="mt-1 shrink-0 text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
        &rarr;
      </span>
    </Link>
  );
}
