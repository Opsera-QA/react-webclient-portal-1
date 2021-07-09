import React, {useState} from "react";
import PropTypes from "prop-types";

function UnitTestClassCard({user, selectedUsers, setSelectedUsers}) {
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
        let removeEmail = user;
        let newSelectedUsers = selectedUsers.filter(user => user !== removeEmail);
        setSelectedUsers([...newSelectedUsers]);
      }
    }
  };

  return (
    <li key={user} className={selectedUsers.includes(user) ? "p-2 member-list selected" : "p-2 member-list"} onClick={selectUser}>
      <div className="px-2 justify-content-between d-flex w-100">
        <div>{user}</div>
      </div>
    </li>
  );
}

UnitTestClassCard.propTypes = {
  user: PropTypes.object,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
};

export default UnitTestClassCard;