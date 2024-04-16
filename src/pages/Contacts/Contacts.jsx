import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Container,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";
import { BACKEND } from "../../constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    margin: "auto",
    textAlign: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
}));

const Contacts = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    try {
      getContacts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getContacts = async () => {
    const { data } = await axios.get(`${BACKEND}/users/contacts/${uid}`);
    setContacts(data.contacts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND}/users/contacts/create-contact`,
        {
          userUid: uid,
          name: name,
          email: email,
          phone: phoneNumber,
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setName("");
    setPhoneNumber("");
    setEmail("");
  };

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Emergency Contacts</h1>
      <Container component="main" maxWidth="md" className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="123-456-7890"
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <TableContainer component={Paper} className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Contacts;
