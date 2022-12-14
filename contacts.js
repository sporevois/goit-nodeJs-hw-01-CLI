const fs = require('fs').promises;
const {nanoid} = require('nanoid')
const path = require('path');

const contactsPath = path.resolve('./db', 'contacts.json');

const listContacts = async () => {
    try {
        const contactsString = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(contactsString);
        return contacts;
    }
    catch (err){
        console.error('Error:', err);
    }    
}

const getContactById = async (contactId) => {
    id = String(contactId);
    try {
        const allContacts = await listContacts();
        const contactById = allContacts.find(contact => contact.id === id);
        return contactById ? contactById : null; 
    }
    catch (err) {
        console.error('Error:', err);
    }    
}

const removeContact = async (contactId) => {
    id = String(contactId);
    try {
        const allContacts = await listContacts();
        const index = allContacts.findIndex(contact => contact.id === id);
        const deletedContact = allContacts[index];
        if (index !== -1) {
            allContacts.splice(index, 1);
            await fs.writeFile(contactsPath, JSON.stringify(allContacts));
        }
        return deletedContact ? deletedContact : null;
    }
    catch (err) {
        console.error('Error:', err);
    }    
}

const addContact = async (name, email, phone) => {
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    try {
        const allContacts = await listContacts();
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    catch (err) {
        console.error('Error:', err);
    }      
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}