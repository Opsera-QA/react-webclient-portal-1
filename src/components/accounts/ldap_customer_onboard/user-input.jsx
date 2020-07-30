import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import NewOnboardLdapUserModal from "./NewOnboardLdapUserModal";


// TODO: If this can be useful elsewhere, make more generic
function UserInput({field, setData, formData, opseraUser}) {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  useEffect(() => {
  }, []);

  const removeUser = (i) => {
    let currentUsers = formData[field.id];
    currentUsers.splice(i, 1);
    setData(field.id, currentUsers);
  };

  const addUser = (newUser) => {
    if (newUser) {
      if (Object.keys(formData[field.id]) > 0 && formData[field.id].find(user => user.emailAddress.toLowerCase() === newUser.emailAddress.toLowerCase())) {
        console.error("User Emails must be unique, so the user was not added.");
        // TODO: add modal asking if you would like to re-enter details
        return;
      }
      let currentUsers = formData[field.id];
      currentUsers.push(newUser);
      setData(field.id, currentUsers);
    }
  };

  const onModalClose = (ldapUserData) => {
    if (ldapUserData) {
      addUser(ldapUserData);
    }
    setShowCreateUserModal(false);
  }

  // TODO: Create its own className and styling
  return (
    <>
      {
        showCreateUserModal ? <NewOnboardLdapUserModal
          showModal={showCreateUserModal}
          onModalClose={onModalClose}/> : null
      }
      {field &&
      <>
        <Form.Group className="custom-text-input" controlId={field.id + "-items"}>
          <Form.Label>
            <span>{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null} </span>
          </Form.Label>
          <div className="custom-item-input">
            {formData[field.id].map((user, i) => (
              <Button key={user} variant="outline-secondary" className="mr-2" size="sm">
                {i === 0 && opseraUser != null && "Admin: "}{user.firstName + " " + user.lastName}
                {(i > 0 || (i === 0 && opseraUser == null)) &&
                <span className="ml-2" onClick={() => {
                  removeUser(i);
                }}><FontAwesomeIcon icon={faTimes} fixedWidth/></span>
                }
              </Button>
            ))}
            <div className="text-right">
              <Button variant="primary" size="sm" onClick={() => setShowCreateUserModal(true)}
                      className="ml-3"><FontAwesomeIcon
                icon={faPlus}/>Add LDAP User</Button>
            </div>
          </div>
          <Form.Control.Feedback type="invalid">
            {/*<div>{errorMessage}</div>*/}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            <div>{field.fieldText}</div>
          </Form.Text>
        </Form.Group>
      </>
      }
    </>
  );
}

UserInput.propTypes = {
  setData: PropTypes.func,
  field: PropTypes.object,
  formData: PropTypes.object,
  opseraUser: PropTypes.object
};

export default UserInput;