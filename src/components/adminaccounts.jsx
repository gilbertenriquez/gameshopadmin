import React, { useState, useEffect } from "react";
import { db } from "../dbcreds/firebaseConfig";
import { ref, push, onValue } from "firebase/database";

export default function AdminAccounts() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    uname: "",
    password: "",
  });
  const [fetchedData, setFetchedData] = useState([]);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    push(ref(db, "Admins"), formData);
    setFormData({
      fname: "",
      lname: "",
      uname: "",
      password: "",
    });
    closeModal();
  };

  const dbref = ref(db, "Admins");

  useEffect(() => {
    onValue(dbref, (snapshot) => {
      const getData = snapshot.val();
      if (getData) {
        const fetchedData = Object.entries(getData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setFetchedData(fetchedData);
      } else {
        setFetchedData([]);
      }
    });
  }, []);

  return (
    <div className="jumbotron-fluid p-5" id="admin">
      <div className="container">
        <button className="btn btn-primary" onClick={openModal}>
          New+
        </button>
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">User Name</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.map((admin, index) => (
              <tr key={admin.id}>
                <th scope="row">{index + 1}</th>
                <td>{admin.fname}</td>
                <td>{admin.lname}</td>
                <td>{admin.uname}</td>
                <td>{admin.password}</td>
                <td><button className="btn btn-danger">Delete</button>
                <button className="btn btn-success">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div className={`modal ${showModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: showModal ? "block" : "none" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
            </div>
            <div className="modal-body">
              <form className="form-control">
                <div className="container" id="input">
                  <input className="form-control" type="text" placeholder="First Name" name="fname" value={formData.fname} onChange={handleChange} />
                  <input className="form-control" type="text" placeholder="Last Name" name="lname" value={formData.lname} onChange={handleChange} />
                  <input className="form-control" type="text" placeholder="User Name" name="uname" value={formData.uname} onChange={handleChange} />
                  <input className="form-control" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button type="button" onClick={handleSubmit} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
