

const Slot = require('../models/slotModel');

const listAvailableSlots = async (req, res) => {
    try {
      
        const slots = await Slot.find({ availableDoses: { $gt: 0 } });

        res.status(200).json({ success: true, data: slots });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


const registerSlot = async (req, res) => {
    try {
        const { slotId, doseType } = req.body;
        const userId = req.user._id; 

        const slot = await Slot.findById(slotId);

        if (!slot) {
            return res.status(404).json({ success: false, message: 'Slot not found' });
        }

        if (doseType === 'firstDose') {
            slot.firstDoseRegisteredUsers.push(userId);
        } else if (doseType === 'secondDose') {
            slot.secondDoseRegisteredUsers.push(userId);
        }

        slot.availableDoses--;

        await slot.save();

        res.status(200).json({ success: true, message: 'Slot registration successful' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports = {
    listAvailableSlots,
    registerSlot,
};
