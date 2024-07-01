use actix_web::{ post, web, HttpResponse, Responder, HttpServer, App};
use serde::{Deserialize, Serialize};
use pathfinding::prelude::bfs;
use actix_cors::Cors;

#[derive(Deserialize)]
struct InputData {
    data: Vec<i32>,
}

#[derive(Serialize)]
struct ResponseData {
    path_indices: Option<Vec<usize>>,
    path_coordinates: Option<Vec<(usize, usize)>>,
}

#[post("/find-path")]
async fn find_path(data: web::Json<InputData>) -> impl Responder {
    let (grid, width, height) = create_grid(&data.data);
    match bfs_path(&grid, width, height) {
        Some((path_coords, path_indices)) => {
            HttpResponse::Ok().json(ResponseData {
                path_indices: Some(path_indices),
                path_coordinates: Some(path_coords),
            })
        },
        None => {
            HttpResponse::NotFound().body("No path found")
        }
    }
}

fn create_grid(data: &Vec<i32>) -> (Vec<Vec<i32>>, usize, usize) {
    let total_cells = data.len();
    let dimension = (total_cells as f64).sqrt().ceil() as usize;

    let mut grid = vec![vec![0; dimension]; dimension];
    for (index, &value) in data.iter().enumerate() {
        let row = index / dimension;
        let col = index % dimension;
        grid[row][col] = value;
    }
    (grid, dimension, dimension)
}

fn bfs_path(grid: &Vec<Vec<i32>>, width: usize, height: usize) -> Option<(Vec<(usize, usize)>, Vec<usize>)> {
    let start = find_position(grid, 0)?;
    let goal = find_position(grid, 6)?;

    println!("Start position: {:?}", start);
    println!("Goal position: {:?}", goal);

    let path = bfs(
        &start,
        |&(x, y)| neighbors(grid, x, y, width, height),
        |&(x, y)| (x, y) == goal,
    )?;
    let path_coords: Vec<(usize, usize)> = path.clone();
    let path_indices: Vec<usize> = path.iter().map(|&(x, y)| x * width + y).collect();
    Some((path_coords, path_indices))
}

fn find_position(grid: &Vec<Vec<i32>>, value: i32) -> Option<(usize, usize)> {
    for (i, row) in grid.iter().enumerate() {
        for (j, &cell) in row.iter().enumerate() {
            if cell == value {
                return Some((i, j));
            }
        }
    }
    None
}

fn neighbors(grid: &Vec<Vec<i32>>, x: usize, y: usize, width: usize, height: usize) -> Vec<(usize, usize)> {
    let mut result = Vec::new();
    let directions = [(0, 1), (1, 0), (0, -1), (-1, 0)];

    for &(dx, dy) in &directions {
        let nx = x.wrapping_add(dx as usize);
        let ny = y.wrapping_add(dy as usize);

        if nx < width && ny < height && (grid[nx][ny] == -1 || grid[nx][ny] == 6) {
            result.push((nx, ny));
        }
    }

    result
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

            App::new()
            .wrap(cors)
            .service(find_path)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
