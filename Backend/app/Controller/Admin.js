const productModel = require('../Model/Product');
const bannerModel = require('../Model/banner');

exports.addProduct = async (req, res) => {
  try {
    if (!req.body) {
      res.status(404).send({
        success: 0,
        message: "product data can't be empty!"
      });
    }

    if (!req.file) {
      return res.status(400).send({
        success: 0,
        message: 'no file uploaded'
      });
    }
    if (!req.file.filename) {
      return res.status(400).send({
        success: 0,
        message: "File name is missing."
      });
    }

    const { name, price, discount } = req.body;
    const productImage = req.file.filename;

    const product = new productModel({
      name: name,
      price: price,
      discount: discount,
      productImage: productImage,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: 1,
      message: "product added successfully!!",
      post: savedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: 0,
      message: 'Internal server error' });
  }
};

//add banner
exports.addBanner = async (req, res) => {
    try { 
      if (!req.file) {
        return res.status(400).send({
          success: 0,
          message: 'no file uploaded'
        });
      }
      if (!req.file.filename) {
        return res.status(400).send({
          success: 0,
          message: "File name is missing."
        });
      }
  
      const bannerImage = req.file.filename;
  
      const banner = new bannerModel({
        banner: bannerImage,
      });
  
      const data = await banner.save();
  
      res.status(201).json({
        success: 1,
        message: "Banner added successfully!!",
        post: data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 
        success: 0,
        message: 'Internal server error' });
    }
  };