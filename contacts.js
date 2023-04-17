import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

export const listContacts = () => {
  return fs.readFile(contactsPath, { encoding: "utf-8" });
};

export const getContactById = (contactId) => {
  return listContacts().then((contacts) =>
    JSON.parse(contacts).find((contact) => contact.id === contactId)
  );
};

export const removeContact = (contactId) => {
  return listContacts().then((contacts) =>
    fs.writeFile(
      contactsPath,
      JSON.stringify(
        JSON.parse(contacts).filter((contact) => contact.id !== contactId)
      ),
      null,
      2
    )
  );
};

export const addContact = (name, email, phone) => {
  return listContacts().then((constacs) =>
    fs.writeFile(
      contactsPath,
      JSON.stringify(
        [...JSON.parse(constacs), { id: nanoid(), name, email, phone }],
        null,
        2
      )
    )
  );
};
