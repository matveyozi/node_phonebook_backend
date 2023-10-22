const { model, Schema } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name fo contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleMongooseError);

const Contact = model('Contact', contactSchema);

module.exports = { Contact };
