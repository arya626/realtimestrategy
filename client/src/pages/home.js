import { useState } from "react";
import Grid from "../components/Grid";

function Home() {
  const [data, setData] = useState([]);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          let field = jsonData.layers[0].data;
          field = field.map((item) => (item !== -1 ? 4 : item));
          setData(field);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-center text-2xl font-bold mt-4 mb-2">
          Real-Time Strategy Game
        </h1>
        <p className="text-center my-2">By: Arya Guddemane Vishwakumar</p>

        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-b-blue-200"
        />

        <Grid data={data} />
      </div>
    </>
  );
}

export default Home;
