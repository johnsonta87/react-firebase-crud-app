import { useState } from 'react';
import Link from 'next/link'
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
const Register = () => {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification(
        'Password and password confirmation does not match'
      )
      setTimeout(() => {
        setNotification('')
      }, 2000)
      setPassword('');
      setPassConf('');
      return null;
    }
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });
    router.push("/") // redirect to frontpage upon registered
  }

  const handleGoogleSignin = (event) => {
    event.preventDefault();
    fire.auth()
      .signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
      })
      .catch((err) => {
        console.log(err.code, err.message)
      });
  }
  return (
    <div>
      <h1>Create new user</h1>
      {notification}
      <form onSubmit={handleLogin}>
        Email: <input type="text" value={userName}
          onChange={({ target }) => setUsername(target.value)} />
        <br />
        Password: <input type="password" value={password}
          onChange={({ target }) => setPassword(target.value)} />
        <br />
        Password conf: <input type="password" value={passConf}
          onChange={({ target }) => setPassConf(target.value)} />
        <br />
        <button type="submit">Login</button>

        <button type="submit" onClick={handleGoogleSignin}>Login with Google</button>
      </form>

      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}
export default Register
