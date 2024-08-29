import { Product } from "../Models/Product.js";

//Get app Products
export const getProducts = async (req, res) => {
  try {
    let product = await Product.find();
    res.json({ Message: "All Products", product, success: true });
  } catch (error) {
    res.json({ message: "Internal error", success: false });
  }
};

//Add Products
export const addProduct = async (req, res) => {
  const { title, description, price, qty, img } = req.body;

  try {
    let product = await Product.create({
      title,
      description,
      price,
      qty,
      img,
    });

    res.json({
      message: "product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.json({ message: "Internal Server Error", success: false });
  }
};

// get product by id
export const getProductByID = async (req, res) => {
  const id = req.params.id;

  try {
    let product = await Product.find({ _id: id });
    res.json({ Message: "Product detail", product, success: true });
  } catch (error) {
    res.json({ Message: "Internal Server Error", success: true });
  }
};

//Delete product by id
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res
      .status(200)
      .json({
        message: "Product has been deleted successfully",
        success: true,
      });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// update product by id

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if(!product)return res.json({message: "Invalid Id", success: false});
    res.json({message:'Your product has been updated ',product,success:true})
  } catch (error) {
    res.json({message: "Internal Server Error", success: false})
  }
};



