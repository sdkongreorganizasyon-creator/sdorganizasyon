-- SDKONGRE Supabase initial schema
-- Apply first to staging, then production.
-- Supabase Auth users are managed in auth.users.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum (
      'draft',
      'review',
      'scheduled',
      'published',
      'archived'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum (
      'super_admin',
      'admin',
      'editor',
      'content_author',
      'sales_ops',
      'viewer'
    );
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'viewer',
  active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text not null,
  locale text not null default 'tr',
  value_json jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (key, locale)
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  locale text not null default 'tr',
  title text not null,
  slug text not null,
  eyebrow text,
  summary text,
  content_json jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'draft',
  seo_json jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, page_key),
  unique (locale, slug)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  alt_text text,
  focal_point jsonb not null default '{"x":50,"y":50}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket, path)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('physical', 'digital')),
  locale text not null default 'tr',
  title text not null,
  slug text not null,
  summary text,
  body_json jsonb not null default '{}'::jsonb,
  icon text,
  cover_media_id uuid references public.media_assets(id) on delete set null,
  order_no integer not null default 0,
  status public.content_status not null default 'draft',
  seo_json jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, category, slug)
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'tr',
  step_key text not null,
  title text not null,
  subtitle text,
  description text,
  content_json jsonb not null default '{}'::jsonb,
  icon text,
  order_no integer not null default 0,
  status public.content_status not null default 'draft',
  scheduled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, step_key)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'tr',
  title text not null,
  slug text not null,
  client_name text,
  event_type text,
  city text,
  venue text,
  start_date date,
  end_date date,
  summary text not null,
  challenge text,
  solution text,
  result_json jsonb not null default '{}'::jsonb,
  cover_media_id uuid references public.media_assets(id) on delete set null,
  featured boolean not null default false,
  status public.content_status not null default 'draft',
  seo_json jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, slug),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.project_services (
  project_id uuid not null references public.projects(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  primary key (project_id, service_id)
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  media_id uuid not null references public.media_assets(id) on delete cascade,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  caption text,
  order_no integer not null default 0,
  created_at timestamptz not null default now(),
  unique (project_id, media_id)
);

create table if not exists public.references (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'tr',
  name text not null,
  logo_media_id uuid references public.media_assets(id) on delete set null,
  website text,
  category text,
  story text,
  order_no integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.legal_documents (
  id uuid primary key default gen_random_uuid(),
  document_key text not null,
  locale text not null default 'tr',
  title text not null,
  slug text not null,
  body_json jsonb not null default '{}'::jsonb,
  version text not null default '1.0',
  effective_date date,
  status public.content_status not null default 'draft',
  seo_json jsonb not null default '{}'::jsonb,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (locale, document_key),
  unique (locale, slug)
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  consent_at timestamptz not null,
  consent_version text not null,
  marketing_consent boolean not null default false,
  status text not null default 'new'
    check (status in ('new','reviewing','contacted','resolved','archived')),
  assigned_to uuid references public.profiles(id) on delete set null,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  event_date date,
  event_end_date date,
  city text,
  venue text,
  attendee_count integer check (attendee_count is null or attendee_count > 0),
  services_json jsonb not null default '[]'::jsonb,
  notes text,
  consent_at timestamptz not null,
  consent_version text not null,
  marketing_consent boolean not null default false,
  source text,
  status text not null default 'new'
    check (status in ('new','reviewing','contacted','preparing','sent','won','lost','archived')),
  assigned_to uuid references public.profiles(id) on delete set null,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (event_end_date is null or event_date is null or event_end_date >= event_date)
);

create table if not exists public.audit_logs (
  id bigint generated by default as identity primary key,
  actor_id uuid,
  action text not null,
  entity_type text not null,
  entity_id text,
  before_json jsonb not null default '{}'::jsonb,
  after_json jsonb not null default '{}'::jsonb,
  ip_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.content_versions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  version_no integer not null,
  snapshot_json jsonb not null,
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (entity_type, entity_id, version_no)
);

create table if not exists public.form_events (
  id bigint generated by default as identity primary key,
  form_type text not null check (form_type in ('contact', 'quote')),
  request_id uuid,
  event_type text not null,
  provider_message_id text,
  error_code text,
  ip_hash text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_pages_status on public.pages(status, locale);
create index if not exists idx_services_status on public.services(status, category, locale, order_no);
create index if not exists idx_process_steps_status on public.process_steps(status, locale, order_no);
create index if not exists idx_projects_status on public.projects(status, locale, start_date desc);
create index if not exists idx_references_visible on public.references(visible, locale, order_no);
create index if not exists idx_legal_documents_status on public.legal_documents(status, locale);
create index if not exists idx_contact_messages_status on public.contact_messages(status, created_at desc);
create index if not exists idx_quote_requests_status on public.quote_requests(status, created_at desc);
create index if not exists idx_form_events_rate_limit on public.form_events(form_type, ip_hash, event_type, created_at desc);
create index if not exists idx_audit_logs_created_at on public.audit_logs(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'site_settings',
    'pages',
    'media_assets',
    'services',
    'process_steps',
    'projects',
    'references',
    'legal_documents',
    'contact_messages',
    'quote_requests'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name,
      table_name
    );
  end loop;
end
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, active)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    'viewer',
    true
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles p
  where p.id = auth.uid()
    and p.active = true
  limit 1;
$$;

create or replace function public.has_role(allowed_roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = any(allowed_roles), false);
$$;

create or replace function public.write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  row_id text;
begin
  if tg_op = 'DELETE' then
    row_id := coalesce(to_jsonb(old) ->> 'id', to_jsonb(old) ->> 'key');
  else
    row_id := coalesce(to_jsonb(new) ->> 'id', to_jsonb(new) ->> 'key');
  end if;

  insert into public.audit_logs (
    actor_id,
    action,
    entity_type,
    entity_id,
    before_json,
    after_json
  )
  values (
    auth.uid(),
    lower(tg_op),
    tg_table_name,
    row_id,
    case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) else '{}'::jsonb end,
    case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) else '{}'::jsonb end
  );

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

