const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => {
    const id = Number(contact.id);
    return id === contactId;
  });
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updateContacts = contacts.filter((contact) => {
    const id = Number(contact.id);
    return id !== contactId;
  });
  console.log(updateContacts);
  return updateContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
