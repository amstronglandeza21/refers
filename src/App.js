import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css'; 

const App = () => {
  const [referrerID, setReferrerID] = useState('');
  const [referredFirstName, setReferredFirstName] = useState('');
  const [referredLastName, setReferredLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [relationship, setRelationship] = useState('');
  const [course, setCourse] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycby-wPsbelJ6wjm6mJwsjL7hltt6C_pCOPW5yobt02tEIE3ZdFPxNQcPsJKNrMZICeOF/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'addReferredPersonInfo',
          referrerID,
          referredFirstName,
          referredLastName,
          email,
          contact,
          relationship,
          course,
        }),
      });
      const data = await response.json();
      if (data.message.includes('successfully')) {
        setModalMessage('Referred person info added successfully.');
        setReferrerID('');
        setReferredFirstName('');
        setReferredLastName('');
        setEmail('');
        setContact('');
        setRelationship('');
        setCourse('');
      } else {
        setModalMessage(data.message);
      }
      setModalShow(true);
    } catch (error) {
      console.error('Error adding referred person info:', error);
      setModalMessage('Error adding referred person info. Please check the console for details.');
      setModalShow(true);
    }
  };
  

  return (
    <div className="refer-page-container">
      <div className="row justify-content-center">
        <div className="col-md-6 refer-form">
          <h1 className="text-center mb-4">Refer Now</h1>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group controlId="referrerID">
                  <Form.Label>Referreral Code:</Form.Label>
                  <Form.Control type="text" value={referrerID} onChange={(e) => setReferrerID(e.target.value)} />
                </Form.Group>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="referredFirstName">
                      <Form.Label>First Name:</Form.Label>
                      <Form.Control type="text" value={referredFirstName} onChange={(e) => setReferredFirstName(e.target.value)} />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="referredLastName">
                      <Form.Label>Last Name:</Form.Label>
                      <Form.Control type="text" value={referredLastName} onChange={(e) => setReferredLastName(e.target.value)} />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="relationship">
                  <Form.Label>Relationship:</Form.Label>
                  <Form.Control type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="contact">
                  <Form.Label>Contact:</Form.Label>
                  <Form.Control type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="course">
                  <Form.Label>Course:</Form.Label>
                  <Form.Control type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
                </Form.Group>
              </div>
            </div>
            <Button variant="danger" onClick={handleSubmit} className="mt-3">Submit</Button>
          </Form>
        </div>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
