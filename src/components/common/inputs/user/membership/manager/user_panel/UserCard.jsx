import React, {useState} from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

function UserCard({user, selectedUsers, setSelectedUsers}) {
  const [userSelected, setUserSelected] = useState(false);

  const selectUser = () => {
    let selectUser = !userSelected;
    setUserSelected(selectUser);

    if (selectUser) {
      if (!selectedUsers.includes(user)) {
        selectedUsers.push(user);
        setSelectedUsers([...selectedUsers]);
      }
    } else {
      if (selectedUsers.includes(user)) {
        let removeEmail = user.emailAddress;
        let newSelectedUsers = selectedUsers.filter(user => user.emailAddress !== removeEmail);
        setSelectedUsers([...newSelectedUsers]);
      }
    }
  };

  return (
    <li key={user.emailAddress} className={selectedUsers.includes(user) ? "p-1 member-list selected" : "p-1 member-list"} onClick={selectUser}>
      <Row className={"mx-0"}>
        <Col lg={12} xl={6} className={"no-wrap-inline"}>{user.name}</Col>
        <Col lg={12} xl={6} className={selectedUsers.includes(user) ? "d-flex w-100" : "d-flex w-100 text-muted"}>
          <div>{user.emailAddress}</div>
        </Col>
      </Row>
    </li>
  );
}

UserCard.propTypes = {
  user: PropTypes.object,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
};

export default UserCard;