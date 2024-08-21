import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function ContactForm({ addContact, updateContact, editingContact }) {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (editingContact) {
      setContact(editingContact);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContact) {
      updateContact(contact);
    } else {
      addContact(contact);
      setContact({ name: '', email: '', phone: '' }); 
    }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: '600', color: '#6B8E23', fontFamily: 'Trebuchet MS' }}>
        {editingContact ? 'Edit Contact' : 'Add New Contact'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={contact.name}
          onChange={handleChange}
          sx={{ marginBottom: 2, fontFamily: 'Trebuchet MS' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={contact.email}
          onChange={handleChange}
          sx={{ marginBottom: 2, fontFamily: 'Trebuchet MS' }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          sx={{ marginBottom: 2, fontFamily: 'Trebuchet MS' }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#6B8E23',
            color: '#ffffff',
            fontWeight: '600',
            width: '100%',
            fontFamily: 'Trebuchet MS',
            '&:hover': {
              backgroundColor: '#4a6a29', 
            },
          }}
        >
          {editingContact ? 'Update Contact' : 'Add Contact'}
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
