import React , {useContext} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import {AppContext} from './../../../../../../AppContext';

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

  const { user } = useContext(AppContext);


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src = {user.photoProfil  ? user.photoProfil.indexOf("data:image") === -1 ?
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
