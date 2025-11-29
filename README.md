# Backend – Estrutura, Fluxo e Organização

## 📌 Estrutura de Pastas (Profissional)

src/
  config/
    database.js
  routes/
    auth.routes.js
  controllers/
    auth.controller.js
  services/
    auth.service.js
  models/
    user.model.js
  middlewares/
    auth.middleware.js
    rateLimit.middleware.js


---

## 📌 Fluxo de uma Requisição

1. **server.js**

   * inicia Express
   * aplica middlewares globais
   * importa e usa rotas
   * conecta ao banco

2. **Rotas (routes/)**

   * recebem o caminho (ex: POST /auth/login)
   * chamam o controller correspondente

3. **Controllers (controllers/)**

   * recebem req e res
   * chamam serviços
   * retornam resposta pro cliente

4. **Services (services/)**

   * fazem lógica de negócio
   * validam dados
   * chamam o model/banco
   * geram tokens
   * retornam informações pro controller

5. **Models (models/)**

   * definem os schemas e interagem com o banco

---

## 📌 Autenticação (Access + Refresh Tokens)

### Fluxo:

1. Usuário faz login
2. Backend valida email/senha
3. Gera **Access Token** (curto prazo – enviado via JSON)
4. Gera **Refresh Token** (longo prazo – enviado via cookie HttpOnly)
5. Front salva *apenas* o Access Token na memória (contexto)
6. Ao expirar → front chama `/auth/refresh`
7. Backend valida cookie e retorna novo Access Token
8. Logout → apaga cookie e invalida sessão

**Importante:** Refresh Token **nunca** é acessado pelo JS.

---

## 📌 Segurança

* Hash de senha com **bcrypt + salt + pepper**
* Refresh Token em **cookie HttpOnly**
* Rate limit contra brute-force
* Helmet para segurança de headers
* CORS configurado
* Nunca expor chaves no front

---

## 📌 Convenção de Rotas

Agrupar por áreas:

```
/auth/login
/auth/register
/auth/logout
/auth/refresh

/user/profile
/user/update

/admin/stats
/admin/logs
```

Ajuda organização e aplicação de middlewares.

---

## 📌 O que salvar no banco na criação de usuário

- id
 - email
 - hash
 - role
 - name 
 - photo_perfil
 - createdAt
 - lastLogin
 - ipCreated
 - lastIp
 - location: city: "...",   state: "...",   country: "..."
