import React, { useState } from "react";
import PropTypes from "prop-types";
import UserCard from "components/common/inputs/user/membership/manager/user_panel/UserCard";
import { faArrowRight, faPlusCircle, faUsers } from "@fortawesome/pro-light-svg-icons";
import ClientSideBottomPaginator from "components/common/pagination/client_side/ClientSideBottomPaginator";
import { Button, Row } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import Col from "react-bootstrap/Col";

// TODO: This needs to be rewritten
function NonMembersPanel(
  {
    selectedNonMembers,
    setSelectedNonMembers,
    nonMembers,
    setNonMembers,
    members,
    setMembers,
    setShowUnsavedChangesMessage,
    filteredNonmembers,
    setSearchText,
  }) {
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
        <UserCard selectedUsers={selectedNonMembers} setSelectedUsers={setSelectedNonMembers} user={user} />
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

    return (shownNonMembers.map((user, i) => {
      return (formatUser(user, i));
    }));
  };

  const getButtons = () => {
    return (
      <Row>
        <Col lg={12} xl={4} className={"my-2"}>
          <Button
            className={"w-100"}
            size={"sm"}
            variant={"success"}
            onClick={addAllNonmembers}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div className={"d-xs-none d-md-none d-lg-inline"}>
                <IconBase icon={faPlusCircle} />
              </div>
              <div className={"mx-2"}>
                Add All
              </div>
              <div>
                <span className={"badge badge-secondary"}>{filteredNonmembers.length}</span>
              </div>
            </div>
          </Button>
        </Col>
        <Col lg={12} xl={4} className={"my-2"}>
          <Button
            className={"w-100"}
            disabled={selectedNonMembers.length === 0}
            size={"sm"}
            variant={"outline-primary"}
            onClick={() => addSelectedToMembers()}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div className={"d-xs-none d-md-none d-lg-inline"}>
                <IconBase icon={faArrowRight} fixedWidth />
              </div>
              <div className={"mx-2"}>
                Add Selected
              </div>
              <div>
                <span className={"badge badge-secondary"}>
                  {selectedNonMembers.length}
                </span>
              </div>
            </div>
          </Button>
        </Col>
        <Col lg={12} xl={4} className={"my-2"}>
          <Button
            className={"w-100"}
            size={"sm"}
            variant={"outline-success"}
            onClick={addAllShownNonMembers}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div className={"d-xs-none d-md-none d-lg-inline"}>
                <IconBase icon={faPlusCircle} />
              </div>
              <div className={"mx-2"}>
                Add Shown
              </div>
              <div>
                <span className={"badge badge-secondary"}>
                  {shownNonMembers.length}
                </span>
              </div>
            </div>
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <div className={"mr-2"}>
      {getButtons()}
      <div className={"content-card-1 content-container"}>
        <div className={"px-2 d-flex content-block-header justify-content-between"}>
          <div><IconBase icon={faUsers} className={"mr-2"} />Not Members</div>
          <div>{nonMembers.length} {nonMembers.length !== 1 ? "users" : "user"}</div>
        </div>
        <ul className="list-group membership-list">
          {formatUsers()}
        </ul>
        <div className="px-3 mt-2">
          <ClientSideBottomPaginator items={filteredNonmembers} setShownItems={setShownNonMembers}
                                     paginationStyle={"stacked"} pageSize={50} />
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