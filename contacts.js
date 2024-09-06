const fs = require('fs/promises');
const path = require('path');


const contactsPath = path.join("db","contacts.json");

async function listContacts()  {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
  }
  
  async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result||null;
  }
  async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1) return null;
    const removedContact = contacts.splice(index, 1)[0];
    fs.writeFile(contactsPath, JSON.stringify(contacts, null,2))
    return removedContact;
  }
  
  async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    const contacts = await listContacts();
    
    const newContact = {
      id: Date.now().toString(),
      name: name,
      email: email,
      phone : phone,
    }
    contacts.push(newContact);
    fs.writeFile(contactsPath,JSON.stringify(contacts, null,2))
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };


