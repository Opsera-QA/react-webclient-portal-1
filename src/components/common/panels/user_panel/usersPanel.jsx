import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserCard from "./userCard";
import {faUsers} from "@fortawesome/pro-light-svg-icons";

function UserPanel({users, usersTitle, selectedUsers, setSelectedUsers}) {
  if (users == null) {
    return <></>;
  }

  return (
    <div className="table-content-block content-card-1">
      <div className="px-2 content-block-header members-title">
        <span><FontAwesomeIcon icon={faUsers} fixedWidth className="mr-2"/>{usersTitle}</span>
        <span>{users.length} users</span>
      </div>
      <ul className="list-group content-block-body">
        {users.map((user, i) => {
          return (
            <div key={user.emailAddress} className={i % 2 === 0 ? "even-row" : "odd-row"}>
              <UserCard selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} user={user}/>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

UserPanel.propTypes = {
  users: PropTypes.array,
  usersTitle: PropTypes.string,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func
};

export default UserPanel;