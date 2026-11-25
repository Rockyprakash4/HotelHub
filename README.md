
# HotelHub

A full-stack hotel listing and management application built using React, Redux, Node.js, Express, and PostgreSQL.

## Features

- Add, edit, and delete hotels
- Upload hotel images with preview
- Search hotels by title
- Filter hotels by price range
- Pagination
- Hotel detail page
- Location mapping using latitude and longitude
- Responsive UI
- Form validation

## Tech Stack

### Frontend
- React.js
- Redux
- HTML
- CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL
- Native SQL queries

## Project Structure

- frontend – React application
- backend – Express REST API

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/hotels | Create hotel |
| GET | /api/hotels | Fetch hotels with filters and pagination |
| PUT | /api/hotels/:id | Update hotel |
| DELETE | /api/hotels/:id | Delete hotel |

# HotelHub
>>>>>>> d94c9e69c292266088d4e1260b739e71f58eb696



# HotelHub

## How to Run the Project

### Prerequisites
- Node.js
- npm
- PostgreSQL

### 1. Start Backend

Open the first VS Code terminal and run:

```powershell
$env:Path = "C:\Users\91936\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe;" + $env:Path; fnm env --shell powershell | Out-String | Invoke-Expression; fnm use 26
```

```powershell
cd D:\rocky\HotelHub\HotelHub\server
npm run dev
```

Backend runs at: `http://localhost:5000`

### 2. Start Frontend

Open a second VS Code terminal and run:

```powershell
$env:Path = "C:\Users\91936\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe;" + $env:Path; fnm env --shell powershell | Out-String | Invoke-Expression; fnm use 26
```

```powershell
cd D:\rocky\HotelHub\HotelHub\frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

### 3. Open the Application

Open your browser and visit:

`http://localhost:5173/`

**Note:** Keep both backend and frontend terminals running while using the application.
