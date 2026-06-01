const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const categories = [
    { name: 'Fruits', image: '' },
    { name: 'Vegetables', image: '' },
    { name: 'Dairy', image: '' },
    { name: 'Bakery', image: '' },
    { name: 'Snacks', image: '' },
    { name: 'Beverages', image: '' },
];

const products = [
    // Fruits
    { name: 'Fresh Apple', category: null, description: 'Fresh and crispy apples from Kashmir', price: 180, quantity: 100, rating: 4.5 },
    { name: 'Banana', category: null, description: 'Fresh ripe bananas', price: 60, quantity: 150, rating: 4.3 },
    { name: 'Mango', category: null, description: 'Sweet Alphonso mangoes', price: 250, quantity: 80, rating: 4.8 },
    { name: 'Orange', category: null, description: 'Juicy Nagpur oranges', price: 120, quantity: 120, rating: 4.2 },
    { name: 'Grapes', category: null, description: 'Fresh seedless grapes', price: 160, quantity: 90, rating: 4.4 },
    // Vegetables
    { name: 'Tomato', category: null, description: 'Fresh farm tomatoes', price: 40, quantity: 200, rating: 4.0 },
    { name: 'Potato', category: null, description: 'Premium quality potatoes', price: 35, quantity: 300, rating: 4.2 },
    { name: 'Onion', category: null, description: 'Fresh red onions', price: 45, quantity: 250, rating: 4.1 },
    { name: 'Cauliflower', category: null, description: 'Fresh cauliflower', price: 30, quantity: 100, rating: 4.0 },
    { name: 'Spinach', category: null, description: 'Fresh green spinach', price: 25, quantity: 80, rating: 4.3 },
    // Dairy
    { name: 'Amul Milk', category: null, description: 'Fresh toned milk 500ml', price: 26, quantity: 500, rating: 4.6 },
    { name: 'Amul Butter', category: null, description: 'Amul butter 100g', price: 55, quantity: 200, rating: 4.7 },
    { name: 'Cheese', category: null, description: 'Amul cheese slices', price: 120, quantity: 150, rating: 4.5 },
    { name: 'Yogurt', category: null, description: 'Fresh creamy yogurt', price: 40, quantity: 180, rating: 4.3 },
    { name: 'Paneer', category: null, description: 'Fresh soft paneer 200g', price: 85, quantity: 120, rating: 4.6 },
    // Bakery
    { name: 'Brown Bread', category: null, description: 'Whole wheat brown bread', price: 45, quantity: 150, rating: 4.4 },
    { name: 'White Bread', category: null, description: 'Soft white sandwich bread', price: 35, quantity: 200, rating: 4.2 },
    { name: 'Chocolate Cake', category: null, description: 'Rich chocolate cake', price: 350, quantity: 30, rating: 4.8 },
    { name: 'Cookies', category: null, description: 'Assorted cookies 200g', price: 99, quantity: 100, rating: 4.3 },
    // Snacks
    { name: 'Lays Chips', category: null, description: 'Classic salted chips', price: 30, quantity: 300, rating: 4.4 },
    { name: 'Kurkure', category: null, description: 'Masala munch snack', price: 20, quantity: 250, rating: 4.3 },
    { name: 'Noodles', category: null, description: 'Maggi masala noodles', price: 14, quantity: 500, rating: 4.5 },
    { name: 'Biscuits', category: null, description: 'Oreo chocolate biscuits', price: 35, quantity: 200, rating: 4.6 },
    // Beverages
    { name: 'Coca Cola', category: null, description: 'Coca cola 750ml', price: 40, quantity: 400, rating: 4.3 },
    { name: 'Sprite', category: null, description: 'Sprite lemon drink 750ml', price: 40, quantity: 350, rating: 4.2 },
    { name: 'Orange Juice', category: null, description: 'Real orange juice 1L', price: 120, quantity: 100, rating: 4.5 },
    { name: 'Green Tea', category: null, description: 'Lipton green tea 25 bags', price: 180, quantity: 80, rating: 4.4 },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected for Seeding');

        // Clear existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️  Existing data cleared');

        // Create admin user
        await User.create({
            name: 'Admin',
            email: 'admin@grocery.com',
            mobile: '9999999999',
            password: 'admin123',
            role: 'admin',
        });
        console.log('👨‍💼 Admin user created (admin@grocery.com / admin123)');

        // Create sample user
        await User.create({
            name: 'Rahul Sharma',
            email: 'rahul@gmail.com',
            mobile: '9876543210',
            password: 'rahul123',
            role: 'user',
        });
        console.log('👤 Sample user created (rahul@gmail.com / rahul123)');

        // Create categories
        const createdCategories = await Category.insertMany(categories);
        console.log(`📂 ${createdCategories.length} categories created`);

        // Map category names to IDs
        const catMap = {};
        createdCategories.forEach((cat) => {
            catMap[cat.name] = cat._id;
        });

        // Assign categories to products
        const categoryProductMap = {
            Fruits: ['Fresh Apple', 'Banana', 'Mango', 'Orange', 'Grapes'],
            Vegetables: ['Tomato', 'Potato', 'Onion', 'Cauliflower', 'Spinach'],
            Dairy: ['Amul Milk', 'Amul Butter', 'Cheese', 'Yogurt', 'Paneer'],
            Bakery: ['Brown Bread', 'White Bread', 'Chocolate Cake', 'Cookies'],
            Snacks: ['Lays Chips', 'Kurkure', 'Noodles', 'Biscuits'],
            Beverages: ['Coca Cola', 'Sprite', 'Orange Juice', 'Green Tea'],
        };

        const productsWithCategory = products.map((product) => {
            let categoryId = null;
            for (const [catName, productNames] of Object.entries(categoryProductMap)) {
                if (productNames.includes(product.name)) {
                    categoryId = catMap[catName];
                    break;
                }
            }
            return { ...product, category: categoryId };
        });

        // Create products
        const createdProducts = await Product.insertMany(productsWithCategory);
        console.log(`📦 ${createdProducts.length} products created`);

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📋 Login Credentials:');
        console.log('   Admin: admin@grocery.com / admin123');
        console.log('   User:  rahul@gmail.com / rahul123\n');

        process.exit();
    } catch (error) {
        console.error(`❌ Seeding Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();