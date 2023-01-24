import Product from "../model/product-schema.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products)
    if (products) {
      return res.status(200).json(products);
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ "id": id });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
