import { useEffect, useState } from "react";
import { getWrapper } from "./utils/fetch";

export const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    getWrapper("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  if (!users) {
    return null;
  }

  return (
    <article>
      <span>Users List</span>
      {users.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span>No users to display</span>
      )}
    </article>
  );
};
