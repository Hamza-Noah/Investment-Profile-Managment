import React, { useState } from "react";
import "./Dashboard.css";
import AssetPieChart from "../components/AssetPieChart"
function Dashboard({ assets, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeTab, setActiveTab] = useState("Overview");


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
    <div className="dashboard">
      <h1>Investment Portfolio Dashboard</h1>
      <p className="subtext">Track and manage your investment portfolio</p>

      {/* Tabs */}
      <div className="tabs">
        {["Overview", "Charts", "Simulation"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <>
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="card">
              <p>Total Invested</p>
              <p>${totalInvested.toFixed(2)}</p>
            </div>
            <div className="card">
              <p>Current Value</p>
              <p>${currentValue.toFixed(2)}</p>
            </div>
            <div className="card">
              <p>Total Return</p>
              <p className="positive">${profitLoss.toFixed(2)}</p>
            </div>
            <div className="card">
              <p>Return %</p>
              <p className="positive">
                {(profitLoss / totalInvested * 100).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Stock">Stock</option>
              <option value="Crypto">Crypto</option>
              <option value="Bond">Bond</option>
            </select>
          </div>

          {/* Asset Table */}
          <table className="asset-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Buy Price</th>
                <th>Current Price</th>
                <th>Total Value</th>
                <th>Return</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => {
                const total = asset.currentPrice * asset.quantity;
                const ret = total - asset.buyPrice * asset.quantity;
                return (
                  <tr key={asset.id}>
                    <td>
                      {editingId === asset.id ? (
                        <input
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        asset.name
                      )}
                    </td>
                    <td>
                      {editingId === asset.id ? (
                        <input
                          name="type"
                          value={editFormData.type}
                          onChange={handleEditChange}
                        />
                      ) : (
                        asset.type
                      )}
                    </td>
                    <td>
                      {editingId === asset.id ? (
                        <input
                          name="quantity"
                          type="number"
                          value={editFormData.quantity}
                          onChange={handleEditChange}
                        />
                      ) : (
                        asset.quantity
                      )}
                    </td>
                    <td>
                      {editingId === asset.id ? (
                        <input
                          name="buyPrice"
                          type="number"
                          value={editFormData.buyPrice}
                          onChange={handleEditChange}
                        />
                      ) : (
                        `$${asset.buyPrice}`
                      )}
                    </td>
                    <td>${asset.currentPrice}</td>
                    <td>${total.toFixed(2)}</td>
                    <td className="positive">${ret.toFixed(2)}</td>
                    <td className="actions">
                      {editingId === asset.id ? (
                        <>
                          <button onClick={saveEdit}>Save</button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="delete"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(asset)}>Edit</button>
                          <button
                            onClick={() => onDelete(asset.id)}
                            className="delete"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}


      {activeTab === "Charts" && (
  <div>
    <h2>Investment Distribution</h2>
    <AssetPieChart assets={assets} />
  </div>
)}

      {activeTab === "Simulation" && (
        <div>
          <h2>Simulation</h2>
          <p>Test different investment scenarios here (coming soon).</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
