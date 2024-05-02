const express = require('express');
const router = express.Router();
const History = require('../db_model/history');


// Get user's history
router.get('/history/:userId', async (req, res) => {

    const userId = req.params.userId;
    
    try {
        const history = await History.find({ userId });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add to history
router.post('/history/:userId', async (req, res) => {

    const userId = req.params.userId;

    const { inputVideoUrl, outputVideoUrl } = req.body;
    const historyItem = new History({ userId, inputVideoUrl, outputVideoUrl });
    try {
        const newHistoryItem = await historyItem.save();
        res.status(201).json(newHistoryItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
