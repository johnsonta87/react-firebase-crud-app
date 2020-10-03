import fire from '../../config/fire-config';
import Link from 'next/link'

const Entry = (props) => {
  return (
    <div>
      <h2>{props.firstName} {props.lastName}</h2>
      <p>
        {props.waitTime}
        {props.note}
      </p>

      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('entry')
    .doc(query.id)
    .get()
    .then(result => {
      content['firstName'] = result.data().firstName;
      content['lastName'] = result.data().lastName;
      content['waitTime'] = result.data().waitTime;
      content['note'] = result.data().note;
    });
  return {
    props: {
      firstName: content.firstName,
      lastName: content.lastName,
      waitTime: content.waitTime,
      note: content.note,
    }
  }
}

export default Entry;
