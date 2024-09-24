create table
  public.contacts (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    firstname text null,
    lastname text null,
    email text null,
    phone text null,
    userid uuid not null default auth.uid (),
    authid uuid null,
    contact_type text null,
    notes text null,
    constraint contacts_pkey primary key (id),
    constraint contacts_authid_fkey foreign key (authid) references auth.users (id),
    constraint contacts_userid_fkey foreign key (userid) references auth.users (id) on delete cascade
  ) tablespace pg_default;

CREATE UNIQUE INDEX if not exists contacts_pkey ON public.contacts USING btree (id)

create policy "users control their own contacts"
on "public"."contacts"
to public
using (
  (userid = auth.uid())
with check (
  (userid = auth.uid())
);

