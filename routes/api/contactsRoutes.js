const express = require('express');
const contactController = require('../../controllers/contactsContollers');
const isValidId = require('../../middleware/isValidId');

const router = express.Router();

router.get('/', contactController.getContacts);

router.get('/:id', isValidId, contactController.getContact);

router.post('/', contactController.addNewContact);
router.delete('/:id', isValidId, contactController.deleteContact);

router.put('/:id', isValidId, contactController.addChangeContact);

router.patch('/:id/favorite', isValidId, contactController.addChangeFavorite);

module.exports = router;
