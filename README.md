# 🔐 Pix Key Analyzer – Avaliação Inteligente de Chaves Pix

Este projeto simula a API DICT do Banco Central e utiliza inteligência artificial para avaliar a confiabilidade de chaves Pix (CPF, CNPJ, e-mail ou telefone). É uma plataforma moderna, escalável e modular, com foco em segurança digital, prevenção de fraudes e validação de identidade.

---

## 💡 Motivação

Com o crescimento do uso do Pix no Brasil, também aumentaram os golpes e fraudes com uso de chaves falsas ou maliciosas. Este projeto nasce como uma resposta a esse problema: permitir que sistemas consultem uma chave Pix e recebam uma **avaliação de risco baseada em IA**, simulando uma estrutura próxima ao funcionamento real da API DICT do Banco Central.

---

## 🎯 Objetivo

- Simular a consulta à API DICT para qualquer tipo de chave Pix.
- Armazenar o histórico de consultas e dados associados em banco de dados.
- Consultar fontes externas públicas (ex: Receita Federal, Serpro, etc.).
- Enviar os dados a um modelo de IA que analisa e retorna um **score de confiabilidade**.
- Expôr uma API REST unificada para consumo por sistemas terceiros.

---

## ⚙️ Funcionalidades

- ✅ Consulta de chave Pix (CPF, CNPJ, telefone, e-mail)
- ✅ Simulação da resposta DICT oficial
- ✅ Integração entre microserviços com Docker
- ✅ Persistência de dados em PostgreSQL
- ✅ Serviço de IA (Python) que retorna score de confiabilidade
- 🔄 Integração futura com bases reais (Receita, CNPJ, etc.)
- 🔐 Segurança, auditoria e possível autenticação via JWT (em roadmap)

---

## 🧱 Arquitetura Geral

### Fluxo de uma requisição:

1. Um sistema cliente envia uma chave Pix para o endpoint `/pix/{chave}`.
2. O `java-service` consulta o `dict-api`, simula os dados DICT e armazena no PostgreSQL.
3. Em seguida, os dados são enviados para o `python-ia`, que retorna um score de confiabilidade.
4. A resposta final inclui os dados da chave e o score calculado.

---

## 🚀 Tecnologias Utilizadas

- **Java 21** + Spring Boot 3 (REST API, banco, DICT)
- **Python 3.11** + FastAPI (serviço de IA)
- **PostgreSQL** (armazenamento)
- **Docker** + Docker Compose (orquestração)
- **JSON + HTTP REST**

---

## Rodando o frontend (Vite)

1) Instale dependências:

```bash
npm ci
```

2) Rode em modo dev:

```bash
npm run dev
```

---

## Modo mock (sem backend)

O frontend consegue responder com dados mockados quando:

- `VITE_USE_MOCKS=true` (força mock), ou
- em `DEV`, se houver erro de rede na API (fallback automático).

### PowerShell (Windows)

```powershell
$env:VITE_USE_MOCKS='true'
npm.cmd run dev
```

### Bash (macOS/Linux)

```bash
VITE_USE_MOCKS=true npm run dev
```

Chaves sugeridas para testar:

- `12345678900` (score alto)
- `12345678000` (score baixo e mostra alerta na confirmação)

---

## 📡 Exemplo de Requisição

### Endpoint

```http
GET http://localhost:8080/pix/12345678900

{
  "keyType": "CPF",
  "key": "12345678900",
  "owner": {
    "name": "Felipe Mariano",
    "taxIdNumber": "12345678900"
  },
  "bankAccount": {
    "participant": "60701190",
    "branch": "0001",
    "accountNumber": "987654",
    "accountType": "CACC"
  },
  "createdAt": "2020-05-05T18:00:00Z",
  "scoreConfiabilidade": 0.92
}
```
