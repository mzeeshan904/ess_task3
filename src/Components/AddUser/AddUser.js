import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const AddUser = ({ onUserAdded, initialUser }) => {
  const [user, setUser] = useState({
    id: initialUser ? initialUser.id : '',
    name: initialUser ? initialUser.name : '',
    email: initialUser ? initialUser.email : '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const userData = {
      ...user,
    };

    if (initialUser) {
     
      fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUser({ id: '', name: '', email: '' });
          onUserAdded();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
    

      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUser({ id: '', name: '', email: '' });
          onUserAdded();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  useEffect(() => {
    if (initialUser) {
      setUser({
        id: initialUser.id,
        name: initialUser.name,
        email: initialUser.email,
      });
    } else {
      setUser({
        id: '',
        name: '',
        email: '',
      });
    }
  }, [initialUser]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: 'auto' }}
    >
      <TextField
        label="Name"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        sx={{ width: '100%', borderRadius: '25px', margin: '2rem 0px' }}
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        sx={{ width: '100%', borderRadius: '25px', margin: '1rem 0px' }}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: '25%', margin: '2rem auto' }}
      >
        {initialUser ? 'Update User' : 'Add User'}
      </Button>
    </form>
  );
};

export default AddUser;
