# Baza danych — uruchomienie lokalnie i połączenie z backendu

Wszystkie komendy uruchamiaj z katalogu głównego repo. Przykładowe dane:
baza `blog_kulinarny`, użytkownik `admin`, hasło `zaq1@WSX`.

## 1. Zainstaluj PostgreSQL (jeśli nie masz)

- **macOS (Homebrew):** `brew install postgresql@18`
- **Windows:** instalator z <https://www.postgresql.org/download/>
- **Linux (Debian/Ubuntu):** `sudo apt install postgresql`
- **macOS bez terminala:** aplikacja <https://postgresapp.com>

Sprawdź instalację: `psql --version`. Dalsze kroki są takie same na każdym systemie
(różni się tylko sposób startu serwera w kroku 2).

## 2. Uruchom serwer bazy

MacOS/Homebrew:
```bash
brew services start postgresql@18      # startuje teraz i przy każdym logowaniu
pg_isready                             # powinno zwrócić "accepting connections"
```

> Linux: `sudo systemctl start postgresql`.Windows/Postgres.app: serwer startuje
> automatycznie po instalacji.

## 3. Utwórz bazę

```bash
createdb blog_kulinarny
```

## 4. Załaduj schemat i (opcjonalnie) dane przykładowe

```bash
psql -d blog_kulinarny -f backend/db/schema.sql
psql -d blog_kulinarny -f backend/db/seed.sql
```

## 5. Utwórz użytkownika (rolę) z loginem i hasłem

```bash
psql -d blog_kulinarny <<'SQL'
CREATE ROLE admin LOGIN PASSWORD 'zaq1@WSX';
GRANT ALL PRIVILEGES ON DATABASE blog_kulinarny TO admin;
GRANT ALL ON SCHEMA public TO admin;
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO admin;
SQL
```

## 6. Wymuś logowanie hasłem (pg_hba.conf)

Domyślnie Homebrew ma tryb `trust` — hasło jest **ignorowane**. Aby było realnie
wymagane dla połączeń TCP (tak łączy się backend):

1. Znajdź plik konfiguracji: `psql -tA -d blog_kulinarny -c "SHOW hba_file;"`
2. W tym pliku zmień metodę z `trust` na `scram-sha-256` w wierszach:
   ```
   host    all   all   127.0.0.1/32   scram-sha-256
   host    all   all   ::1/128        scram-sha-256
   ```
   **Zostaw** `local ... trust` (socket) — dzięki temu jako superuser masz zawsze
   dostęp administracyjny i się nie zablokujesz.
3. Przeładuj konfigurację: `psql -d blog_kulinarny -c "SELECT pg_reload_conf();"`

Test (powinno zalogować jako `admin`; z błędnym hasłem teraz odmówi):
```bash
PGPASSWORD='zaq1@WSX' psql -h localhost -U admin -d blog_kulinarny -c "SELECT current_user;"
```

## 7. Połącz backend (Node + biblioteka `pg`)



DATABASE_URL=postgresql://admin:zaq1%40WSX@localhost:5432/blog_kulinarny
> Uwaga: `@` w haśle koduje się jako `%40` (w URL-u `@` oddziela hasło od hosta).

## Przydatne komendy i reset

```bash
psql blog_kulinarny          # konsola; w środku: \dt, \d recipes, \q
brew services stop postgresql@18      # zatrzymanie serwera
brew services restart postgresql@18   # restart

# reset bazy (po zmianie schema/seed):
dropdb blog_kulinarny && createdb blog_kulinarny
# następnie ponownie kroki 4–5
```
