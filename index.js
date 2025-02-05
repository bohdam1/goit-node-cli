const { program } = require("commander");
const contact = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contact.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contactById = await contact.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contact.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contact.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
