import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAsset.css";

function AddAsset({ onAdd }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "Stock",
    quantity: "",
    buyPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAsset = {
      ...formData,
      id: Date.now(),
      quantity: parseFloat(formData.quantity),
      buyPrice: parseFloat(formData.buyPrice),
      currentPrice: parseFloat(formData.buyPrice),
    };

    onAdd(newAsset);
    navigate("/");
  };

  return (
    <div className="add-asset-container">
      <h1>Add New Asset</h1>
      <form className="add-asset-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Asset Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Stock">Stock</option>
          <option value="Crypto">Crypto</option>
          <option value="Bond">Bond</option>
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="buyPrice"
          placeholder="Buy Price"
          value={formData.buyPrice}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
}

export default AddAsset;
 