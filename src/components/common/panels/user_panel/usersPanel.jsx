import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import UserCard from "./userCard";

function UserPanel({users, usersTitle, selectedUsers, setSelectedUsers}) {
  return (
    <>
      {users &&
      <div className="table-content-block content-card-1">
        <div className="px-2 content-block-header members-title">
                <span>
                  <FontAwesomeIcon icon={faUser} fixedWidth className="mr-2"/>
                  {usersTitle}
                </span>
          <span>{users.length} users</span>
          {/*{selectedUsers.length > 0 && <span>({selectedUsers.length} selected)</span>}*/}
        </div>
        <ul className="list-group content-block-body">
          {users.map((user, i) => {
            return (
              <div key={user.emailAddress} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                <UserCard selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} user={user} />
              </div>
            );
          })}
        </ul>
      </div>
      }
    </>
  );
}

UserPanel.propTypes = {
  users: PropTypes.array,
  usersTitle: PropTypes.string,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func
};

export default UserPanel;