import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import CreateEntry from '../components/CreateEntry';
import EntriesList from '../components/EntriesList'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [entry, setEntry] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });

  useEffect(() => {
    fire.firestore()
      .collection('entry')
      .onSnapshot(snap => {
        const entry = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEntry(entry);
      });
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EntriesList entries={entry} loggedIn={loggedIn} />
        </Grid>
      </Grid>
    </div>
  )
}
export default Home;
