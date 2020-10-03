import React, { useState } from 'react'
import fire from '../config/fire-config'
import { useRouter } from 'next/router'

export default function EditEntry(props) {
  const { id, firstName, lastName, waitTime, note } = props.entry;
  const [editFirstName, setFirstName] = useState(firstName);
  const [editLastName, setLastName] = useState(lastName);
  const [editWaitTime, setWaitTime] = useState(waitTime);
  const [editNote, setNote] = useState(note);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('entry')
      .doc(id)
      .update({
        firstName: editFirstName,
        lastName: editLastName,
        waitTime: editWaitTime,
        note: editNote,
      })
      .then(function () {
        console.log("Entry successfully updated!");
        router.push("/")
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input
            type="text"
            value={editFirstName}
            onChange={({ target }) => setFirstName(target.value)}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            value={editLastName}
            onChange={({ target }) => setLastName(target.value)}
          />
        </label>
        <label>
          Wait time:
          <input
            type="text"
            value={editWaitTime}
            onChange={({ target }) => setWaitTime(target.value)}
          />
        </label>
        <label>
          Note:
          <input
            type="text"
            value={editNote}
            onChange={({ target }) => setNote(target.value)}
          />
        </label>

        <input type="submit" value="Save" />
      </form>
    </div>
  )
}
