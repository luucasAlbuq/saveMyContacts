const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController.js');
module.exports = router;

router.get('/', contactController.findAllContact);

router.get('/:contact_id', contactController.findOneContact);

router.post('/create', contactController.createContact);

router.put('/update/:contact_id', contactController.updateContact);

router.delete('/delete/:contact_id', contactController.deleteContact);
