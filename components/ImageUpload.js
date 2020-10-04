import React, { useState } from 'react'
import fire from '../config/fire-config';

export default function imageUpload() {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const handleUpload = () => {
    const storage = fire.storage();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case fire.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case fire.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          setUrl(url)

          fire.firestore()
            .collection('entry')
            .add({
              imgUrl: url
            })
            .then(() => {
              setImage('')
            })
        });

      });
  }

  return (
    <div>
      <input
        type="file"
        onChange={({ target }) => target.files[0] && setImage(target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
    </div>
  )
}
