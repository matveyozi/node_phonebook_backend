const HttpError = require('../helpers/HttpError');
const { Contact } = require('../models/Contact');
const contactSchema = require('../schemas/contactSchema');
const updateFavoriteSchema = require('../schemas/updateFavoriteSchema');

const getContacts = async (req, res, next) => {
  try {
    const result = Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = Contact.findById(id);
    if (!result) {
      throw new HttpError(404, 'Contact not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message / replace(/[' "]/g, '');
      let missingField = '';
      if (errorMessage.includes('name')) {
        missingField = 'name';
      } else if (errorMessage.includes('email')) {
        missingField = 'email';
      } else if (errorMessage.includes('phone')) {
        missingField = 'phone';
      }

      return res
        .status(400)
        .json({ message: `missing required ${missingField} field` });
    }

    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ messaage: 'server error' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Server error' });
  }
};

const addChangeContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const { error } = contactSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message.replace(/['"]/g, '');
      let missingField = '';

      if (errorMessage.includes('name')) {
        missingField = 'name';
      } else if (errorMessage.includes('email')) {
        missingField = 'email';
      } else if (errorMessage.includes('phone')) {
        missingField = 'phone';
      }

      return res
        .status(400)
        .json({ message: `missing required ${missingField} field` });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
      throw HttpError(404, 'Not found');
    }

    res.json(updatedContact);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || 'Server error' });
  }
};

const updateStatusContact = async (contactId, body) => {
  if (!body || !Object.prototype.hasOwnProperty.call(body, 'favorite')) {
    return { status: 400, message: 'missing field favorite' };
  }

  const updateContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true },
  );

  if (!updatedContact) {
      return {status: 404, message: 'Not found'}
    }

    return {status: 200, updatedContact}
  
};

const addChangeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (
      !req.body ||
      !Object.prototype.hasOwnProperty.call(req.body, 'favorite')
    ) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const { error } = updateFavoriteSchema.validate(req.body)
    
    if (error) {
      const errorMessage = error.details[0].message.replace(/['"]/g, '')

      if (errorMessage.includes('favorite')) {
        missingField = 'favorite';
      }

      return res.status(400).json({message: `missing field ${missingField}`})

    }

    const result = await updateStatusContact(id, req.body);

    res.status(result.status).json(result.updatedContact || result.message)

  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  addChangeContact,
  addChangeFavorite
}