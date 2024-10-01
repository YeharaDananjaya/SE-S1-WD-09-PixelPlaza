const express = require("express");
const router = express.Router();
const PreviousOrder = require("../models/PreviousOrders");
const Income = require("../models/income");

// Function to calculate daily income for a specific shop and date
const calculateDailyIncomeForShop = async (shopId, specificDate) => {
  const date = new Date(specificDate);

  // Aggregate income from PreviousOrder based on shopID and specific date
  const dailyIncome = await PreviousOrder.aggregate([
    { $unwind: "$items" },
    {
      $match: {
        "items.shopID": shopId,
        date: {
          $gte: new Date(date.setHours(0, 0, 0, 0)), // start of the day
          $lt: new Date(date.setHours(23, 59, 59, 999)), // end of the day
        },
      },
    },
    {
      $group: {
        _id: {
          shopId: "$items.shopID",
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
        },
        totalIncome: { $sum: { $multiply: ["$items.price", "$items.count"] } },
        salesDetails: {
          $push: {
            itemId: "$items._id",
            quantity: "$items.count",
            totalSales: { $multiply: ["$items.price", "$items.count"] },
          },
        },
      },
    },
  ]);

  return dailyIncome;
};

// Route to calculate daily income for a specific shop and date
router.post("/dailyIncomeByShop", async (req, res) => {
  const { shopId, specificDate } = req.body;

  if (!shopId || !specificDate) {
    return res
      .status(400)
      .json({ error: "Shop ID and specific date are required." });
  }

  try {
    const incomeData = await calculateDailyIncomeForShop(shopId, specificDate);

    if (incomeData.length > 0) {
      res.status(200).json({
        message: "Daily income calculated successfully.",
        data: incomeData[0],
      });
    } else {
      res.status(404).json({
        message: "No sales data found for the provided shop and date.",
      });
    }
  } catch (err) {
    console.error("Error calculating daily income for shop:", err);
    res
      .status(500)
      .json({ error: "Failed to calculate daily income for the shop." });
  }
});

// Route to calculate monthly income for a specific shop and month
router.post("/monthlyIncomeByShop", async (req, res) => {
  const { shopId, year, month } = req.body;

  if (!shopId || !year || !month) {
    return res
      .status(400)
      .json({ error: "Shop ID, year, and month are required." });
  }

  try {
    const monthlyIncome = await PreviousOrder.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.shopID": shopId,
          date: {
            $gte: new Date(year, month - 1, 1), // start of the month
            $lt: new Date(year, month, 1), // start of next month
          },
        },
      },
      {
        $group: {
          _id: {
            shopId: "$items.shopID",
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalIncome: {
            $sum: { $multiply: ["$items.price", "$items.count"] },
          },
          salesDetails: {
            $push: {
              itemId: "$items._id",
              quantity: "$items.count",
              totalSales: { $multiply: ["$items.price", "$items.count"] },
            },
          },
        },
      },
    ]);

    if (monthlyIncome.length > 0) {
      res.status(200).json({
        message: "Monthly income calculated successfully.",
        data: monthlyIncome[0],
      });
    } else {
      res.status(404).json({
        message: "No sales data found for the provided shop and month.",
      });
    }
  } catch (err) {
    console.error("Error calculating monthly income for shop:", err);
    res
      .status(500)
      .json({ error: "Failed to calculate monthly income for the shop." });
  }
});

