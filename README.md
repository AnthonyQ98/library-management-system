# Django + React LMS Project

This is a full-stack web application combining Django (Python) for the backend and React (JavaScript) for the frontend — designed to serve as a lightweight LMS (Learning Management System) or similar platform.

Everything runs inside Docker using docker-compose for a smooth dev experience with isolated environments.

---

## 🚀 Features

- Backend: Django + Django REST Framework
- Frontend: React (Create React App)
- Containerized: Runs via Docker Compose
- Database: SQLite (simple, file-based)

---

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- (Optional) make (for handy shortcuts)

---

## Setup

1. Clone the repository:

   git clone https://github.com/your-username/your-repo.git
   cd your-repo

2. Start the app using Docker Compose:

   docker-compose up --build

   Or, if you have make installed:

   make up

3. Visit the apps in your browser:

   - Backend (Django API): http://localhost:8000
   - Frontend (React): http://localhost:3000

---

## Common Commands

   make up                # Start the app in background
   make down              # Stop all containers
   make restart           # Rebuild and restart everything
   make migrate           # Run Django database migrations
   make createsuperuser   # Create a Django admin user
   make logs              # Tail logs from all services

---

## Project Structure

.
├── backend/          # Django project
│   ├── manage.py
│   ├── backend/    # Django settings
│   └── lms/          # Django app (views, serializers, models, etc.)
│
├── frontend/         # React app
│   └── src/
│
├── docker-compose.yml
├── Makefile
└── README.md

---

## Customization

- To create new Django apps:

  docker-compose exec backend python manage.py startapp mynewapp

- To add frontend routes/components, update files in frontend/src/.

---

## Running Tests

Run Django tests with:

  docker-compose exec backend python manage.py test

(Frontend testing with Jest can be added later.)

---

## Production Notes

This setup is for local development. For production:

- Use PostgreSQL or another production-grade DB
- Set DEBUG = False in Django
- Collect and serve static files properly
- Proxy requests through Nginx or serve the React build via Django

---

## Contributing

Feel free to fork this repo, submit PRs, or open issues. Contributions are welcome!

---

## License

MIT License. Use it, modify it, ship it 🚀
