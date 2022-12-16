const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return console.table(JSON.parse(data));
  } catch (err) {
    return console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data);
    return parseData.map((data) => {
      if (Number(data.id) === Number(contactId)) {
        return console.table(data);
      }
    });
  } catch (err) {
    return console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const filterContacts = JSON.parse(data).filter(
      (data) => Number(data.id) !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts), "utf8");
    return listContacts();
  } catch (err) {
    return console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    const addData = [
      ...dataParse,
      {
        id: (data.length + 1).toString(),
        name,
        email,
        phone,
      },
    ];
    await fs.writeFile(contactsPath, JSON.stringify(addData), "utf8");
    console.table(addData);
  } catch (err) {
    return console.log(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };