import React from 'react';
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Typography, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ContactList({ contacts, deleteContact, editContact }) {
  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: '600', color: '#6B8E23', fontFamily: 'Trebuchet MS' }}>
        Contact List
      </Typography>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact._id} divider>
            <Avatar sx={{ marginRight: 2, backgroundColor: '#6B8E23', fontFamily: 'Trebuchet MS' }}>{contact.name.charAt(0)}</Avatar>
            <ListItemText
              primary={contact.name}
              secondary={`Email: ${contact.email} | Phone: ${contact.phone}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => editContact(contact)}>
                <EditIcon sx={{ color: '#6B8E23', fontFamily: 'Trebuchet MS' }} />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteContact(contact._id)}>
                <DeleteIcon sx={{ color: '#d32f2f', fontFamily: 'Trebuchet MS' }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ContactList;
