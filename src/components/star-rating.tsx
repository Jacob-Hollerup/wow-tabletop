export default function StarRating({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-16 text-muted">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 w-2.5 rounded-sm ${
              i < value ? "bg-gold" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
