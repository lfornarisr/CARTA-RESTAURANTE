import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dishes: [dishSchema],
});

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: [categorySchema],
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
