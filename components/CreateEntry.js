import React, { useState } from 'react';
import fire from '../config/fire-config';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router'
import ImageUpload from './ImageUpload'


const CreateEntry = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [note, setNote] = useState('');
  const [notification, setNotification] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('entry')
      .add({
        firstName: firstName,
        lastName: lastName,
        waitTime: waitTime,
        note: note,
      });
    setFirstName('');
    setLastName('');
    setWaitTime('');
    setNote('');
    setNotification('Entry created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
    router.push("/")
  }


  return (
    <div>
      <h2>Add Entry</h2>
      {notification}

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="standard-basic"
            label="First Name"
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
            required />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Last Name"
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
            required />
        </div>
        <div>
          <TextField
            id="time"
            label="Wait time"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            value={waitTime}
            onChange={({ target }) => setWaitTime(target.value)}
            required />
        </div>
        <ImageUpload />
        <div>
          <TextField
            id="standard-multiline-static"
            label="Note"
            multiline
            rows={4}
            value={note}
            onChange={({ target }) => setNote(target.value)} />
        </div>
        <Button type="submit" variant="contained" color="primary">Save</Button>
      </form>
    </div>
  )
}
export default CreateEntry;
