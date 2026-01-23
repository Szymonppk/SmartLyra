# 🎸 SmartLyra - Advanced Guitar Tab & Audio Analysis Platform v1.0-MVP

**SmartLyra** is a state-of-the-art web platform dedicated to musicians, enabling guitar audio recording analysis, automatic tonality (musical scale) detection, and guitar tablature library management. The project demonstrates a modern microservices architecture, asynchronous processing, and full environment containerization.

---

## 🛠️ Technology Stack

The project was built using "State-of-the-Art" technologies selected for performance, scalability, and separation of concerns.

### 🐳 Infrastructure & Containerization (Docker)
The entire system operates on full containerization. It is not just a wrapper for the frontend but a complete environment orchestrated by **Docker Compose**, consisting of 5 independent services:
1.  **Backend Service**: Python 3.10-slim + FastAPI container.
2.  **Frontend Service**: Node.js/React container (development).
3.  **Worker Service**: Dedicated computational container for audio analysis (DSP), offloading the main API.
4.  **Database Service**: MySQL 8.0 container with a persistent data volume.
5.  **Message Broker**: RabbitMQ container managing the task queue between the API and the Worker.

### 🐍 Backend (API & Logic)
* **Python 3.10-slim**: Chosen for its powerful signal processing libraries (`librosa`, `scipy`, `numpy`).
* **FastAPI**: Modern, asynchronous framework (ASGI) providing automatic documentation and data validation (Pydantic).
* **SQLAlchemy ORM**: Database abstraction ensuring query security and easy migrations.
* **Celery / Custom Worker**: Queue system for asynchronous processing of `.wav` files.

### ⚛️ Frontend (User Interface)
* **React 18**: Library for building a responsive Single Page Application (SPA) interface.
* **Tailwind CSS**: Utility-first CSS framework ensuring a consistent Design System and full responsiveness (RWD/Mobile-first).

---

## 🏗️ System Architecture

The application is designed in a layered architecture with separated services:

1.  **Presentation Layer (Frontend)**: Communicates exclusively with the Backend API.
2.  **Business Logic Layer (Backend API)**: Handles HTTP requests, authentication, and CRUD operations on the database.
3.  **Background Processing Layer (Worker)**:
    * The API receives a file and sends a task ID to **RabbitMQ**.
    * The Worker retrieves the task, analyzes the audio file, and updates the result in the database.
4.  **Data Layer**:
    * **MySQL**: Stores relational data (users, tabs, recording metadata).
    * **File System**: Stores physical `.wav` files (shared via Docker volume).

### Database Schema (ERD)
The database meets the requirements of the **3rd Normal Form (3NF)**. Key tables include:
* `users`: Authentication data and roles.
* `recordings`: Recording metadata and analysis results (scales).
* `tabs`: Tablature structure (JSON content).
* `genres`: Dictionary of musical genres.
* `scales`: Reference data for musical scales (notes and descriptions).
* `tab_genres`: Linking table (Many-to-Many relationship).

![ERD Diagram](/screenshots/ERD.png)

---

## 🚀 Installation & Deployment

Thanks to full Dockerization, launching the project requires only a few commands, regardless of the operating system (Windows/Linux/MacOS).

### Prerequisites
* Installed **Docker** and **Docker Compose** (Docker Desktop for Windows).

### Step-by-Step Guide

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd smartlyra
    ```

2.  **Configuration (Important!):**
    The project uses environment variables for configuration (ports, database credentials). A template file is provided in the repository.
    
    Create a `.env` file based on the template:
    ```bash
    cp .env.template .env
    ```
    *Note: The `.env.template` contains safe default values for development (e.g., Frontend on port 3005, DB on 3307). You can adjust them in the created `.env` file if needed.*

3.  **Launch the application:**
    Run the containers in detached mode:
    ```bash
    docker compose up -d --build
    ```
    *The `--build` flag forces image rebuilding, recommended for the first run.*

4.  **Database Initialization:**
    Upon the first launch, tables are created automatically by SQLAlchemy.

---

## 🔌 Access to Services

Once the containers are running correctly, the system modules are available at the addresses defined in your `.env` file (default values below):

| Service | URL Address | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:3005](http://localhost:3005) | Main User Interface |
| **Backend API** | [http://localhost:8001](http://localhost:8001) | REST API Endpoints |
| **Documentation** | [http://localhost:8001/docs](http://localhost:8001/docs) | Swagger UI |
| **Database Panel** | [http://localhost:8081](http://localhost:8081) | phpMyAdmin Interface |

---

## 📚 Detailed Features

### 1. Authentication Module (Auth)
* User registration with data validation.
* Secure login using **JWT (JSON Web Tokens)** protocol.
* Endpoint protection via Dependency Injection in FastAPI.

### 2. Audio Processing
* `.wav` file upload by the user.
* **Asynchronous Analysis**: The user does not wait for the result – the process happens in the background.
* Musical scale detection (e.g., C-Major, A-Minor) based on frequency analysis.

### 3. Tablature Library
* Tablature creator with an interactive "fretboard" interface. (soon)
* Saving tabs in JSON format in the database. (by now)
* Music genre tagging system. 

### 4. Recording Library
* History of uploaded recordings.
* Ability to download and listen to own files.
* Analysis status preview (Pending -> Completed).

---

## 📸 Application Presentation

Below are key views of the **SmartLyra** system interface.

### 🏠 Home Page & Dashboard
The central hub of the application, providing quick navigation to all core features.

![Home Page](/screenshots/HomePage.png)

---

### 🎸 Tablature Library
A comprehensive interface for browsing and creating new guitar tablatures using the interactive creator.

![Tab Page](/screenshots/Tabs.png)

---

### 🎙️ Recording Storage
A history view of all uploaded audio files, displaying the status and results of the background tonal analysis (detected scales).

![Recording Storage Page](/screenshots/Recordings.png)