-- Enable pgvector extension
create extension if not exists vector with schema extensions;

-- Rule chunks table for vector search
create table if not exists rule_chunks (
  id bigserial primary key,
  doc_slug text not null,
  doc_title text not null,
  section_heading text,
  content text not null,
  token_count int not null default 0,
  embedding vector(1024),
  created_at timestamptz default now()
);

-- Index for fast similarity search
create index if not exists rule_chunks_embedding_idx
  on rule_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 20);

-- Index for doc_slug lookups
create index if not exists rule_chunks_doc_slug_idx on rule_chunks (doc_slug);

-- Similarity search function
create or replace function match_rule_chunks(
  query_embedding vector(1024),
  match_threshold float default 0.3,
  match_count int default 8
)
returns table (
  id bigint,
  doc_slug text,
  doc_title text,
  section_heading text,
  content text,
  similarity float
)
language sql stable
as $$
  select
    rule_chunks.id,
    rule_chunks.doc_slug,
    rule_chunks.doc_title,
    rule_chunks.section_heading,
    rule_chunks.content,
    1 - (rule_chunks.embedding <=> query_embedding) as similarity
  from rule_chunks
  where 1 - (rule_chunks.embedding <=> query_embedding) > match_threshold
  order by rule_chunks.embedding <=> query_embedding
  limit match_count;
$$;
