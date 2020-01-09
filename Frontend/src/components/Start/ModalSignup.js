import React, { useState } from '../../../node_modules/react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from '../../../node_modules/reactstrap';
// import { Row, Col, Label, Input, FormText, Badge } from 'reactstrap';
import Signup from './Signup.js';
import "../Start/Signup.css"
const ModalSignup = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create your account</ModalHeader>
        <ModalBody>
          <Signup/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalSignup;