const Product = require("../models/products");

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 399,
        inStock: true,
        tags: ["footwear", "running"],
      },
    ];

    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      data: `Inserted ${result.length} sample products`,
    });
  } catch (e) {
    console.log("error in insertSampleProducts");
    res.status(500).json({
      success: false,
      message: "Some error in insertSampleProduct",
    });
  }
};

const getProductsStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      // stage 1
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100,
          },
        },
      },
      // stage 2
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log("error in insertSampleProducts");
    res.status(500).json({
      success: false,
      message: "Some error in getProductStats",
    });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
            _id: null,
            totalRevenue: {
              $sum: "$price"
            },
            averagePrice: {
                $avg: "$price"
            },
            maxProductPrice: {
                $max: "$price"
            },
            minProductPrice: {
                $min: "$price"
            },
        }
      },
      {
        $project: {
            _id: 0,
            totalRevenue: 1,
            averagePrice: 1,
            maxProductPrice: 1,
            minProductPrice: 1,
            priceRange: {
                $subtract: ["$maxProductPrice", "$minProductPrice"]
            }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log("error in insertSampleProducts");
    res.status(500).json({
      success: false,
      message: "Some error in getProductAnalysis",
    });
  }
};

module.exports = { insertSampleProducts, getProductsStats, getProductAnalysis };
