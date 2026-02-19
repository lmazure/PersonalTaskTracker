# Personal Task Tracker

A simple TODO web application built with Angular, Node.js/Express, and PostgreSQL.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Node.js](https://nodejs.org/) v18+ installed
- [Angular CLI](https://angular.io/cli) installed globally:
  ```bash
  npm install -g @angular/cli
  ```

## 1. Start the PostgreSQL database

The database runs in a Docker container. From the project root:

```bash
docker compose up -d
```

This starts a PostgreSQL 16 instance with:
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `tasktracker`
- **User**: `taskuser`
- **Password**: `taskpassword`

Data is persisted in a Docker volume (`pgdata`), so it survives container restarts.

To stop the database:
```bash
docker compose down
```

To stop and **delete all data**:
```bash
docker compose down -v
```

## 2. Start the backend

```bash
cd backend
npm install
npm start
```

The Express API will be available at `http://localhost:3000`.

On first run it automatically creates the `tasks` table if it does not exist.

## 3. Start the frontend

```bash
cd frontend
npm install
npx ng serve
```

Open your browser at [http://localhost:4200](http://localhost:4200).

The Angular dev server proxies all `/api` requests to the backend, so no CORS configuration is needed during development.

## API reference

| Method | Path                  | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | `/api/tasks`          | List all tasks                       |
| POST   | `/api/tasks`          | Create a task (`{ "title": "..." }`) |
| PATCH  | `/api/tasks/:id/done` | Mark a task as done                  |
| DELETE | `/api/tasks/:id`      | Delete a task                        |
