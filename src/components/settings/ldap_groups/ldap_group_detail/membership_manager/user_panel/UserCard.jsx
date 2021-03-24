import React, {useState} from "react";
import PropTypes from "prop-types";

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
    <li key={user.emailAddress} className={selectedUsers.includes(user) ? "p-2 member-list selected" : "p-2 member-list"} onClick={selectUser}>
      <div className="px-2 justify-content-between d-flex w-100">
        <div>{user.name}</div>
        <div className={selectedUsers.includes(user) ? "" : "text-muted"}>{user.emailAddress}</div>
      </div>
    </li>
  );
}

UserCard.propTypes = {
  user: PropTypes.object,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
};

export default UserCard;