create or replace function public.write_content_version()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  next_version integer;
begin
  if tg_op = 'UPDATE' and to_jsonb(old) is distinct from to_jsonb(new) then
    select coalesce(max(version_no), 0) + 1
      into next_version
      from public.content_versions
     where entity_type = tg_table_name
       and entity_id = new.id;

    insert into public.content_versions (
      entity_type,
      entity_id,
      version_no,
      snapshot_json,
      created_by
    )
    values (
      tg_table_name,
      new.id,
      next_version,
      to_jsonb(old),
      auth.uid()
    );
  end if;

  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'pages',
    'services',
    'process_steps',
    'projects',
    'references',
    'legal_documents',
    'site_settings',
    'media_assets'
  ]
  loop
    execute format('drop trigger if exists audit_%I on public.%I', table_name, table_name);
    execute format(
      'create trigger audit_%I after insert or update or delete on public.%I for each row execute function public.write_audit_log()',
      table_name,
      table_name
    );
  end loop;

  foreach table_name in array array[
    'pages',
    'services',
    'process_steps',
    'projects',
    'legal_documents'
  ]
  loop
    execute format('drop trigger if exists version_%I on public.%I', table_name, table_name);
    execute format(
      'create trigger version_%I after update on public.%I for each row execute function public.write_content_version()',
      table_name,
      table_name
    );
  end loop;
end
$$;


create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and not public.has_role(array['super_admin']::public.user_role[]) then
    new.role := old.role;
    new.active := old.active;
  end if;

  return new;
end;
$$;

