import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function queryUserEvents(eventArray) {
  const eventResults = [];
  for (let i = 0; i < eventArray.length; i++) {
    const newEvent = [];
    const docRef = doc(db, 'events', eventArray[i]);
    const docSnap = await getDoc(docRef);
    newEvent.push(eventArray[i]);
    newEvent.push(docSnap.data());
    // newEvent[eventArray[i]] = docSnap.data();
    eventResults.push(newEvent);
  }
  console.log(eventResults);
  return eventResults;
}
