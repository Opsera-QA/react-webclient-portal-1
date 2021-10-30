import React, {useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserCard from "components/common/inputs/user/membership/manager/user_panel/UserCard";
import {faArrowRight, faPlusCircle, faUsers} from "@fortawesome/pro-light-svg-icons";
import ClientSideBottomPaginator from "components/common/pagination/client_side/ClientSideBottomPaginator";
import {Button} from "react-bootstrap";

function NonMembersPanel({selectedNonMembers, setSelectedNonMembers, nonMembers, setNonMembers, members, setMembers, setShowUnsavedChangesMessage, filteredNonmembers, setSearchText}) {
  const [shownNonMembers, setShownNonMembers] = useState([]);

  if (members == null) {
    return <></>;
  }

  const addAllNonmembers = () => {
    setShowUnsavedChangesMessage(true);
    let newMembers = members;
    newMembers.push(...filteredNonmembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user));
    setMembers([...newMembers]);
    setNonMembers([...newNonMembers]);
    setSearchText("");
  };

  const addAllShownNonMembers = () => {
    setShowUnsavedChangesMessage(true);
    let newMembers = members;
    newMembers.push(...shownNonMembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user));
    setNonMembers([...newNonMembers]);
    setMembers([...newMembers]);
    setSelectedNonMembers([]);
    setSearchText("");
  };

  const addSelectedToMembers = () => {
    setShowUnsavedChangesMessage(true);
    let newMembers = members;
    newMembers.push(...selectedNonMembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user));
    setNonMembers([...newNonMembers]);
    setMembers([...newMembers]);
    setSelectedNonMembers([]);
    setSearchText("");
  };

  const formatUser = (user, index) => {
    return (
      <div key={user.emailAddress} className={index % 2 === 0 ? "even-row" : "odd-row"}>
        <UserCard selectedUsers={selectedNonMembers} setSelectedUsers={setSelectedNonMembers} user={user}/>
      </div>
    );
  };

  const formatUsers = () => {
    if (shownNonMembers.length === 0) {
      return (
        <div className="h-100 m-auto text-center">
          <span>No Records Found</span>
        </div>
      );
    }

    return (shownNonMembers.map((user, i) => {return (formatUser(user, i));}));
  };

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between">
        <Button size="sm" variant="success" onClick={addAllNonmembers}>
          <span className="mr-2"><FontAwesomeIcon className="mr-2" icon={faPlusCircle} fixedWidth/>Add All</span>
          <span className="badge badge-secondary">{filteredNonmembers.length}</span>
        </Button>
        <Button disabled={selectedNonMembers.length === 0} size="sm" variant="outline-primary" onClick={() => addSelectedToMembers()}>
          <div className="d-flex justify-content-between">
            <div><FontAwesomeIcon icon={faArrowRight} fixedWidth/></div>
            <div className="mx-2">Add Selected</div>
            <div><span className="badge badge-secondary">{selectedNonMembers.length}</span></div>
          </div>
        </Button>
        <Button size="sm" variant="outline-success" onClick={addAllShownNonMembers}>
          <span className="mr-2"><FontAwesomeIcon className="mr-2" icon={faPlusCircle} fixedWidth/>Add All Shown</span>
          <span className="badge badge-secondary">{shownNonMembers.length}</span>
        </Button>
      </div>
      <div className="content-card-1 content-container">
        <div className="px-2 d-flex content-block-header justify-content-between">
          <div><FontAwesomeIcon icon={faUsers} fixedWidth className="mr-2"/>Not Members</div>
          <div>{nonMembers.length} {nonMembers.length !== 1 ? "users" : "user"}</div>
        </div>
        <ul className="list-group membership-list">
          {formatUsers()}
        </ul>
        <div className="px-3 mt-2">
          <ClientSideBottomPaginator items={filteredNonmembers} setShownItems={setShownNonMembers} paginationStyle={"stacked"} pageSize={50} />
        </div>
      </div>
    </div>
  );
}

NonMembersPanel.propTypes = {
  filteredNonmembers: PropTypes.array,
  members: PropTypes.array,
  setMembers: PropTypes.func,
  nonMembers: PropTypes.array,
  setNonMembers: PropTypes.func,
  selectedNonMembers: PropTypes.array,
  setSelectedNonMembers: PropTypes.func,
  setShowUnsavedChangesMessage: PropTypes.func,
  setSearchText: PropTypes.func,
};

export default NonMembersPanel;