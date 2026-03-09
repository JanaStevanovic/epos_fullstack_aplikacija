# Startup Idea Validation Platform (MVP)

Fullstack web aplikacija razvijena korišćenjem **Next.js** frameworka za potrebe domaćeg zadatka iz predmeta **Razvoj naprednih aplikacija** na Fakultetu organizacionih nauka.

Aplikacija predstavlja **MVP verziju platforme za validaciju startap ideja**. Korisnici mogu da registruju nalog, prijave se u sistem i upravljaju svojim startap idejama kroz jednostavan dashboard interfejs.

---

# Funkcionalnosti aplikacije

Aplikacija omogućava sledeće funkcionalnosti:

* registraciju korisnika
* prijavu i autentifikaciju korisnika
* kreiranje startap ideje
* pregled ideja na dashboard stranici
* izmenu ideje
* brisanje ideje
* pregled detalja ideje
* prikaz validacionog rezultata (mock)

---

# Tehnologije

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Next.js API routes

## Baza podataka

* PostgreSQL

## ORM

* Drizzle ORM

## Autentifikacija

* JWT (JSON Web Token)
* HTTP cookies

## Okruženje

* Docker (za pokretanje baze)

---

# Arhitektura sistema

Aplikacija je implementirana kao **fullstack web aplikacija**.

Komponente sistema:

Frontend
React komponente koje prikazuju korisnički interfejs.

Backend
Next.js API rute koje obrađuju zahteve i komuniciraju sa bazom.

ORM sloj
Drizzle ORM koji omogućava tipizirani rad sa bazom.

Baza podataka
PostgreSQL baza pokrenuta u Docker kontejneru.

Tok podataka:

1. korisnik šalje zahtev preko frontend aplikacije
2. frontend poziva REST API rutu
3. backend obrađuje zahtev
4. Drizzle ORM komunicira sa PostgreSQL bazom
5. rezultat se vraća frontend aplikaciji

---

# Struktura projekta

```
src
 ├─ app
 │   ├─ api
 │   │   ├─ auth
 │   │   │   ├─ login
 │   │   │   └─ register
 │   │   └─ ideas
 │   │       ├─ route.ts
 │   │       └─ [id]
 │   ├─ dashboard
 │   ├─ login
 │   ├─ register
 │   └─ ideas
 │       ├─ create
 │       ├─ edit
 │       └─ details
 │
 ├─ components
 │   ├─ Button.tsx
 │   ├─ Card.tsx
 │   └─ InputField.tsx
 │
 └─ db
     ├─ schema.ts
     └─ drizzle migrations
```

---

# Model podataka

Glavni entiteti u sistemu:

* **Users** – korisnici aplikacije
* **StartupIdeas** – startap ideje
* **Validations** – validacioni proces
* **ValidationReports** – rezultat validacije
* **Organizations** – organizacije korisnika

Relacija:

User → StartupIdeas (1:N)

---

# Pokretanje projekta

## 1. Kloniranje repozitorijuma

```bash
git clone https://github.com/JanaStevanovic/epos_fullstack_aplikacija.git
cd epos_fullstack_aplikacija
```

---

## 2. Instalacija zavisnosti

```bash
npm install
```

---

## 3. Pokretanje baze (Docker)

```bash
docker compose up -d
```

---

## 4. Pokretanje migracija

```bash
npm run db:migrate
```

---

## 5. Pokretanje aplikacije

```bash
npm run dev
```

Aplikacija će biti dostupna na:

```
http://localhost:3000
```

---

# API rute

## Autentifikacija

### Registracija korisnika

```
POST /api/auth/register
```

### Prijava korisnika

```
POST /api/auth/login
```

---

## Startap ideje

### Kreiranje ideje

```
POST /api/ideas
```

### Pregled ideja

```
GET /api/ideas
```

### Izmena ideje

```
PUT /api/ideas/[id]
```

### Brisanje ideje

```
DELETE /api/ideas/[id]
```

---

# Autentifikacija

Autentifikacija je implementirana korišćenjem **JWT tokena**.

Nakon uspešne prijave:

* generiše se JWT token
* token se čuva u **HTTP cookie**
* svaka zaštićena API ruta proverava validnost tokena

---

# Korisničke uloge

Sistem podržava tri tipa korisnika:

* **Founder** – kreira i upravlja svojim idejama
* **Validator** – pregleda validacione rezultate
* **Admin** – administrativni pristup sistemu

Uloga korisnika se čuva u tabeli **users** u koloni `role`.

---

