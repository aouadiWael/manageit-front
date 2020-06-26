import React, {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`http://localhost:8081/employes/1`);
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src = {user.photoProfil  ? user.photoProfil.indexOf("data:image") == -1 ?
              `data:image/jpeg;base64,${user.photoProfil}` : `${user.photoProfil}` : ""}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.prenom} {user.nom}
      </Typography>
      <Typography variant="body2">{user.poste ? user.poste.label : ""}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
