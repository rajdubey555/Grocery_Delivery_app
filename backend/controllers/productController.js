const Product = require('../models/Product');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

// Helper: resolve image path (Cloudinary returns full URL, local returns /uploads/...)
const resolveImagePath = (req, file) => {
    if (!file) return '';
    // If path is already a full URL (Cloudinary), return it directly
    if (file.path && file.path.startsWith('http')) return file.path;
    // Otherwise it's a local /uploads/ path
    return file.filename ? `/uploads/${file.filename}` : (file.path || '');
};

// @desc    Get all products with search & filter
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;
        let query = {};

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sort options
        let sortOption = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };
        if (sort === 'rating') sortOption = { rating: -1 };

        const products = await Product.find(query)
            .populate('category', 'name')
            .sort(sortOption);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a product (Admin)
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, category, description, price, quantity, rating } = req.body;

        // Upload to Cloudinary if available, otherwise use local path
        let image = '';
        if (req.file) {
            const cloudUrl = await uploadToCloudinary(req.file);
            image = cloudUrl || resolveImagePath(req, req.file);
        }

        const product = await Product.create({
            name,
            category,
            description,
            price: Number(price),
            quantity: Number(quantity),
            rating: Number(rating) || 4.5,
            image,
        });

        const populated = await product.populate('category', 'name');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const { name, category, description, price, quantity, rating } = req.body;
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (category !== undefined) updateData.category = category;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = Number(price);
        if (quantity !== undefined) updateData.quantity = Number(quantity);
        if (rating !== undefined) updateData.rating = Number(rating);

        if (req.file) {
            const cloudUrl = await uploadToCloudinary(req.file);
            updateData.image = cloudUrl || resolveImagePath(req, req.file);
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        }).populate('category', 'name');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get featured/popular products
// @route   GET /api/products/featured
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category', 'name')
            .sort({ rating: -1 })
            .limit(8);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getFeaturedProducts };