drop trigger if exists protect_profile_privileges on public.profiles;
create trigger protect_profile_privileges
before update on public.profiles
for each row execute function public.protect_profile_privileges();

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.pages enable row level security;
alter table public.media_assets enable row level security;
alter table public.services enable row level security;
alter table public.process_steps enable row level security;
alter table public.projects enable row level security;
alter table public.project_services enable row level security;
alter table public.project_media enable row level security;
alter table public.references enable row level security;
alter table public.legal_documents enable row level security;
alter table public.contact_messages enable row level security;
alter table public.quote_requests enable row level security;
alter table public.audit_logs enable row level security;
alter table public.content_versions enable row level security;
alter table public.form_events enable row level security;

-- Profiles
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (
  id = auth.uid()
  or public.has_role(array['super_admin','admin']::public.user_role[])
);

drop policy if exists "profiles_update_own_name" on public.profiles;
create policy "profiles_update_own_name"
on public.profiles for update
to authenticated
using (
  id = auth.uid()
  or public.has_role(array['super_admin']::public.user_role[])
)
with check (
  id = auth.uid()
  or public.has_role(array['super_admin']::public.user_role[])
);

-- Global settings
drop policy if exists "settings_public_read" on public.site_settings;
create policy "settings_public_read"
on public.site_settings for select
to anon, authenticated
using (key = 'global');

drop policy if exists "settings_admin_write" on public.site_settings;
create policy "settings_admin_write"
on public.site_settings for all
to authenticated
using (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
);

-- Reusable content policies
drop policy if exists "pages_public_read" on public.pages;
create policy "pages_public_read"
on public.pages for select
to anon, authenticated
using (
  status = 'published'
  or public.has_role(array[
    'super_admin','admin','editor','content_author','viewer'
  ]::public.user_role[])
);

drop policy if exists "pages_editor_insert" on public.pages;
create policy "pages_editor_insert"
on public.pages for insert
to authenticated
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
  or (
    public.current_user_role() = 'content_author'
    and status in ('draft','review')
  )
);

drop policy if exists "pages_editor_update" on public.pages;
create policy "pages_editor_update"
on public.pages for update
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
  or (
    public.current_user_role() = 'content_author'
    and status in ('draft','review')
  )
);

drop policy if exists "pages_admin_delete" on public.pages;
create policy "pages_admin_delete"
on public.pages for delete
to authenticated
using (
  public.has_role(array['super_admin','admin']::public.user_role[])
);

drop policy if exists "services_public_read" on public.services;
create policy "services_public_read"
on public.services for select
to anon, authenticated
using (
  status = 'published'
  or public.has_role(array[
    'super_admin','admin','editor','content_author','viewer'
  ]::public.user_role[])
);

drop policy if exists "services_editor_insert" on public.services;
create policy "services_editor_insert"
on public.services for insert
to authenticated
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
  or (
    public.current_user_role() = 'content_author'
    and status in ('draft','review')
  )
);

drop policy if exists "services_editor_update" on public.services;
create policy "services_editor_update"
on public.services for update
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
  or (
    public.current_user_role() = 'content_author'
    and status in ('draft','review')
  )
);

drop policy if exists "services_admin_delete" on public.services;
create policy "services_admin_delete"
on public.services for delete
to authenticated
using (
  public.has_role(array['super_admin','admin']::public.user_role[])
);

drop policy if exists "process_public_read" on public.process_steps;
create policy "process_public_read"
on public.process_steps for select
to anon, authenticated
using (
  status = 'published'
  or public.has_role(array[
    'super_admin','admin','editor','content_author','viewer'
  ]::public.user_role[])
);

drop policy if exists "process_editor_write" on public.process_steps;
create policy "process_editor_write"
on public.process_steps for all
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
  or (
    public.current_user_role() = 'content_author'
    and status in ('draft','review')
  )
);

drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
on public.projects for select
to anon, authenticated
using (
  status = 'published'
  or public.has_role(array[
    'super_admin','admin','editor','content_author','viewer'
  ]::public.user_role[])
);

