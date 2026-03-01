-- Army Builder tables
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- 1. army_lists: one row per saved army
create table army_lists (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null default 'Untitled Army',
  faction_id  text not null,
  battle_size text not null default 'standard',
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_army_lists_user_id on army_lists(user_id);

-- 2. army_list_units: units within an army list
create table army_list_units (
  id            uuid primary key default gen_random_uuid(),
  army_list_id  uuid not null references army_lists(id) on delete cascade,
  unit_name     text not null,
  loadout       text,
  hero_spec     text,
  hero_level    integer check (hero_level is null or hero_level between 1 and 3),
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

create index idx_army_list_units_army on army_list_units(army_list_id);

-- 3. Auto-update updated_at on army_lists
create or replace function update_modified_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on army_lists
  for each row execute function update_modified_column();

-- 4. Row Level Security
alter table army_lists enable row level security;

create policy "Users can view their own armies"
  on army_lists for select using (auth.uid() = user_id);

create policy "Users can create their own armies"
  on army_lists for insert with check (auth.uid() = user_id);

create policy "Users can update their own armies"
  on army_lists for update using (auth.uid() = user_id);

create policy "Users can delete their own armies"
  on army_lists for delete using (auth.uid() = user_id);

alter table army_list_units enable row level security;

create policy "Users can view units in their armies"
  on army_list_units for select
  using (army_list_id in (select id from army_lists where user_id = auth.uid()));

create policy "Users can insert units in their armies"
  on army_list_units for insert
  with check (army_list_id in (select id from army_lists where user_id = auth.uid()));

create policy "Users can update units in their armies"
  on army_list_units for update
  using (army_list_id in (select id from army_lists where user_id = auth.uid()));

create policy "Users can delete units in their armies"
  on army_list_units for delete
  using (army_list_id in (select id from army_lists where user_id = auth.uid()));
