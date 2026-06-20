# Blog kulinarny dwóch Oliwii
## Autorzy
- Oliwia Gruchała (frontend)
- Oliwia Jachym (backend)

## Wymagania
- Node.js (zalecana wersja 20) (https://nodejs.org/)
- PostgreSQL (zalecana wersja 18)

## Uruchomienie (frontend)

```bash
cd frontend
npm install    
npm run dev      
```

## Uruchomienie (baza danych)
Zobacz [backend/db/README.md](backend/db/README.md)

## Uruchomienie (backend)

Wymaga działającej bazy danych (sekcja wyżej).

```bash
cd backend
npm install                 # raz
cp .env.example .env       
npm run dev                 
```

Konto administratora (login `admin`, hasło `zaq1@WSX`) jest w `backend/db/seed.sql`.

## Routing

### Publiczne

| Ścieżka                  | Widok                                                                 |
| ------------------------ | --------------------------------------------------------------------- |
| `/`                      | przekierowanie na `/home/`                                             |
| `/home/`                 | lista przepisów + wyszukiwanie, filtr kategorii i sortowanie          |
| `/home/recipe/?id=<id>`  | szczegóły przepisu (zdjęcie, czas, porcje, składniki, kroki, data)    |

### CRUD

| Ścieżka                    | Widok                                                            |
| -------------------------- | ---------------------------------------------------------------- |
| `/login/`                  | logowanie administratora (formularz; akcja po stronie backendu)  |
| `/dashboard/`              | READ — wszystkie przepisy z wyszukiwaniem/filtrami/sortowaniem    |
| `/dashboard/create/`       | CREATE — formularz nowego przepisu (POST), upload zdjęcia JPG/PNG |
| `/dashboard/edit/?id=<id>` | UPDATE — edycja przepisu (PUT) oraz usuwanie (DELETE)             |

Każda nieznana ścieżka zwraca stronę `404.html`


