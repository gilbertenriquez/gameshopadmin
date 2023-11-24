import React, { useState, useEffect } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../dbcreds/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import {v4 as uuidv4} from "uuid";
export default function Dashboard() {
  const dbref = ref(db, 'Users');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reportFlag, setReportFlag] = useState(0);
  const [selectedUserAccount, setSelectedUserAccount] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      onValue(dbref, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const usersArray = Object.entries(data).map(([key, value]) => ({
            key,
            ...value,
          }));
          setUsers(usersArray);
        } else {
          setUsers([]);
        }
      });
    };

    fetchData();

    return () => {
      onValue(dbref, () => {});
    };
  }, []);

  const handleViewClick = (user) => {
    setSelectedUser(user);
  
    const accountRef = ref(db, `Users/${user.key}/Account`);
    onValue(accountRef, (snapshot) => {
      const accountData = snapshot.val();
      console.log("Account Data:", accountData);
  
      setSelectedUserAccount(accountData);
    });
  
    const viewInfoModal = new Modal(document.getElementById('viewInfo'));
    viewInfoModal.show();
  };


  const createAccount = (e) => {
    e.preventDefault();
    try {
      if (username.trim() === '' || password.trim() === '' || reportFlag.trim() === '') {
        const missingFields = new Modal(document.getElementById('missingFields'));
        missingFields.show();
        setTimeout(() => {
          missingFields.hide();
        }, 1500);
        return;
      }

      if (!selectedUser) {
        return;
      }
      const newUserId = selectedUser.key;
      push(ref(db, `Users/${newUserId}/Account`), {
        UserName: username,
        Password: password,
        ReportFlag: reportFlag,
      })
        .then(() => {
          setPassword('');
          setReportFlag(null);
          setUsername('');
          const viewInfo = new Modal(document.getElementById('viewInfo'));
          const success = new Modal(document.getElementById('success'));
          success.show();
          setTimeout(() => {
            success.hide();
            viewInfo.hide();
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      const errror = new Modal(document.getElementById('error'));
      errror.show();
    }
  };
const account = () =>{
    nav('/accounts')
}
  return (
    <div className="container-fluid" id="dashboard">
      <div className="row">
        <div className="col-2 bg-dark text-light">
          <ul>
            <li>pages</li>
            <li><button onClick={account} className="btn btn-transparent text-light">Accounts</button></li>
            <li>pages</li>
            <li>pages</li>
            <li>pages</li>
          </ul>
        </div>
        <div className="col-10 p-5 bg-success text-light">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Birthday</th>
                <th scope="col">First Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Web API Key</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.key}>
                  <td>{user.key.replace(/-/g, '')}</td>
                  <td>{user.BIRTHDAY}</td>
                  <td>{user.FNAME}</td>
                  <td>{user.GENDER}</td>
                  <td>{user.Haddress}</td>
                  <td>{user.LNAME}</td>
                  <td>{user.MAIL}</td>
                  <td>{user.PASSWORD}</td>
                  <td><a href={user.webAPIKey}>{user.webAPIKey}</a></td>
                  <td><button className="btn btn-primary" onClick={() => handleViewClick(user)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="viewInfo" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-dark">
              {selectedUser && (
                <>
                  <p>ID: {selectedUser.key.replace(/-/g, '')}</p>
                  <p>Birthday: {selectedUser.BIRTHDAY}</p>
                  <p>First Name: {selectedUser.FNAME}</p>
                  <p>Gender: {selectedUser.GENDER}</p>
                  <p>Address: {selectedUser.Haddress}</p>
                  <p>Last Name: {selectedUser.LNAME}</p>
                  <p>Email: {selectedUser.MAIL}</p>
                  <p>Password: {selectedUser.PASSWORD}</p>
                  <p>Web API Key: <a href={selectedUser.webAPIKey}>{selectedUser.webAPIKey}</a></p>
                </>
              )}
            </div>
            <div className="modal-footer">
            {/**selectedUserAccount && (
                <>
                  <p>Account ID: {selectedUserAccount.key}</p>
                  <p>UserName: {selectedUserAccount.UserName}</p>
                  <p>Password: {selectedUserAccount.Password}</p>
                  <p>ReportFlag: {selectedUserAccount.ReportFlag}</p>
                </>
            )**/}
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="missingFields" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-dark">
                            Missing Fields
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="error" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-dark">
                            Something is wrong. Check your inputs
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="success" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-dark">
                            Account Created
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}
