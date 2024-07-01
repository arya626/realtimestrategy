function Instructions({ pathCoords }) {
  return (
    <div className="w-[40%] px-10 border-r-2 border-gray-200">
      <div className="text-left">
        <p className="font-bold">Instructions:</p>
        <ul className="list-decimal list-inside my-2">
          <li>
            Upload a map in JSON format. For this project, maps can be generated
            using{" "}
            <a
              href="https://riskylab.com/tilemap/"
              className="text-blue-700 underline"
              target="_blank"
            >
              RiskyLab
            </a>
            . Follow these steps:
            <ul className="list-disc list-inside my-2 ml-8">
              <li>
                Adjust the canvas size by navigating to Edit -&gt; Canvas
                Settings, and set the width and height to 64 each.
              </li>
              <li>
                Modify the viewport size by going to Edit -&gt; Viewport
                Settings, set Width (px) and Height (px) to 2048, and set Offset
                Top and Offset Bottom to 0.
              </li>
              <li>
                Select any tile from Tilesets, choose{" "}
                <span className="font-bold">Background</span> from Layers, and
                draw on the canvas to represent terrains.
              </li>
              <li>Export the map by selecting File -&gt; Export.</li>
            </ul>
          </li>
          <li>
            Upon file upload, the map will be displayed on the right side of the
            screen.
          </li>
          <li>
            Black tiles represent terrains, while white tiles indicate ground
            (reachable by the battle unit).
          </li>
          <li>
            Select the starting position by clicking the "Select Start" button
            and marking the grid accordingly. Repeat this process for the target
            position.
          </li>
          <li>
            The start position will be represented by a green tile, and the
            target position by a red tile.
          </li>
          <li>Click on "Find Path."</li>
          <li>
            The resulting path will be displayed on the grid, highlighted by
            yellow tiles.
          </li>
        </ul>
      </div>

      <div className="flex-wrap flex gap-4 ">
        {pathCoords.length ? (
          <p className="font-bold">Results (coordinates):</p>
        ) : (
          ""
        )}
        {pathCoords.length
          ? pathCoords.map((innerList, index) => (
              <span key={index} className="">
                ({innerList.join(", ")})
                {index < pathCoords.length - 1 ? " " : ""}
              </span>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Instructions;
