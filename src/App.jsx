import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AddAsset from "./pages/AddAsset";
import mockAssets from "./data/mockdata.js";


function App() {
  const [assets, setAssets] = useState(mockAssets);

  const addAsset = (asset) => {
    setAssets((prev) => [...prev, asset]);
  };

  const updateAsset = (updatedAsset) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === updatedAsset.id ? updatedAsset : a))
    );
  };

  const deleteAsset = (id) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            assets={assets}
            onDelete={deleteAsset}
            onUpdate={updateAsset}
          />
        }
      />
      <Route path="/add" element={<AddAsset onAdd={addAsset} />} />
    </Routes>
  );
}

export default App;
