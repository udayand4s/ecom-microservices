const connectDB = require("../config/connectDb")
const Product = require("../models/product");

// Get all products
const createProduct= async (req, res) => {
    connectDB();
    try {
        const {name, description, price, category} = req.body;
        const product= new Product({
            name,
            description,
            price,
            category
        });
        await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

//update product
const updateProduct = async (req, res) => {
    connectDB();
    try {
        const { id, name, description, price, category } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        // Check if product exists
        const product= await Product.findById({id});
        if (!product) {
            return res.status(404).json({ error: 'Incorrect user id' });
        }

        // Update product
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;

        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product: {
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                createdAt: product.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Get products
const getProducts = async (req, res) => {
    connectDB();
    try {
        const {id} = req.body
        
        //get products by id
        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            return res.status(200).json({
                message: "Product fetched successfully",
                product
            });
        }
        if (!id){
            const products = await Product.find();
            if (products.length === 0) {
                return res.status(404).json({ error: 'No products found' });
            }
            return res.status(200).json({
                message: "Products fetched successfully",
                products
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

//delete product
const deleteProduct = async (req, res) => {
    connectDB();
    try {
        const {id}=req.body;
        if (!id) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        const product= await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const removedProduct= product.remove();
        res.status(200).json({
            message: "Product deleted successfully",
            removedProduct
        })
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getProducts,
    deleteProduct
};

