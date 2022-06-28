import { useState, useEffect } from 'react';

export default function FriendRequest({ request }) {
  const [user, setUser] = useState(null);

  console.log(request);

  const initializeRequest = async () => {
    const response = await fetch(`/api/users/${request.stringValue}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    setUser(result[0]._delegate._document.data.value.mapValue.fields);
  };

  useEffect(() => {
    initializeRequest();
  }, []);

  return (
    <div>
      {user && `This is a friend request from ${user.name.stringValue}`}
    </div>
  );
}
