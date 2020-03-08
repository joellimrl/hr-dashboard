# Backend for HR Dashboard

Middleware microservice built on NodeJS and ExpressJS

Utilises MongoDB and RSA Key encryption for authentication

## Getting Started

Install dependencies (after cloning project)

```
npm install
npm run start
```

Hit `/register` endpoint with username and password (Temporary fix while registration is built on frontend)

### Prerequisites

MongoDB
- DB name: hr-dashboard
- Collections:
    - authentication
    - employee-details
    - employee-list
    - expo-push-tokens

## Notes

- No test coverage
- No access/refresh tokens
- No registration yet
- No forgot/change password

Pushed Private and Public Keys to Github for easier access