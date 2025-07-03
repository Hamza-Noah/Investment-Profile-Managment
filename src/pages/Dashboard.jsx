import { useState } from "react";
import AssetPieChart from "../components/AssetPieChart";

function Dashboard({ assets, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const startEdit = (asset) => {
    setEditingId(asset.id);
    setEditFormData({ ...asset });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updatedAsset = {
      ...editFormData,
      quantity: parseFloat(editFormData.quantity),
      buyPrice: parseFloat(editFormData.buyPrice),
      currentPrice: parseFloat(
        editFormData.currentPrice || editFormData.buyPrice
      ),
    };
    onUpdate(updatedAsset);
    setEditingId(null);
  };

  const totalInvested = assets.reduce(
    (sum, asset) => sum + asset.buyPrice * asset.quantity,
    0
  );

  const currentValue = assets.reduce(
    (sum, asset) => sum + asset.currentPrice * asset.quantity,
    0
  );

  const profitLoss = currentValue - totalInvested;

  const filteredAssets = assets.filter((asset) => {
    const matchesType =
      filterType === "All" ||
      asset.type.toLowerCase() === filterType.toLowerCase();

    const matchesSearch = asset.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Portfolio Summary */}
      <div>
        <h2>Portfolio Summary</h2>
        <p>
          <strong>Total Invested:</strong> ${totalInvested.toFixed(2)}
        </p>
        <p>
          <strong>Current Value:</strong> ${currentValue.toFixed(2)}
        </p>
        <p>
          <strong>Profit/Loss:</strong>{" "}
          <span style={{ color: profitLoss >= 0 ? "green" : "red" }}>
            ${profitLoss.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Pie Chart */}
      <h2>Investment Distribution</h2>
      <AssetPieChart assets={assets} />

      {/* Filter Controls */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Stock">Stock</option>
          <option value="Crypto">Crypto</option>
          <option value="Bond">Bond</option>
        </select>
      </div>

      {/* Asset List */}
      <h2>Holdings</h2>
      <ul>
        {filteredAssets.map((asset) => (
          <li key={asset.id}>
            {editingId === asset.id ? (
              <>
                <input
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                />
                <input
                  name="type"
                  value={editFormData.type}
                  onChange={handleEditChange}
                />
                <input
                  name="quantity"
                  type="number"
                  value={editFormData.quantity}
                  onChange={handleEditChange}
                />
                <input
                  name="buyPrice"
                  type="number"
                  value={editFormData.buyPrice}
                  onChange={handleEditChange}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{asset.name}</strong> - {asset.type} - Qty:{" "}
                {asset.quantity} - Buy: ${asset.buyPrice} - Current: $
                {asset.currentPrice}
                <button onClick={() => startEdit(asset)}>Edit</button>
                <button onClick={() => onDelete(asset.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