drop policy if exists "projects_editor_insert" on public.projects;
create policy "projects_editor_insert"
on public.projects for insert
to authenticated
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
  or (
    public.current_user_role() = 'content_author'
    and status in ('draft','review')
  )
);

drop policy if exists "projects_editor_update" on public.projects;
create policy "projects_editor_update"
on public.projects for update
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
  or (
    public.current_user_role() = 'content_author'
    and status in ('draft','review')
  )
);

drop policy if exists "projects_admin_delete" on public.projects;
create policy "projects_admin_delete"
on public.projects for delete
to authenticated
using (
  public.has_role(array['super_admin','admin']::public.user_role[])
);

drop policy if exists "project_services_public_read" on public.project_services;
create policy "project_services_public_read"
on public.project_services for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and (
        p.status = 'published'
        or public.has_role(array[
          'super_admin','admin','editor','content_author','viewer'
        ]::public.user_role[])
      )
  )
);

drop policy if exists "project_services_editor_write" on public.project_services;
create policy "project_services_editor_write"
on public.project_services for all
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
);

drop policy if exists "project_media_public_read" on public.project_media;
create policy "project_media_public_read"
on public.project_media for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and (
        p.status = 'published'
        or public.has_role(array[
          'super_admin','admin','editor','content_author','viewer'
        ]::public.user_role[])
      )
  )
);

drop policy if exists "project_media_editor_write" on public.project_media;
create policy "project_media_editor_write"
on public.project_media for all
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
);

drop policy if exists "references_public_read" on public.references;
create policy "references_public_read"
on public.references for select
to anon, authenticated
using (
  visible = true
  or public.has_role(array[
    'super_admin','admin','editor','content_author','viewer'
  ]::public.user_role[])
);

drop policy if exists "references_editor_write" on public.references;
create policy "references_editor_write"
on public.references for all
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
);

drop policy if exists "legal_public_read" on public.legal_documents;
create policy "legal_public_read"
on public.legal_documents for select
to anon, authenticated
using (
  status = 'published'
  or public.has_role(array[
    'super_admin','admin','editor','content_author','viewer'
  ]::public.user_role[])
);

drop policy if exists "legal_editor_write" on public.legal_documents;
create policy "legal_editor_write"
on public.legal_documents for all
to authenticated
using (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor']::public.user_role[])
);

-- Media metadata
drop policy if exists "media_public_read" on public.media_assets;
create policy "media_public_read"
on public.media_assets for select
to anon, authenticated
using (
  bucket in ('public-site-media','project-media','reference-logos','legal-files')
  or public.has_role(array[
    'super_admin','admin','editor','content_author','viewer'
  ]::public.user_role[])
);

drop policy if exists "media_editor_write" on public.media_assets;
create policy "media_editor_write"
on public.media_assets for all
to authenticated
using (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','editor','content_author']::public.user_role[])
);

-- Leads: server service role inserts; authorized users read/update.
drop policy if exists "contacts_staff_read" on public.contact_messages;
create policy "contacts_staff_read"
on public.contact_messages for select
to authenticated
using (
  public.has_role(array['super_admin','admin','sales_ops','viewer']::public.user_role[])
);

