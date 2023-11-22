const userModel = require('../Model/User');
const productModel = require('../Model/Product');
const bannerModel = require('../Model/banner');
const cartModel = require('../Model/cart');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

exports.createUser = async (req, res) => {
  if (!req.body.name || !req.body.confirm_password || !req.body.password || !req.body.email) {
    res.status(404).send({ success: 0, message: 'Required fields are not filled!' });
  }
  if (req.body.password !== req.body.confirm_password) {
    res.status(404).send({ success: 0, message: 'confirm password should match with the password' });
  }
  const user = new userModel({
    name: req.body.name,
    confirm_password: req.body.confirm_password,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save().then(data => {
    res.json({
      success: 1, message: 'User registered successfully!', data: {
        name: user.name,
        email: user.email
      }
    });
  }).catch(err => {
    res.status(500).send({ message: err.message || 'internal server error!' });
  });
};

exports.allProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    // Map through products to add the image URL to each product
    const productsWithImageUrl = products.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      productImage: product.productImage,
      imageUrl: `${req.protocol}://${req.get('host')}/products/${product.productImage}`,
    }));

    products.forEach(product => {
      product.productImage.forEach(image => {
        // console.log('Absolute Path:', path.join(__dirname, 'app', 'src', 'products', image));
      });
    });

    res.status(200).json({ success: 1, message: 'Products retrieved successfully.', products: productsWithImageUrl });
  } catch (error) {
    res.status(500).json({ success: 0, message: error.message });
  }
};


//get All Banners

exports.allBanners = async (req, res) => {
  try {

    const banners = await bannerModel.find();

    // Map through banners to add the image URL to each banner
    const bannersWithImageUrl = banners.map(banner => ({
      imageUrl: `${req.protocol}://${req.get('host')}/banners/${banner.banner[0]}` // Fix here
    }));

    banners.forEach(banner => {
      // Check if banner.banner is defined and is an array
      if (banner.banner && Array.isArray(banner.banner)) {
        banner.banner.forEach(image => {
          // console.log('Absolute Path:', path.join(__dirname, 'app', 'src', 'banners', image));
        });
      } else {
        console.error('Invalid banner format:', banner);
      }
    });

    res.status(200).json({ success: 1, message: 'Banners retrieved successfully.', banners: bannersWithImageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to cart (user can add multiple items to their cart over multiple requests)

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: 0, message: 'Unauthorized - no token provided.' });
    }

    const secretKey = "589a03ff00a3fe233731b63ee8e4c984cf43332823ba9ba0fcbf8a0931ea4fd0";

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: 0, message: 'Unauthorized - invalid token!' });
      }

      const user = await userModel.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ success: 0, message: 'User not found.' });
      }

      const product = await productModel.findById(productId);

      if (!product) {
        return res.status(404).json({ success: 0, message: 'Product not found.' });
      }

      let userCart = await cartModel.findOne({ user: user._id });

      // If the user doesn't have a cart, create one
      if (!userCart) {
        userCart = new cartModel({ user: user._id, items: [] });
      }

      // Check if the product is already in the user's cart
      const existingCartItem = userCart.items.find(item => item.product.equals(productId));

      if (existingCartItem) {
        // If the product is already in the cart, update the quantity
        existingCartItem.quantity += Number(quantity) || 1;
      } else {
        // If the product is not in the cart, add it
        userCart.items.push({
          product: productId,
          quantity: quantity || 1
        });
      }

      await userCart.save();

      const updatedUserCart = await cartModel.findOne({ user: decoded.userId }).populate('items.product');

      const totalItems = updatedUserCart.items.reduce((total, item) => total + item.quantity, 0);

      res.status(200).json({
        success: 1,
        message: 'Item added to the cart successfully.',
        cartInfo: {
          message: 'All cart Items',
          total_Items: totalItems,
          cartItems: updatedUserCart.items,
        }
      });
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: 0, message: 'Internal Server Error' });
  }
};

// get cart items using userId
exports.cartItems = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: 0,
        message: 'Unauthorized - no token provided.'
      });
    }

    const secretKey = "589a03ff00a3fe233731b63ee8e4c984cf43332823ba9ba0fcbf8a0931ea4fd0";

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: 0,
          message: 'Unauthorized - invalid token!'
        });
      }

      const user_cart = await cartModel.findOne({ user: decoded.userId }).populate('items.product');

      if (!user_cart) {
        return res.status(404).json({
          success: 0,
          message: 'Cart not found for the user.'
        });
      }

      const totalItems = user_cart.items.reduce((total, item) => total + item.quantity, 0);

      // Map through cart items to add the image URL to each product
      const cartItemsWithImageUrl = user_cart.items.map(item => {
        const productImageUrl = item.product.productImage && item.product.productImage.length > 0
          ? `${req.protocol}://${req.get('host')}/products/${item.product.productImage[0]}`
          : null;

        return {
          ...item.toObject(),
          product: {
            ...item.product.toObject(),
            imageUrl: productImageUrl,
          }
        };
      });

      res.status(200).json({
        success: 1,
        message: 'User cart items retrieved successfully.',
        total_Items: totalItems,
        cartItems: cartItemsWithImageUrl,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: 0, message: 'Internal Server Error' });
  }
};
