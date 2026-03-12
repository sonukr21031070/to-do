# ✅ Full-Stack To-Do App

A full-stack **Task Management** web application built with **React + Vite** on the frontend and **Spring Boot** on the backend, secured with **JWT Authentication** and backed by **MySQL**.

---

## 🚀 Features

- 🔐 **JWT-based Authentication** — Secure login & registration
- 📋 **Task CRUD** — Create, read, update, and delete tasks
- 🎯 **Priority Management** — Set task priority (LOW / MEDIUM / HIGH)
- 📊 **Status Tracking** — Track tasks as TODO / IN_PROGRESS / DONE
- 🔍 **Filter Tasks** — Filter by priority and/or status
- 🛡️ **Protected Routes** — Dashboard accessible only to authenticated users
- 🌙 **Dark Mode UI** — Sleek dark-themed interface

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite | Build Tool & Dev Server |
| React Router v7 | Client-side Routing |
| Tailwind CSS v4 | Styling |
| Axios | HTTP Client |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 3.2.3 | Backend Framework |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | ORM / Database access |
| MySQL | Relational Database |
| JWT (jjwt 0.12.3) | Token-based Auth |
| Maven | Build Tool |

---

## 📁 Project Structure

```
to-do/
├── backend/                        # Spring Boot application
│   └── src/main/java/com/todo/app/
│       ├── controller/             # REST Controllers (Auth, Task)
│       ├── service/                # Business logic
│       ├── repository/             # Spring Data JPA repos
│       ├── entity/                 # JPA Entities (User, Task)
│       ├── dto/                    # Request/Response DTOs
│       ├── enums/                  # Priority, TaskStatus enums
│       ├── security/               # JWT filter, config
│       └── exception/              # Global exception handling
│
└── frontend/                       # React + Vite application
    └── src/
        ├── pages/                  # LoginPage, RegisterPage, Dashboard
        ├── components/             # TaskCard, etc.
        ├── context/                # AuthContext (global auth state)
        ├── api/                    # Axios API calls
        └── App.jsx                 # Root component with routing
```

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- **Java 17+**
- **Maven 3.8+**
- **Node.js 18+** and **npm**
- **MySQL 8+**

---

## 🗄️ Database Setup

1. Start your MySQL server.
2. Create the database:

```sql
CREATE DATABASE todo_db;
```

3. Open [backend/src/main/resources/application.properties](cci:7://file:///c:/Users/sonu%20kumar/Desktop/to-do/backend/src/main/resources/application.properties:0:0-0:0) and update your credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todo_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

> Tables are created automatically by Hibernate (`ddl-auto=update`).

---

## ▶️ Running the Application

### 1. Backend (Spring Boot)

```bash
# Navigate to the backend directory
cd backend

# Build and run
mvn spring-boot:run
```

The backend will start at **http://localhost:8080**

---

### 2. Frontend (React + Vite)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start at **http://localhost:5173**

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |

### Tasks *(requires Bearer token)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (supports `?priority=` & `?status=` filters) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update a task |
| PATCH | `/api/tasks/{id}/priority` | Update task priority |
| PATCH | `/api/tasks/{id}/status` | Update task status |
| DELETE | `/api/tasks/{id}` | Delete a task |

---

## 🌐 Application Pages

| Route | Page | Access |
|-------|------|--------|
| `/register` | Register | Public |
| `/login` | Login | Public |
| `/dashboard` | Task Dashboard | Protected (JWT required) |

---

## 🔧 Environment / Configuration

All backend configuration is in [backend/src/main/resources/application.properties](cci:7://file:///c:/Users/sonu%20kumar/Desktop/to-do/backend/src/main/resources/application.properties:0:0-0:0):

```properties
server.port=8080

# JWT
app.jwt.secret=your_jwt_secret_key
app.jwt.expiration=86400000   # 24 hours in milliseconds
```

> ⚠️ **Security Note:** Never commit your real `jwt.secret` or database password to a public repository. Use environment variables or a `.env` file in production.

---

## 📦 Build for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/app-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
```
The production build will be output to `frontend/dist/`.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
