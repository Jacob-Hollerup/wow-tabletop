-- Rule chunks table with full-text search
create table if not exists rule_chunks (
  id bigserial primary key,
  doc_slug text not null,
  doc_title text not null,
  section_heading text,
  content text not null,
  token_count int not null default 0,
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(doc_title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(section_heading, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) stored,
  created_at timestamptz default now()
);

-- GIN index for fast full-text search
create index if not exists rule_chunks_search_idx on rule_chunks using gin (search_vector);

-- Index for doc_slug lookups
create index if not exists rule_chunks_doc_slug_idx on rule_chunks (doc_slug);

-- Full-text search function
create or replace function search_rule_chunks(
  query text,
  match_count int default 8
)
returns table (
  id bigint,
  doc_slug text,
  doc_title text,
  section_heading text,
  content text,
  rank real
)
language sql stable
as $$
  select
    rule_chunks.id,
    rule_chunks.doc_slug,
    rule_chunks.doc_title,
    rule_chunks.section_heading,
    rule_chunks.content,
    ts_rank_cd(rule_chunks.search_vector, plainto_tsquery('english', query)) as rank
  from rule_chunks
  where rule_chunks.search_vector @@ plainto_tsquery('english', query)
  order by rank desc
  limit match_count;
$$;
