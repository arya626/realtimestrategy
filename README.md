# Getting Started with the Project

The project was built on Reactjs and RUST

### Frontend

- ReactJs
- Tailwind
- Axios

### Backend

- RUST
- Actix-web
- Cargo

## Instructions

Instructions on how to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

List the software and tools you need to install before you can run the project.

- Node.js
- npm
- Rust
- Cargo

## Installation

1. Clone the repository

git clone https://github.com/arya626/realtimestrategy.git
cd realtimestrategy

2. Set up the frontend

cd frontend
npm install

3, Set up the backend

cd ../backend
cargo build

## To run the project

cd frontend
npm run

This runs the react application in port 3000. If the port is already busy, it prompts to switch to another port

cd backend
cargo run

This runs the server on http://127.0.0.1:8080/ or http://localhost:8080

## Samples

The sample maps (JSON) can be found under Samples directory

## API Endpoint

- 'POST /find-path': This takes in the list of data to find the path between the starting and target position.

Response

{
"path_indices": [indices],
"path_coordinates": [[x, y], [x, y]]
}
