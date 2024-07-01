import axios from "axios";
import React, { useEffect, useState } from "react";
import Instructions from "./Instructions";

function Grid({ data }) {
  const [grid, setGrid] = useState([]);
  const [pathIndices, setPathIndices] = useState([]);
  const [pathCoords, setPathCoords] = useState([]);
  const [mode, setMode] = useState("");
  const [start, setStart] = useState();
  const [target, setTarget] = useState();
  const [resMessage, setResMessage] = useState("");

  useEffect(() => {
    createGrid(data);
  }, [data]);

  const getClassName = (value) => {
    switch (value) {
      case 0:
        return "bg-green-500";
      case 6:
        return "bg-red-500";
      case -1:
        return "bg-white";
      case "#":
        return "bg-yellow-200";
      default:
        return "bg-black";
    }
  };

  async function handleClick() {
    axios
      .post("http://127.0.0.1:8080/find-path", {
        data: data,
      })
      .then(({ data }) => {
        if (data.path_indices) {
          drawPath(data.path_indices);
          setPathIndices(data.path_indices);
          setPathCoords(data.path_coordinates);
          setMode();
          setStart();
          setTarget();
          setResMessage("Path Found!");
        } else {
          setResMessage("No path found!");
        }
      })
      .catch((err) => {
        setResMessage(
          "No path found! Please choose different start and target"
        );
      });
  }

  function createGrid(data) {
    const dimension = Math.sqrt(data.length);
    const newGrid = [];
    for (let i = 0; i < dimension; i++) {
      newGrid.push(data.slice(i * dimension, (i + 1) * dimension));
    }
    setGrid(newGrid);
  }

  function drawPath(path) {
    for (const point of path) {
      data[point] = "#";
    }
    data[path[0]] = 0;
    data[path[path.length - 1]] = 6;
    createGrid(data);
  }

  function handleCellClick(e) {
    let id = e.target.id;
    if (data[id] === -1) {
      if (mode === "start") {
        start && (data[start] = -1);
        data[id] = 0;
        setStart(id);
      } else if (mode === "target") {
        target && (data[target] = -1);
        data[id] = 6;
        setTarget(id);
      }
    } else {
      console.log("Please select empty areas");
    }

    createGrid(data);
  }

  function handleClear() {
    setMode();
    data[start] = -1;
    data[target] = -1;
    createGrid(data);
    setStart();
    setTarget();
    setResMessage("");
  }

  function handleClearPath() {
    for (const point of pathIndices) {
      data[point] = -1;
    }
    createGrid(data);
    setPathIndices([]);
    setPathCoords([]);
    setMode();
    setStart();
    setTarget();
    setResMessage("");
  }

  return (
    <>
      <div className="flex justify-between py-10">
        <Instructions pathCoords={pathCoords} />
        <div className="flex flex-col items-center w-[60%]">
          <p className="font-bold text-xl">Map</p>
          {grid.length ? (
            <div className="flex my-6 justify-between w-[750px]">
              <div className="flex gap-4">
                <button
                  className={
                    "rounded-xl px-3 py-1 text-sm h-8 hover:bg-green-500 " +
                    (mode === "start" ? "bg-green-500" : "bg-green-300")
                  }
                  onClick={() => setMode("start")}
                  disabled={pathIndices.length}
                >
                  Select Start
                </button>
                <button
                  className={
                    "rounded-xl px-3 py-1 text-sm h-8 hover:bg-red-500 " +
                    (mode === "target" ? "bg-red-500" : "bg-red-400")
                  }
                  onClick={() => setMode("target")}
                  disabled={pathIndices.length}
                >
                  Select Target
                </button>

                <button
                  className="bg-gray-200 rounded-xl px-3 py-1 text-sm h-8 hover:bg-gray-300 disabled:opacity-50"
                  onClick={handleClick}
                  disabled={!start || !target}
                >
                  Find Path
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-gray-200 rounded-xl px-3 py-1 text-sm h-8 hover:bg-gray-300"
                  onClick={handleClear}
                >
                  Clear Selection
                </button>
                {pathIndices.length ? (
                  <button
                    className="bg-gray-200 rounded-xl px-3 py-1 text-sm h-8 hover:bg-gray-30"
                    onClick={handleClearPath}
                  >
                    Clear Path
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          <p className="text-base my-4">{resMessage}</p>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`w-3 h-3 flex justify-center items-center border ${getClassName(
                    cell
                  )}`}
                  id={rowIndex * row.length + cellIndex}
                  onClick={(e) => handleCellClick(e)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Grid;
