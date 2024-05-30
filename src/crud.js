import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './crud.css';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const Crud = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fetchData, setFetchData] = useState([]);
  const [id, setId] = useState('');
  
  const dbRef = collection(db, 'CRUD');

  const add = async (e) => {
    e.preventDefault();
    try {
      await addDoc(dbRef, { Name: name, Email: email, Phone: phone });
      alert('Data Added Successfully');
      
      setName('');
      setEmail('');
      setPhone('');
      fetch(); 
    } catch (error) {
      alert('Error Occurred: ' + error.message);
    }
  };

  const fetch = async () => {
    const snapshot = await getDocs(dbRef);
    const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFetchData(fetchedData);
  };

  useEffect(() => {
    fetch();
  }, []);

  const passData = (id) => {
    const matchId = fetchData.find((data) => data.id === id);
    if (matchId) {
      setName(matchId.Name);
      setEmail(matchId.Email);
      setPhone(matchId.Phone);
      setId(matchId.id);
    }
  };

  const update = async (e) => {
    e.preventDefault(); 
    const updateref = doc(db, 'CRUD', id);
    try {
      await updateDoc(updateref, { Name: name, Email: email, Phone: phone });
      alert('Update successfully');
      
      setName('');
      setEmail('');
      setPhone('');
      fetch(); 
    } catch (error) {
      alert('Update Error Occurred: ' + error.message);
    }
  };

  const del = async (id) => {
    const delref = doc(db, 'CRUD', id);
    try {
      await deleteDoc(delref);
      alert('Deleted successfully');
      fetch(); 
    } catch (error) {
      alert('Error Occurred: ' + error.message);
    }
  };

  return (
    <>
      <div className="login-form-container">
        <form className="login-form" onSubmit={add}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add</button>
          <button type="submit"  onSubmit={update} onClick={update}>Update</button>
        </form>
      </div>
      <div className="database">
        <h2>CRUD Database</h2>
        <div className="container">
          {fetchData.length > 0 ? (
            fetchData.map((data) => (
              <div className="box" key={data.id}>
                <h3>Name: {data.Name}</h3>
                <h3>Email: {data.Email}</h3>
                <h3>Phone: {data.Phone}</h3>
                <button onClick={() => passData(data.id)}>Update</button>
                <button onClick={() => del(data.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Crud;
