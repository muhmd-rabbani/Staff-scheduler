import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function Viewcomplaint() {
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = () => {
    console.log("Reply Sent:", replyText);
    setReplyText("");
    handleClose();
  };

  return (
    <div className="mainmanager pt-4">
      <div className="container pt-4 managerpage pb-5">

        {/* HEADER */}
        <h1 className="hd1">Complaints</h1>

        {/* TABLE */}
        <table className="table my-table mt-4">
          <thead>
            <tr>
              <th scope="col">Against ID</th>
              <th scope="col">Subject</th>
              <th scope="col">Description</th>
              <th scope="col">Reply</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>reply</td>
              <td>
                <Button variant="primary" onClick={handleOpen}>
                  Reply
                </Button>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>reply</td>
              <td>
                <Button variant="primary" onClick={handleOpen}>
                  Reply
                </Button>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>John</td>
              <td>Doe</td>
              <td>reply</td>
              <td>
                <Button variant="primary" onClick={handleOpen}>
                  Reply
                </Button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* MODAL */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Reply to Complaint</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter your reply..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSubmit}>
              Send Reply
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}

export default Viewcomplaint;
