const connectDB = require('../config/db');
const Order = require('../models/order');
const axios = require('axios');


const createOrder = async (req, req) =>{
    connectDB()
    try {
        const { userId, items } = req.body;
        if (!userId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'User ID, Product ID, and Quantity are required' });
        }

        for (const item of items) {
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ 
                    error: 'Each item must have productId and quantity (greater than 0)' 
                });
            }
        }

        const productIds = [...new Set(items.map(item => item.productId))];

        // Fetch product details from product service
        const productResponse = await axios.post(
            `http://localhost:3001/api/products/bulk` || `http://product-service:3001/api/products/bulk`,{ productIds },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const productMap = productResponse.data.products;

        // Calculate total cost and prepare order details
        let totalCost = 0;
        const orderItems = [];
        const unavailableProducts = [];

        for (const item of items) {
            const product = productMap[item.productId];
            
            if (!product) {
                unavailableProducts.push(item.productId);
                continue;
            }

            // Check stock availability
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for product ${item.productId}. Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }

            const itemTotal = product.price * item.quantity;
            totalCost += itemTotal;
            
            orderItems.push({
                productId: item.productId,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                itemTotal: itemTotal
            });
        }

        // Check if any products were unavailable
        if (unavailableProducts.length > 0) {
            return res.status(404).json({
                error: 'Some products not found',
                unavailableProducts: unavailableProducts
            });
        }

        await Order.create({
            userId,
            items: orderItems,
            cost: totalCost
        })
            
        // Return the calculated total and order details
        res.status(200).json({
            userId: userId,
            items: orderItems,
            totalCost: totalCost,
            itemCount: orderItems.length,
            message: 'Order calculated successfully'
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        
    }
}