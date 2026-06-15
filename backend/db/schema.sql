-- Schemat bazy: Blog kulinarny dwóch Oliwii
-- Uruchom: psql -d blog_kulinarny -f backend/db/schema.sql

-- KATEGORIE — stały, nieedytowalny słownik
-- (category_key = wartość techniczna z FE, label = etykieta w UI)
CREATE TABLE categories (
  id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_key TEXT NOT NULL UNIQUE,
  label        TEXT NOT NULL
);

-- PRZEPISY
CREATE TABLE recipes (
  id                   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title                TEXT    NOT NULL,
  image_url            TEXT    NOT NULL,                 -- URL zdjęcia zwrócony po uploadzie
  category_id          INTEGER NOT NULL REFERENCES categories (id),
  cooking_time_minutes INTEGER NOT NULL,
  servings             INTEGER NOT NULL,
  ingredients          TEXT[]  NOT NULL,
  steps                TEXT[]  NOT NULL,
  created_at           DATE    NOT NULL DEFAULT CURRENT_DATE
);

-- KONTO ADMINISTRATORA — hasło jako bcrypt hash (liczony w backendzie, nigdy jawnie)
CREATE TABLE users (
  id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username      TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL
);

-- Seed kategorii (stała lista z frontendu)
INSERT INTO categories (category_key, label) VALUES
  ('sniadania',      'Śniadania'),
  ('zupy',           'Zupy'),
  ('dania-obiadowe', 'Dania obiadowe'),
  ('desery',         'Desery');

-- Konto administratora aplikacji wstawia seed.sql (hasło jako bcrypt hash).
