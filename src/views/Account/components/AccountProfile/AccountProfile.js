import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`http://localhost:8081/employes/1`);
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  const handleChange = event => {
    const fileList  = event.target.files;
    
    var fileReader = new FileReader();
    if (fileReader && fileList && fileList.length) {
       fileReader.readAsDataURL(fileList[0]);
       console.log("URL : ", fileList);
       fileReader.onload = function () {
          var imageData = fileReader.result;
          setUser({
            ...user,
            photoProfil: imageData
          });
          localStorage.setItem('image', imageData.split(',')[1]);
       };
    }
  };


    const handleClick = () => {
      document.getElementById('hiddenFileInput').click();
    };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user ? user.prenom : ""} {user ? user.nom :""}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user ? user.mail : ''}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user ? user.role.label : ''}
            </Typography>
          
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} {/*({user.timezone})*/}
            </Typography>

          </div>
          <Avatar
            className={classes.avatar}
            src = {user && user.photoProfil  ? user.photoProfil.indexOf("data:image") == -1 ?
              `data:image/jpeg;base64,${user.photoProfil}` : `${user.photoProfil}` : ""}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
      <input
        type="file"
        id="hiddenFileInput"
        onChange={handleChange}
        style={{display: 'none'}}
      />
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick = {handleClick}
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
