-- Contact form submissions for Sylva Sounds
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  project_type text[] default '{}',
  message text not null,
  created_at timestamptz not null default now()
);

comment on table public.contact_submissions is 'Website contact form submissions';

alter table public.contact_submissions enable row level security;

create policy "Allow public insert on contact_submissions"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

create policy "Deny public select on contact_submissions"
  on public.contact_submissions
  for select
  to anon, authenticated
  using (false);

grant insert on public.contact_submissions to anon, authenticated;
grant select on public.contact_submissions to service_role;
