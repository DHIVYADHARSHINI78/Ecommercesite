// import axios from "axios";

// export const getProducts = async () => {
//   try {
//     const res = await axios.get("http://localhost:4000/products");
//     return res.data;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };


import setDosaImg from "../assets/images/setdosa.jpg";
import masalaDosaImg from "../assets/images/masaladosa.jpg";
import idlyImg from "../assets/images/idly.jpg";
import vadaImg from "../assets/images/vada.jpg";
import pongalImg from "../assets/images/pongal.jpg";
import parottaImg from "../assets/images/parotta.jpg";
import briyaniImg from "../assets/images/briyani.jpg";
import chickenRiceImg from "../assets/images/chickenrice.jpg";
import momosImg from "../assets/images/momos.jpg";
import brownieImg from "../assets/images/brownie.jpg";

const products = [
  { id: 1, name: "Dosa Set", price: 60, stock: 10, category: "Food", desc: "Crispy dosa", image: setDosaImg },
  { id: 2, name: "Masala Dosa", price: 80, stock: 0, category: "Food", desc: "Spicy masala dosa", image: masalaDosaImg },
  { id: 3, name: "Idly", price: 30, stock: 20, category: "Food", desc: "Soft idly", image: idlyImg },
  { id: 4, name: "Vada", price: 25, stock: 15, category: "Food", desc: "Vada", image: vadaImg },
  { id: 5, name: "Pongal", price: 45, stock: 12, category: "Food", desc: "Ghee pongal", image: pongalImg },
  { id: 6, name: "Parotta", price: 50, stock: 0, category: "Food", desc: "Parotta", image: parottaImg },
  { id: 7, name: "Chicken Biryani", price: 150, stock: 8, category: "Nonveg", desc: "Biryani", image: briyaniImg },
  { id: 8, name: "Fried Rice", price: 120, stock: 7, category: "Nonveg", desc: "Fried rice", image: chickenRiceImg },
  { id: 9, name: "Momos", price: 90, stock: 9, category: "Snack", desc: "Steamed momos", image: momosImg },
  { id: 10, name: "Brownie", price: 70, stock: 6, category: "Dessert", desc: "Chocolate brownie", image: brownieImg }
];

export default products;
