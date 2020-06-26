import React, { useContext} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import countryList from 'react-select-country-list';
import {AppContext} from '../../../../AppContext';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {

  const { className, ...rest } = props;
  const classes = useStyles();
  const { user,setUser } = useContext(AppContext);
  console.log("USER LOADED ACCOUNT DETAILS: ", user);

  const handleSubmit = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' , 'Accept': 'application/json' },
      body: JSON.stringify(user)
  };

  let idToUpdate = JSON.parse(requestOptions.body).id;
  
  fetch(`http://localhost:8081/employes/employe/${idToUpdate}`, requestOptions)
      .then(response => response.json())
  };

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
   
  const nationalities = require('npm-nationality-list');
  
  return (
    
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Last name"
                margin="dense"
                name="nom"
                onChange={handleChange}
                required
                value={user ? user.nom : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                margin="dense"
                name="prenom"
                onChange={handleChange}
                required
                value={user ? user.prenom : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="mail"
                onChange={handleChange}
                required
                value={user ? user.mail : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="tel"
                onChange={handleChange}
                type="number"
                value={user ? user.tel : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Street Number"
                margin="dense"
                name="numRue"
                onChange={handleChange}
                type="number"
                value={user ? user.numRue : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Street Name"
                margin="dense"
                name="rue"
                onChange={handleChange}
                value={user ? user.rue : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Postal Code"
                margin="dense"
                name="codePostal"
                onChange={handleChange}
                value={user ? user.codePostal : ''}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Additional Address"
                margin="dense"
                name="complementAdresse"
                onChange={handleChange}
                value={user ? user.complementAdresse : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="State"
                margin="dense"
                name="ville"
                onChange={handleChange}
                value={user ? user.ville : ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                margin="dense"
                name="pays"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={user ? user.pays : ''}
                variant="outlined"
              >
                {countryList().getData().map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nationality"
                margin="dense"
                name="nationalite"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={user ? user.nationalite : ''}
                variant="outlined"
              >
                {nationalities.getList().map(option => (
                  <option
                    key={option.num_code}
                    value={option.num_code}
                  >
                    {option.nationality}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick = {handleSubmit}
          >
            Save details
            
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
