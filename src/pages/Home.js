import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import { Grid, Paper } from '@mui/material';

const API_URL = 'https://contact-manager-gamma-ten.vercel.app/api/contacts'; 

function Home() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const addContact = async (contact) => {
    try {
      const response = await axios.post(`${API_URL}/`, contact, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const updateContact = async (contact) => {
    try {
      const response = await axios.put(`${API_URL}/${contact._id}`, contact, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === response.data._id ? response.data : c))
      );
      setEditingContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
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
