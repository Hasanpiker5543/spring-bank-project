# BankApp Spring Boot + React

Application de gestion bancaire réimplémentée avec un backend Spring Boot REST API et un frontend React.

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

## Rapport technique

Le rapport PDF peut contenir :

1. Introduction du projet
2. Architecture globale Backend/Frontend
3. Diagramme de base de données
4. Description des entités JPA
5. Description des endpoints REST
6. Choix techniques
7. Captures d'écran de l'interface
8. Conclusion

## Vidéo de démonstration

Plan conseillé :

1. Montrer la structure `backend` et `frontend`
2. Lancer Spring Boot
3. Lancer React
4. Afficher le dashboard
5. Montrer les comptes et transactions
6. Faire un transfert de `ACC-TOUFIK-001` vers `ACC-MEHDI-001`
7. Montrer que les soldes et transactions changent
