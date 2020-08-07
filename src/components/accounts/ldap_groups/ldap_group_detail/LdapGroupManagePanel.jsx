import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Button, Alert} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faMinusCircle,
  faPlusCircle,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import accountsActions from "components/accounts/accounts-actions.js";

import "components/accounts/accounts.css";
import PropTypes from "prop-types";
import UserPanel from "../../../common/panels/user_panel/usersPanel";
import LoadingDialog from "../../../common/loading";
import ErrorDialog from "../../../common/error";

function LdapGroupManagePanel({ldapGroupData, ldapOrganizationData, loadData}) {
  const {name} = useParams();
  const {getUserRecord, getAccessToken} = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [showToast, toggleToast] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedNonMembers, setSelectedNonMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setIsLoading(true);
    await changeMemberStatus();
    setIsLoading(false);
  }

  const changeMemberStatus = async () => {
    console.log("Change Member status users: " + JSON.stringify(ldapOrganizationData.users));
    // setMembers(ldapGroupData.members);

    //If the group have members already, pre-select checkbox
    ldapOrganizationData.users.map((user, index) => {
      let member = ldapGroupData.members.find((member) => member.emailAddress === user.emailAddress);

      if (member != null) {
        console.log("Is member: " + JSON.stringify(member));
        addMember(member);
      } else {
        console.log("Is not member: " + JSON.stringify(user));
        addNonMember(user);
      }
    });
  };

  const addMember = (user) => {
    console.log("Nonmembers add: " + JSON.stringify());
    let newMembers = members;
    newMembers.push(user);
    setMembers(newMembers);
  };

  const addAllToMembers = () => {
    let newMembers = members;
    newMembers.push(...nonMembers);
    setMembers(newMembers);
    setNonMembers([]);
  };

  const addNonMember = (user) => {
    let newNonMembers = nonMembers;
    newNonMembers.push(user);
    setNonMembers(newNonMembers);
  };

  const removeAllMembers = () => {
    let newNonMembers = nonMembers;
    newNonMembers.push(...members);
    setNonMembers(newNonMembers);
    setMembers([]);
  };

  const addSelectedToMembers = () => {
    console.log("adding selected to members: " + JSON.stringify(selectedNonMembers));
    let newMembers = members;
    newMembers.push(...selectedNonMembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user))
    setNonMembers(newNonMembers);
    setMembers(newMembers);
    setSelectedNonMembers([]);
  };

  const addSelectedToNonMembers = () => {
    console.log("adding selected to nonmembers: " + JSON.stringify(selectedMembers));
    let newNonMembers = nonMembers;
    newNonMembers.push(...selectedMembers);
    let newMembers = members.filter(user => !newNonMembers.includes(user));
    setNonMembers(newNonMembers);
    setMembers(newMembers);
    setSelectedMembers([]);
  };

  const updateMembers = async () => {
    let emailList = members.reduce((acc, item) => {
      acc.push(item.emailAddress);
      return acc;
    }, []);
    let payload = {
      domain: ldapOrganizationData.orgDomain,
      groupName: name,
      emails: emailList,
    };
    const response = await accountsActions.syncMembership(payload, getAccessToken);
    toggleToast(true);
    loadData();
  };

  if (isLoading) {
    return (<LoadingDialog/>);
  } else {
    return (<>
      <div>
        <div className="mb-3">
          {showToast && <Alert variant="success" onClose={() => toggleToast(false)} dismissible>
            Group members updated successfully!
          </Alert>}
          <Row>
            <Col xs={5}>
              <div className="mb-2 text-right">
                <Button size="sm" variant="danger" onClick={removeAllMembers}>
                  <FontAwesomeIcon icon={faMinusCircle} fixedWidth/>Remove All
                </Button>
              </div>
              <UserPanel users={members} setSelectedUsers={setSelectedMembers} selectedUsers={selectedMembers}
                         usersTitle="Members"/>
            </Col>
            <Col xs={2} className="my-auto">
              <div className="w-100">
                <div className="mb-2">
                  <Button size="sm" className="w-100" variant="outline-primary"
                          onClick={() => addSelectedToNonMembers()}>
                    <FontAwesomeIcon icon={faArrowRight} fixedWidth/><span
                    className="mr-2 text-right">Remove Selected</span>
                  </Button>
                </div>
                <div className="mb-2">
                  <Button size="sm" className="w-100" variant="outline-primary" onClick={() => addSelectedToMembers()}>
                    <FontAwesomeIcon icon={faArrowLeft} fixedWidth/>Add Selected
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={5}>
              <div className="mb-2">
                <Button size="sm" variant="success" onClick={addAllToMembers}>
                  <FontAwesomeIcon icon={faPlusCircle} fixedWidth/>Add All
                </Button>
              </div>
              <UserPanel users={nonMembers} setSelectedUsers={setSelectedNonMembers} selectedUsers={selectedNonMembers}
                         usersTitle="Not Members"/>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-3">
                <div className="mt-3">
                  <Button size="sm" variant="primary" onClick={updateMembers}>
                    <FontAwesomeIcon icon={faSave} fixedWidth/>Save
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>);
  }
}

LdapGroupManagePanel.propTypes = {
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  getGroup: PropTypes.func
};

export default LdapGroupManagePanel;
