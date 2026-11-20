-- ====================================================================
-- SKRIPSI TRACKER - SUPABASE SQL SCHEMA MIGRATION
-- Salin dan jalankan script ini di SQL Editor di dashboard Supabase Anda:
-- https://supabase.com/dashboard/project/yxohqewnlufniwvrzmsn/sql/new
-- ====================================================================

-- 1. Buat Tabel skripsi_sync untuk menyimpan seluruh data & progres
create table if not exists public.skripsi_sync (
  id text primary key default 'primary_student_data',
  payload jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Aktifkan Row Level Security (RLS)
alter table public.skripsi_sync enable row level security;

-- Buat policy agar dapat dibaca dan diperbarui secara aman
create policy "Allow all read access"
  on public.skripsi_sync
  for select
  using (true);

create policy "Allow all insert access"
  on public.skripsi_sync
  for insert
  with check (true);

create policy "Allow all update access"
  on public.skripsi_sync
  for update
  using (true);

-- 2. Buat Storage Bucket untuk menyimpan dokumen dan draft skripsi
insert into storage.buckets (id, name, public)
values ('skripsi-documents', 'skripsi-documents', true)
on conflict (id) do update set public = true;

-- Policy untuk storage bucket agar publik bisa mengunggah dan mengunduh berkas skripsi
create policy "Public Access skripsi-documents"
  on storage.objects for select
  using ( bucket_id = 'skripsi-documents' );

create policy "Public Upload skripsi-documents"
  on storage.objects for insert
  with check ( bucket_id = 'skripsi-documents' );

create policy "Public Update skripsi-documents"
  on storage.objects for update
  using ( bucket_id = 'skripsi-documents' );

create policy "Public Delete skripsi-documents"
  on storage.objects for delete
  using ( bucket_id = 'skripsi-documents' );

