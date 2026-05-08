# BankApp Spring Boot + React

[![CI/CD](https://github.com/Hasanpiker5543/spring-bank-project/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Hasanpiker5543/spring-bank-project/actions/workflows/ci-cd.yml)

Application de gestion bancaire réimplémentée avec un backend Spring Boot REST API et un frontend React.

## Auteur

El-Mehdi Taoufik

## Fonctionnalités

- Dashboard moderne
- Gestion des clients
- Gestion des comptes bancaires
- Consultation des transactions récentes
- Transfert d'argent d'un compte à un autre avec saisie manuelle du numéro du compte destinataire
- Base de données H2 avec données de démonstration

## Architecture

```text
spring-bank-project/
├── backend/
│   ├── src/main/java/com/bankapp/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── BankApplication.java
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── services/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    └── package.json
```

## Technologies

### Backend

- Java 21+
- Spring Boot 3
- Spring Web
- Spring Data JPA
- H2 Database
- Lombok
- Maven

### Frontend

- React
- Vite
- Axios
- Lucide React
- CSS moderne

## Lancer le backend

Le projet inclut Maven Wrapper, donc Maven global n'est pas obligatoire.

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend disponible sur :

```text
http://localhost:8080
```

Console H2 :

```text
http://localhost:8080/h2-console
```

Paramètres H2 :

```text
JDBC URL: jdbc:h2:mem:bankdb
User: sa
Password: laisser vide
```

## Lancer le frontend

Sur Windows PowerShell, utiliser `npm.cmd` si `npm` est bloqué.

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Frontend disponible sur :

```text
http://localhost:5173
```

## Lancer avec Docker

Le projet inclut un `Dockerfile` pour le backend, un `Dockerfile` pour le frontend et un fichier `docker-compose.yml`.

```powershell
docker compose up --build
```

Services disponibles :

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
```

## CI/CD

Le dépôt utilise GitHub Actions avec le workflow `.github/workflows/ci-cd.yml`.

Le pipeline est déclenché sur :

- push vers `main` ou `develop`
- pull request vers `main` ou `develop`

Étapes exécutées :

- installation de Java 21
- exécution des tests backend avec Maven
- installation des dépendances frontend
- build du frontend React
- build des images Docker backend et frontend
- publication des images Docker sur GitHub Container Registry après un push réussi sur `main`

Images Docker publiées :

```text
ghcr.io/Hasanpiker5543/spring-bank-backend:latest
ghcr.io/Hasanpiker5543/spring-bank-frontend:latest
```

## API REST

### Clients

```text
GET    /api/clients
POST   /api/clients
PUT    /api/clients/{id}
DELETE /api/clients/{id}
```

### Comptes

```text
GET    /api/accounts
POST   /api/accounts
PUT    /api/accounts/{id}
DELETE /api/accounts/{id}
```

### Transactions

```text
GET /api/transactions
GET /api/transactions/recent
GET /api/transactions/account/{accountId}
```

### Transfert

```text
POST /api/transfers
```

Exemple :

```json
{
  "fromAccountId": 1,
  "toAccountNumber": "ACC-MEHDI-001",
  "amount": 100
}
```

## Données de démonstration

Clients :

- toufik
- mehdi
- admin-demo

Comptes :

- ACC-TOUFIK-001
- ACC-MEHDI-001
- ACC-ADMIN-001

## Livrables

- Rapport technique : `Rapport_Technique_Spring_BankApp_El-Mehdi_Taoufik.pdf`
- Vidéo de démonstration : `video/0506(1).mp4`

## Schéma de base de données

```text
Client
- id
- username
- phone

Account
- id
- accountNumber
- balance
- client_id

Transaction
- id
- type
- amount
- date
- account_id
```

