# Hatoslottó – Web-programozás II. beadandó

Készítették: Kovács Kevin (LXK94M) és Szabó Ákos (RZXUK4)

Node.js, Express, EJS, MongoDB Atlas (Mongoose), Passport, Chart.js, Render.com.
Téma: Bootswatch Lux (https://bootswatch.com/lux/).

## Menük

| Menü | Ki látja |
|---|---|
| Főoldal, Adatbázis, Kapcsolat | mindenki |
| Bejelentkezés, Regisztráció | nem bejelentkezett látogató |
| Üzenetek, Diagram | bejelentkezett felhasználó |
| CRUD | admin |

## Futtatás

```
npm install
npm run seed
npm start
```

A `.env` fájlba kell a `MONGODB_URI` és a `SESSION_SECRET` (minta: `.env.example`).
A `npm run seed` betölti a `data` mappa adatait és létrehozza az admin felhasználót (`admin@hatoslotto.hu` / `admin123`).

## Render.com

Build command: `npm install`, Start command: `npm start`, Environment: `MONGODB_URI`, `SESSION_SECRET`.
