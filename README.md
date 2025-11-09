# 🧠 NervOS — Vital E-Health Network Operating System

**NervOS** is a modular, enterprise-grade **E-Health Network Operating System** designed to connect hospitals, clinics, labs, pharmacies, and patients through a single interoperable digital platform. Built with **NestJS** and **PostgreSQL**, NervOS is designed for scalability, security, and standards-based interoperability (FHIR / HL7).

---

## 🚀 Vision

Healthcare systems across regions often operate in isolation — data is trapped, workflows are inefficient, and coordination between institutions is poor. **NervOS** bridges these gaps by providing a unified, secure, and standards-driven platform for all healthcare stakeholders.

> _"Connecting Care, Empowering Health."_

---

## 🏗️ Architecture Overview

NervOS is built as a **modular monolith** for the MVP phase — allowing rapid development and easy migration into microservices in future versions. A dedicated **Integration Layer** (FHIR / HL7) ensures the system can exchange clinical data with external systems using healthcare standards.

```
nervos/
 ├── src/
 │   ├── main.ts
 │   ├── app.module.ts
 │   ├── config/
 │   ├── common/
 │   ├── modules/
 │   │   ├── auth/
 │   │   ├── patient/
 │   │   ├── staff/
 │   │   ├── appointment/
 │   │   ├── billing/
 │   │   ├── pharmacy/
 │   │   ├── lab/
 │   │   └── integration/        # FHIR adapter, HL7 bridge, connectors
 │   └── database/
 ├── .env
 ├── Dockerfile
 ├── docker-compose.yml
 ├── package.json
 └── README.md
```

---

## 🔗 Standards & Interoperability (FHIR / HL7)

Interoperability is central to NervOS. The project includes a dedicated `integration` module that implements:

- **FHIR REST API adapter** — expose and consume FHIR resources (Patient, Encounter, Observation, MedicationRequest, DiagnosticReport, etc.)
- **HL7 v2 inbound/outbound bridge** — translate HL7 v2 messages (ADTs, ORUs, OBR/OBXs) to internal models or FHIR where possible
- **Terminology & Mapping** — map local codes to standard terminologies (LOINC, SNOMED CT, ICD-10)
- **Security & Audit** — ensure secure data exchange (JWT, mutual TLS where needed) and audit logging for exchanged clinical messages
- **Message queue / ETL** — support async integration using message brokers (RabbitMQ, Kafka) for resilience and batching

This design lets NervOS operate as both a _FHIR-capable server_ and a _translator/gateway_ for legacy systems that still use HL7 v2.

### Typical Integration Flows

1. **Patient Registration (from external EHR):**
   - External system posts FHIR `Patient` to NervOS FHIR endpoint.
   - Integration adapter validates and maps resource, creates/updates local patient record, and returns FHIR `OperationOutcome`.

2. **Lab Result (HL7 v2 → NervOS):**
   - Lab instrument or LIS sends HL7 ORU^R01
   - HL7 bridge parses ORU, maps observation codes to LOINC, persists the result and emits a FHIR `DiagnosticReport` internally for downstream consumers.

3. **Order Sync (NervOS → External System):**
   - NervOS creates a MedicationRequest or ServiceRequest and the FHIR adapter posts it to a partner FHIR server or translates to an HL7 v2 ORM message for legacy systems.

---

## ⚙️ Core Technologies

| Tool                                            | Purpose                     |
| ----------------------------------------------- | --------------------------- |
| [NestJS](https://nestjs.com/)                   | Backend framework           |
| [Prisma](https://www.prisma.io/)                | ORM for PostgreSQL          |
| [PostgreSQL](https://www.postgresql.org/)       | Primary database            |
| [Swagger](https://swagger.io/)                  | API documentation           |
| [Passport.js + JWT](http://www.passportjs.org/) | Authentication              |
| [Docker](https://www.docker.com/)               | Containerization            |
| [FHIR / HL7 Standards](https://hl7.org/fhir/)   | Healthcare interoperability |

---

## 🧩 Modules (MVP Phase)

| Module          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| **Auth**        | User login, signup, and role-based access (JWT)               |
| **Patient**     | Patient registration, demographics, and EHR                   |
| **Staff**       | Doctors, nurses, and administrative staff                     |
| **Appointment** | Scheduling and availability management                        |
| **Billing**     | Invoicing and payment tracking                                |
| **Pharmacy**    | Drug catalog, inventory, and prescriptions                    |
| **Lab**         | Test orders, results, and lab workflows                       |
| **Integration** | **FHIR adapter, HL7 bridge, connectors, terminology mapping** |
| **Admin**       | Access control, organization management, and system settings  |

---

## 🧰 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/nervos.git
cd nervos
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

Create a `.env` file in the project root. For integration features you may need extra vars (example below):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/nervos
JWT_SECRET=your_jwt_secret
PORT=4000
# Integration specific
FHIR_ENABLED=true
FHIR_BASE_URL=http://localhost:4000/fhir
HL7_BRIDGE_ENABLED=true
HL7_LISTEN_PORT=2575
TERMINOLOGY_SERVER_URL=http://terminology-server:8080
```

### 4️⃣ Run the Application

```bash
npm run start:dev
```

Open:

- **API & Swagger:** `http://localhost:4000/api/docs`
- **FHIR base (if enabled):** `http://localhost:4000/fhir` (FHIR endpoints)

---

## 🧱 Development Guidelines

- Follow NestJS module architecture.
- Use **DTOs** and **class-validator** for all inputs.
- Keep business logic inside services, not controllers.
- Put FHIR/HL7 parsing and mapping logic inside the `integration` module and keep it decoupled from domain services via well-defined events or interfaces.
- Use environment variables for all configs.

---

## 🌍 Future Roadmap

- [ ] Harden FHIR server compliance (profiles, conformance, CapabilityStatement)
- [ ] Implement terminology service integration (SNOMED/LOINC lookups)
- [ ] Build HL7 v2 ACK handling & message persistence
- [ ] Expand to multi-tenant, multi-hospital networks
- [ ] Analytics & clinical dashboards
- [ ] Mobile & Web clients

---

## 🤝 Contributing

We welcome contributors! To contribute:

1. Fork the repo
2. Create a new branch (`feature/your-feature-name`)
3. Commit changes and open a pull request

If you plan to work on integration features, open an issue describing which standard/resource you’ll implement (e.g., FHIR Patient CRUD, DiagnosticReport ingestion from HL7).

---

## 🧾 License

This project is licensed under the **MIT License** — feel free to use and improve.

---

## 💡 Maintained by

**Olabode Eto** — Founder of _boddlabs_
Building digital ecosystems that transform industries.

> 💬 _For collaboration or partnership inquiries, reach out via GitHub Discussions or Telegram._