// Route to calculate yearly income for a specific shop and year
router.post("/yearlyIncomeByShop", async (req, res) => {
  const { shopId, year } = req.body;

  if (!shopId || !year) {
    return res.status(400).json({ error: "Shop ID and year are required." });
  }

  try {
    const yearlyIncome = await PreviousOrder.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.shopID": shopId,
          date: {
            $gte: new Date(year, 0, 1), // start of the year
            $lt: new Date(year + 1, 0, 1), // start of next year
          },
        },
      },
      {
        $group: {
          _id: {
            shopId: "$items.shopID",
            year: { $year: "$date" },
          },
          totalIncome: {
            $sum: { $multiply: ["$items.price", "$items.count"] },
          },
          salesDetails: {
            $push: {
              itemId: "$items._id",
              quantity: "$items.count",
              totalSales: { $multiply: ["$items.price", "$items.count"] },
            },
          },
        },
      },
    ]);

    // Route to get daily income for a specific shop and date
    router.get("/dailyIncomeByShop", async (req, res) => {
      const { shopId, specificDate } = req.query;

      if (!shopId || !specificDate) {
        return res
          .status(400)
          .json({ error: "Shop ID and specific date are required." });
      }

      try {
        const incomeData = await calculateDailyIncomeForShop(
          shopId,
          specificDate
        );

        if (incomeData.length > 0) {
          res.status(200).json({
            message: "Daily income retrieved successfully.",
            data: incomeData[0],
          });
        } else {
          res.status(404).json({
            message: "No sales data found for the provided shop and date.",
          });
        }
      } catch (err) {
        console.error("Error retrieving daily income for shop:", err);
        res
          .status(500)
          .json({ error: "Failed to retrieve daily income for the shop." });
      }
    });

    // Route to get monthly income for a specific shop and month
    router.get("/monthlyIncomeByShop", async (req, res) => {
      const { shopId, year, month } = req.query;

      if (!shopId || !year || !month) {
        return res
          .status(400)
          .json({ error: "Shop ID, year, and month are required." });
      }

      try {
        const monthlyIncome = await PreviousOrder.aggregate([
          { $unwind: "$items" },
          {
            $match: {
              "items.shopID": shopId,
              date: {
                $gte: new Date(year, month - 1, 1), // start of the month
                $lt: new Date(year, month, 1), // start of next month
              },
            },
          },
          {
            $group: {
              _id: {
                shopId: "$items.shopID",
                year: { $year: "$date" },
                month: { $month: "$date" },
              },
              totalIncome: {
                $sum: { $multiply: ["$items.price", "$items.count"] },
              },
              salesDetails: {
                $push: {
                  itemId: "$items._id",
                  quantity: "$items.count",
                  totalSales: { $multiply: ["$items.price", "$items.count"] },
                },
              },
            },
          },
        ]);

        if (monthlyIncome.length > 0) {
          res.status(200).json({
            message: "Monthly income retrieved successfully.",
            data: monthlyIncome[0],
          });
        } else {
          res.status(404).json({
            message: "No sales data found for the provided shop and month.",
          });
        }
      } catch (err) {
        console.error("Error retrieving monthly income for shop:", err);
        res
          .status(500)
          .json({ error: "Failed to retrieve monthly income for the shop." });
      }
    });

    // Route to get yearly income for a specific shop and year
    router.get("/yearlyIncomeByShop", async (req, res) => {
      const { shopId, year } = req.query;

      if (!shopId || !year) {
        return res
          .status(400)
          .json({ error: "Shop ID and year are required." });
      }

      try {
        const yearlyIncome = await PreviousOrder.aggregate([
          { $unwind: "$items" },
          {
            $match: {
              "items.shopID": shopId,
              date: {
                $gte: new Date(year, 0, 1), // start of the year
                $lt: new Date(year + 1, 0, 1), // start of next year
              },
            },
          },
          {
            $group: {
              _id: {
                shopId: "$items.shopID",
                year: { $year: "$date" },
              },
              totalIncome: {
                $sum: { $multiply: ["$items.price", "$items.count"] },
              },
              salesDetails: {
                $push: {
                  itemId: "$items._id",
                  quantity: "$items.count",
                  totalSales: { $multiply: ["$items.price", "$items.count"] },
                },
              },
            },
          },
        ]);

        if (yearlyIncome.length > 0) {
          res.status(200).json({
            message: "Yearly income retrieved successfully.",
            data: yearlyIncome[0],
          });
        } else {
          res.status(404).json({
            message: "No sales data found for the provided shop and year.",
          });
        }
      } catch (err) {
        console.error("Error retrieving yearly income for shop:", err);
        res
          .status(500)
          .json({ error: "Failed to retrieve yearly income for the shop." });
      }
    });

    if (yearlyIncome.length > 0) {
      res.status(200).json({
        message: "Yearly income calculated successfully.",
        data: yearlyIncome[0],
      });
    } else {
      res.status(404).json({
        message: "No sales data found for the provided shop and year.",
      });
    }
  } catch (err) {
    console.error("Error calculating yearly income for shop:", err);
    res
      .status(500)
      .json({ error: "Failed to calculate yearly income for the shop." });
  }
});

