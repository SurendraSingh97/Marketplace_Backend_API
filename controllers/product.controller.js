const Product = require('../models/product.model');

// Get All products or Get specific products by Title
exports.getAllProducts = async (req, res) => {
    try {
        let titleQuery = req.query.name;
        let products;

        if (titleQuery) {
            // Using a case-insensitive search
            products = await Product.find({ name: new RegExp(titleQuery, 'i') });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found, Please try Again' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add new product
exports.addNewProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete product
exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log(product.name)
        res.status(200).json({ message: `Product '${product.name}' with id : ${product._id} is deleted`});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ message: 'All products are deleted from DB' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
