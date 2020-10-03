import React from 'react'
import Link from 'next/link'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#66CDAA',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    marginTop: 50,
    padding: '30px',
  },
});

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth="md">
        <section className="footer">
          {new Date().getFullYear()} - Built by <Link href="https://github.com/johnsonta87"><a target="_blank" rel="noreferrer">@johnsonta87</a></Link>.
        </section>
      </Container>
    </footer>
  )
}