drop policy if exists "contacts_staff_update" on public.contact_messages;
create policy "contacts_staff_update"
on public.contact_messages for update
to authenticated
using (
  public.has_role(array['super_admin','admin','sales_ops']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','sales_ops']::public.user_role[])
);

drop policy if exists "quotes_staff_read" on public.quote_requests;
create policy "quotes_staff_read"
on public.quote_requests for select
to authenticated
using (
  public.has_role(array['super_admin','admin','sales_ops','viewer']::public.user_role[])
);

drop policy if exists "quotes_staff_update" on public.quote_requests;
create policy "quotes_staff_update"
on public.quote_requests for update
to authenticated
using (
  public.has_role(array['super_admin','admin','sales_ops']::public.user_role[])
)
with check (
  public.has_role(array['super_admin','admin','sales_ops']::public.user_role[])
);

-- Audit and versions are append-only for normal users.
drop policy if exists "audit_admin_read" on public.audit_logs;
create policy "audit_admin_read"
on public.audit_logs for select
to authenticated
using (
  public.has_role(array['super_admin','admin']::public.user_role[])
);

drop policy if exists "versions_staff_read" on public.content_versions;
create policy "versions_staff_read"
on public.content_versions for select
to authenticated
using (
  public.has_role(array[
    'super_admin','admin','editor','content_author'
  ]::public.user_role[])
);

drop policy if exists "form_events_admin_read" on public.form_events;
create policy "form_events_admin_read"
on public.form_events for select
to authenticated
using (
  public.has_role(array['super_admin','admin','sales_ops']::public.user_role[])
);

-- Grants for PostgREST. RLS remains authoritative.
grant usage on schema public to anon, authenticated;
grant select on public.site_settings, public.pages, public.services,
  public.process_steps, public.projects, public.project_services,
  public.project_media, public.references, public.media_assets,
  public.legal_documents to anon, authenticated;

grant select, insert, update, delete on public.profiles, public.site_settings,
  public.pages, public.services, public.process_steps, public.projects,
  public.project_services, public.project_media, public.references,
  public.media_assets, public.legal_documents, public.contact_messages,
  public.quote_requests to authenticated;

grant select on public.audit_logs, public.content_versions, public.form_events
  to authenticated;

grant usage, select on all sequences in schema public to authenticated;

-- Storage buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'public-site-media',
    'public-site-media',
    true,
    26214400,
    array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml','video/mp4','video/webm']
  ),
  (
    'project-media',
    'project-media',
    true,
    52428800,
    array['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm']
  ),
  (
    'reference-logos',
    'reference-logos',
    true,
    5242880,
    array['image/jpeg','image/png','image/webp','image/svg+xml']
  ),
  (
    'legal-files',
    'legal-files',
    true,
    10485760,
    array['application/pdf']
  ),
  (
    'private-form-uploads',
    'private-form-uploads',
    false,
    26214400,
    array['application/pdf','image/jpeg','image/png','image/webp']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "storage_public_read" on storage.objects;
create policy "storage_public_read"
on storage.objects for select
to anon, authenticated
using (
  bucket_id in (
    'public-site-media',
    'project-media',
    'reference-logos',
    'legal-files'
  )
);

drop policy if exists "storage_staff_read_private" on storage.objects;
create policy "storage_staff_read_private"
on storage.objects for select
to authenticated
using (
  bucket_id = 'private-form-uploads'
  and public.has_role(array[
    'super_admin','admin','editor','content_author','sales_ops','viewer'
  ]::public.user_role[])
);

drop policy if exists "storage_staff_insert" on storage.objects;
create policy "storage_staff_insert"
on storage.objects for insert
to authenticated
with check (
  public.has_role(array[
    'super_admin','admin','editor','content_author'
  ]::public.user_role[])
  and bucket_id in (
    'public-site-media',
    'project-media',
    'reference-logos',
    'legal-files',
    'private-form-uploads'
  )
);

drop policy if exists "storage_staff_update" on storage.objects;
create policy "storage_staff_update"
on storage.objects for update
to authenticated
using (
  public.has_role(array[
    'super_admin','admin','editor','content_author'
  ]::public.user_role[])
)
with check (
  public.has_role(array[
    'super_admin','admin','editor','content_author'
  ]::public.user_role[])
);

drop policy if exists "storage_admin_delete" on storage.objects;
create policy "storage_admin_delete"
on storage.objects for delete
to authenticated
using (
  public.has_role(array[
    'super_admin','admin','editor'
  ]::public.user_role[])
);
