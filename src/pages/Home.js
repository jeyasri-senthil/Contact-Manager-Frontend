import React, { useState, useEffect } from 'react';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import { Grid, Paper } from '@mui/material';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch('/api/contacts/getall');
    const data = await response.json();
    setContacts(data.data);
  };

  const addContact = async (contact) => {
    const response = await fetch('/api/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (response.ok) {
      const newContact = await response.json();
      setContacts((prevContacts) => [...prevContacts, newContact]); 
    }
  };

  const updateContact = async (contact) => {
    const response = await fetch(`/api/contacts/${contact._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (response.ok) {
      const updatedContact = await response.json();
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === updatedContact._id ? updatedContact : c))
      );
      setEditingContact(null);
    }
  };

  const deleteContact = async (id) => {
    const response = await fetch(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    }
  };

  const editContact = (contact) => {
    setEditingContact(contact);
  };

  return (
    <Grid container spacing={3} sx={{ marginTop: 2, fontFamily: 'Trebuchet MS' }}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#ffffff', fontFamily: 'Trebuchet MS' }}>
          <ContactForm
            addContact={addContact}
            updateContact={updateContact}
            editingContact={editingContact}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#ffffff', fontFamily: 'Trebuchet MS' }}>
          <ContactList contacts={contacts} deleteContact={deleteContact} editContact={editContact} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;