// Existing route to calculate and store daily income
router.get("/dailyIncome", async (req, res) => {
  try {
    await calculateDailyIncome();
    res
      .status(200)
      .json({ message: "Daily income calculated and stored successfully." });
  } catch (err) {
    console.error("Error calculating daily income:", err);
    res.status(500).json({ error: "Failed to calculate daily income." });
  }
});

// Function to calculate daily income
const calculateDailyIncome = async () => {
  const dailyIncome = await PreviousOrder.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: {
          shopId: "$items.shopID",
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
        },
        totalIncome: { $sum: { $multiply: ["$items.price", "$items.count"] } },
        salesDetails: {
          $push: {
            itemId: "$items._id",
            quantity: "$items.count",
            totalSales: { $multiply: ["$items.price", "$items.count"] },
          },
        },
      },
    },
  ]);

  dailyIncome.forEach(async (incomeData) => {
    await Income.updateOne(
      {
        shopId: incomeData._id.shopId,
        year: incomeData._id.year,
        month: incomeData._id.month,
        day: incomeData._id.day,
      },
      {
        $set: {
          totalIncome: incomeData.totalIncome,
          salesDetails: incomeData.salesDetails,
        },
      },
      { upsert: true }
    );
  });
};

// Existing route to calculate monthly income
router.get("/monthlyIncome", async (req, res) => {
  try {
    await calculateMonthlyIncome();
    res
      .status(200)
      .json({ message: "Monthly income calculated and stored successfully." });
  } catch (err) {
    console.error("Error calculating monthly income:", err);
    res.status(500).json({ error: "Failed to calculate monthly income." });
  }
});

// Function to calculate monthly income
const calculateMonthlyIncome = async () => {
  const monthlyIncome = await PreviousOrder.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: {
          shopId: "$items.shopID",
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        totalIncome: { $sum: { $multiply: ["$items.price", "$items.count"] } },
      },
    },
  ]);

  monthlyIncome.forEach(async (incomeData) => {
    await Income.updateOne(
      {
        shopId: incomeData._id.shopId,
        year: incomeData._id.year,
        month: incomeData._id.month,
      },
      {
        $set: {
          totalIncome: incomeData.totalIncome,
        },
      },
      { upsert: true }
    );
  });
};

// Existing route to calculate yearly income
router.get("/yearlyIncome", async (req, res) => {
  try {
    await calculateYearlyIncome();
    res
      .status(200)
      .json({ message: "Yearly income calculated and stored successfully." });
  } catch (err) {
    console.error("Error calculating yearly income:", err);
    res.status(500).json({ error: "Failed to calculate yearly income." });
  }
});

// Function to calculate yearly income
const calculateYearlyIncome = async () => {
  const yearlyIncome = await PreviousOrder.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: {
          shopId: "$items.shopID",
          year: { $year: "$date" },
        },
        totalIncome: { $sum: { $multiply: ["$items.price", "$items.count"] } },
      },
    },
  ]);

  yearlyIncome.forEach(async (incomeData) => {
    await Income.updateOne(
      {
        shopId: incomeData._id.shopId,
        year: incomeData._id.year,
      },
      {
        $set: {
          totalIncome: incomeData.totalIncome,
        },
      },
      { upsert: true }
    );
  });
};

module.exports = router;
