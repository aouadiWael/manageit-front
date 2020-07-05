import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const UserList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  const [filtredUsers, setFiltredUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8081/employes/`, {});
      const data = await res.json();
      setUsers(data);
      setFiltredUsers(data);
    }
    fetchData();
  }, []);

  
  const changeFilterStr = (event) => {
    setFiltredUsers(users.filter(el => el.prenom.toLowerCase().includes(event.toLowerCase()) || 
    el.nom.toLowerCase().includes(event.toLowerCase())));
  };

  return (
    <div className={classes.root}>
      <UsersToolbar users={filtredUsers} changeFilterStr = {changeFilterStr}/>
      <div className={classes.content}>
        <UsersTable users={filtredUsers} />
      </div>
    </div>
  );
};

export default UserList;
