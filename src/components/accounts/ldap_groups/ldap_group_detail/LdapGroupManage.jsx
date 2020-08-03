import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/common/loading";
import ErrorDialog from "components/common/error";
import { Link, useParams } from "react-router-dom";
import accountsActions from "components/accounts/accounts-actions.js";

import "components/accounts/accounts.css";

function LdapGroupManage({ groupData, organization, getGroup }) {
  const { name } = useParams();
  const { getUserRecord, getAccessToken } = useContext(AuthContext);
  const [allMembers, setAllMembers] = useState([...organization.users]);
  const [membersList, addMemberToList] = useState([...groupData.members]);
  const [showToast, toggleToast] = useState(false);

  useEffect(() => {
    toggleToast(false);
    changeMemberStatus();
  }, []);

  const changeMemberStatus = () => {
    //If the group have members already, pre-select checkbox
    allMembers.map((item, index) => {
      if (membersList.find((member) => member.emailAddress === item.emailAddress) == undefined) {
        item.isMember = false;
      } else {
        item.isMember = true;
      }
    });
    setAllMembers([...allMembers]);
  };

  const updateMembers = async () => {
    let emailList = membersList.reduce((acc, item) => {
      acc.push(item.emailAddress);
      return acc;
    }, []);
    let payload = {
      domain: organization.orgDomain,
      groupName: name,
      emails: emailList,
    };
    const response = await accountsActions.syncMembership(payload, getAccessToken);
    toggleToast(true);
    getGroup();
  };

  const toggleCheckbox = (row, state) => {
    let allIndex = allMembers.findIndex((i) => i.emailAddress === row.emailAddress);
    allMembers[allIndex].isMember = state;
    setAllMembers([...allMembers]);
  };

  const updateCheckedCell = (event, row) => {
    event.stopPropagation();
    if (membersList && membersList.length > 0) {
      //If member is already added, remove; if not then add member to the "memberList"
      if (membersList.find((member) => member.emailAddress === row.emailAddress) == undefined) {
        addMemberToList((membersList) => membersList.concat(row));
        toggleCheckbox(row, true);
      } else {
        //Remove from memberList
        let index = membersList.findIndex((i) => i.emailAddress === row.emailAddress);
        membersList.splice(index, 1);
        addMemberToList([...membersList]);
        toggleCheckbox(row, false);
      }
    } else {
      toggleCheckbox(row, true);
      addMemberToList([].concat(row));
    }
  };

  return (
    <div>
      <div className="mb-3 pt-2">
        {showToast && <Alert variant="success" onClose={() => toggleToast(false)} dismissible>
          Group members updated successfully!
        </Alert>}
        <Row>
          <Col xs={6}>
            <div className="members-block">
              <div className="members-title  mb-3">
                <span>
                  <FontAwesomeIcon icon={faUser} fixedWidth className="mr-2" />
                  Not Members
                </span>
                <span>{allMembers.length} members</span>
              </div>
              <ul className="list-group my-1">
                {allMembers &&
                  Object.keys(allMembers).map((member, i) => {
                    return (
                      <li key={i} className="member-list">
                        <Form.Check
                          type="checkbox"
                          checked={allMembers[member].isMember || false}
                          onChange={(e) => updateCheckedCell(e, allMembers[member])}
                          style={{}}
                        />
                        <div className="ml-2">
                          <div>{allMembers[member].name}</div>
                          <div className="text-muted">{allMembers[member].emailAddress}</div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </Col>
          <Col xs={6}>
            <div className="members-block">
              <div className="members-title mb-3">
                <span>
                  <FontAwesomeIcon icon={faUser} fixedWidth className="mr-2" />
                  Members
                </span>
                <span>{membersList ? membersList.length : 0} members</span>
              </div>
              <ul className="list-group my-1">
                {membersList &&
                  Object.keys(membersList).map((member, i) => {
                    return (
                      <li key={i} className="member-list">
                        <div>
                          <div>{membersList[member].name}</div>
                          <div className="text-muted">{membersList[member].emailAddress}</div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="text-right m-2">
              <Button size="sm" variant="primary" onClick={updateMembers}>
                <FontAwesomeIcon icon={faSave} fixedWidth /> Save
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LdapGroupManage;
