import axios from "axios";

export const getProducts = async () => {
  try {
    const res = await axios.get("http://localhost:4000/products");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};