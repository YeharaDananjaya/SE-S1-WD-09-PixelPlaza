const express = require('express');
const router = express.Router();
const PreviousOrder = require('../models/PreviousOrders');

// Add a new order after checkout
router.post('/', (req, res) => {
    PreviousOrder.create(req.body)
        .then(() => res.json({ msg: "Order successfully added to previous orders" }))
        .catch(() => res.status(400).json({ msg: "Order adding failed" }));
});

// Get all previous orders
router.get('/', (req, res) => {
    PreviousOrder.find()
        .then((orders) => res.json(orders))
        .catch(() => res.status(400).json({ msg: "Failed to retrieve previous orders" }));
});

// Delete all previous orders
router.delete('/', (req, res) => {
    PreviousOrder.deleteMany() // Adjust this if you need to filter by user or other criteria
        .then(() => res.json({ msg: "All previous orders deleted successfully" }))
        .catch(() => res.status(400).json({ msg: "Failed to delete previous orders" }));
});

module.exports = router;
