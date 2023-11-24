import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../dbcreds/firebaseConfig";

export default function UserAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [usersData, setUsersData] = useState({});


  useEffect(() => {
    const fetchData = () => {
      const usersRef = ref(db, "Users");
  
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Users Data:", data);
  
        if (data) {
          setUsersData(data);
  
          const accountsArray = Object.keys(data).map((userId) => ({
            userId,
            account: data[userId]?.Account || null,
          }));
  
          console.log("Accounts Array:", accountsArray);
  
          setAccounts(accountsArray);
        } else {
          setUsersData({});
          setAccounts([]);
        }
      });
    };
  
    fetchData();
  
    return () => {
    };
  }, []);

  console.log("Rendered Accounts:", accounts);

  return (
    <div className="container-fluid">
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
  {accounts.map(({ userId, account }) => (
    <tr key={userId}>
      <td>{account?.UserName}</td>
      <td>{account?.Password}</td>
      <td>Actions Placeholder</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}
