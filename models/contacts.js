const { v4: uuidv4 } = require('uuid');

const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'models', 'contacts.json');

const listContacts = async () => {
  const data = fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const dataList = await listContacts();

  const contactById = dataList.find(item => item.id === contactId);
  return contactById || null;
};

const removeContact = async contactId => {
  const dataList = await listContacts();

  const indexById = dataList.findIndex(item => item.id === contactId);
  if (indexById === -1) {
    return null;
  }

  const [result] = dataList.splice(indexById, 1);

  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  return result;
};

const addContact = async body => {
  const dataList = await listContacts();

  const newContact = {
    id: uuidv4(),
    ...body,
  };

  dataList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(dataList, null, 2));

  return newContact;

};

const updateContact = async (contactId, body) => {
  const dataList = await listContacts();

  const indexById = dataList.findIndex(item => item.id === contactId);
  if (indexById === -1) {
    return null;
  }

  dataList[indexById] = { id, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(dataList, null, 2));

  return dataList[indexById];

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
