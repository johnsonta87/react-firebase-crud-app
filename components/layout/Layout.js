import React from 'react'
import Container from '@material-ui/core/Container';
import Footer from './Footer'
import Nav from './Nav'

export default function Layout(props) {
  const { children } = props;

  return (
    <div>
      <Nav />
      <Container maxWidth="md">
        {children}
      </Container>

      <Footer />
    </div>
  )
}
