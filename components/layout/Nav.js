import React, { useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import fire from '../../config/fire-config';

const useStyles = makeStyles({
  root: {
    background: '#66CDAA',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '30px 0',
    marginBottom: 50,
  },
});

export default function Nav() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState('');
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });

  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Link href="/"><a>Home</a></Link>
        {notification}
        {!loggedIn
          ? (
            <div>
              <Link href="/users/register">
                <a>Register</a>
              </Link> |
              <Link href="/users/login">
                <a> Login</a>
              </Link>
            </div>
          )
          : (
            <React.Fragment>
              <Link href="/entry"><a>Create Entry</a></Link>
              <Button onClick={handleLogout}>Logout</Button>
            </React.Fragment>
          )
        }
      </Container>
    </div>
  )
}
