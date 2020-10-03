import React, { useState } from 'react'
import Link from 'next/link'
import fire from '../config/fire-config';
import EditEntry from './EditEntry'
import Button from '@material-ui/core/Button';

export default function EntriesList(props) {
  const [edit, setEdit] = useState('');

  const handleDelete = (id) => {
    id && fire.firestore()
      .collection("entry").doc(id).delete().then(function () {
        console.log("Entry successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing entry: ", error);
      });
  }

  const handleUpdate = id => {
    setEdit(prev => prev.edit !== id ? id : '');
  }

  return (
    <div>
      {props.entries.map((entry) =>
        <div key={entry.id}>
          <h2>{entry.firstName} {entry.lastName}</h2>
          <p>Wait time: {entry.waitTime}</p>
          <p>Notes: {entry.note}</p>
          <Link href="/entry/[id]" as={'/entry/' + entry.id}>
            <a>View details</a>
          </Link>

          {props.loggedIn ? (
            edit === entry.id
              ? <EditEntry entry={entry} />
              : <Button
                variant="contained"
                type="button"
                onClick={() => handleUpdate(entry.id)}>
                Update
              </Button>
          ) : null}
          {props.loggedIn &&
            <Button
              variant="contained"
              type="button"
              onClick={() => handleDelete(entry.id)}>
              Delete
            </Button>}
        </div>
      )}
    </div>
  )
}
