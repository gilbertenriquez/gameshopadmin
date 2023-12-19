  import React, { useState, useEffect } from "react";
  import { ref, onValue, push, update } from "firebase/database";
  import { db } from "../dbcreds/firebaseConfig";
  import { Modal } from "bootstrap";

  export default function UserAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [usersData, setUsersData] = useState({});
    const [userkey, setUserKey] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modal, setModal] = useState(false);
    const RequestNode = ref(db, 'Users/Request');
    const verifyNode = ref(db, 'Users/Verified');

    useEffect(() => {
      const fetchData = () => {
        onValue(RequestNode, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const Accounts = Object.entries(data).map(([key, value]) => ({
              key,
              ...value,
            }));
            setAccounts(Accounts);
          } else {
            setAccounts([]);
          }
        });
      };

      fetchData();

      return () => {
        onValue(RequestNode, () => {});
      };
    }, []);
    useEffect(()=>{
      onValue(RequestNode, () => {});
      console.log('User Key =', userkey);
    }, [userkey]);
  const getUserKey = (user) => {
    setSelectedUser(user);
    const verifyUser = new Modal(document.getElementById('updateUser'));
    verifyUser.show();
    setModal(verifyUser);
  }
  const verifyUser = async () =>{
    console.log({...selectedUser});
    const userRef = ref(db, `Users/Request/${selectedUser.key}`);
    try {
      update(userRef, {isVerified: 'True'});
      await push(verifyNode, {
        MAIL: selectedUser.MAIL,
        image1: selectedUser.image1,
        image2: selectedUser.image2,
        image3: selectedUser.image3,
        image4: selectedUser.image4,
        isVerified: "True"
      })
    } catch (error) {
      console.log(error);
    }
  }
    return (
      <div className="container-fluid p-5" id="verify">
        <div className="container p-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">ID Front</th>
                <th scope="col">ID Back</th>
                <th scope="col">ID & User Picture Front</th>
                <th scope="col">ID & User Picture Back</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
            {accounts.map((user) => (
              
              <tr key={user.key}>
                <td>{user.MAIL}</td>
                <td><a href={user.image1} target="_blank" rel="noopener noreferrer" className="text-dark">View</a></td>
                <td><a href={user.image2} target="_blank" rel="noopener noreferrer" className="text-dark">View</a></td>
                <td><a href={user.image3} target="_blank" rel="noopener noreferrer" className="text-dark">View</a></td>
                <td><a href={user.image4} target="_blank" rel="noopener noreferrer" className="text-dark">View</a></td>
                <td>{user.isVerified === 'True' ? 'Verified' : <button className="btn btn-primary" onClick={() => getUserKey(user)}>Update</button>}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div id="updateUser" data-bs-backdrop="static" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <span className="lead">Verify User: <span className="h4">{selectedUser ? selectedUser.MAIL : 'something went wrong retrieving data'}</span></span>
              </div>
              <div className="modal-body text-dark">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img style={{width: '60%'}} src={selectedUser ? selectedUser.image1 : 'something went wrong retrieving data'} alt="" />

                    </div>
                    <div className="col-6" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img style={{width: '60%'}} src={selectedUser ? selectedUser.image2 : 'something went wrong retrieving data'} alt="" />

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img style={{width: '60%'}} src={selectedUser ? selectedUser.image3 : 'something went wrong retrieving data'} alt="" />
                    </div>
                    <div className="col-6" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img style={{width: '60%'}} src={selectedUser ? selectedUser.image4 : 'something went wrong retrieving data'} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button onClick={verifyUser} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
