// routes/slotRoutes.js

const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotControllers');
let middleware = require('../middleware/auth');


router.get('/slots', middleware.authenticate,slotController.listAvailableSlots);


router.post('/register-slot',middleware.authenticate, slotController.registerSlot);

module.exports = router;
