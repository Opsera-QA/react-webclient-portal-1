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
import accountsActions from "components/admin/accounts/accounts-actions.js";

import "components/admin/accounts/accounts.css";
import PropTypes from "prop-types";
import UserPanel from "../../../common/panels/user_panel/usersPanel";
import LoadingDialog from "../../../common/status_notifications/loading";
import WarningDialog from "../../../common/status_notifications/WarningDialog";
import DetailPanelContainer from "../../../common/panels/detail_panel_container/DetailPanelContainer";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function LdapGroupManagePanel({ldapGroupData, ldapOrganizationData, loadData, authorizedActions}) {
  const {name} = useParams();
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken} = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedNonMembers, setSelectedNonMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setIsLoading(true);
      await changeMemberStatus();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const changeMemberStatus = async () => {
    //If the group have members already, pre-select checkbox
    ldapOrganizationData.users.map((user, index) => {
      let member = ldapGroupData.members.find((member) => member.emailAddress === user.emailAddress);

      if (member != null) {
        addMember(member);
      } else {
        addNonMember(user);
      }
    });
  };

  const addMember = (user) => {
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
    let newMembers = members;
    newMembers.push(...selectedNonMembers);
    let newNonMembers = nonMembers.filter(user => !newMembers.includes(user))
    setNonMembers(newNonMembers);
    setMembers(newMembers);
    setSelectedNonMembers([]);
  };

  const addSelectedToNonMembers = () => {
    let newNonMembers = nonMembers;
    newNonMembers.push(...selectedMembers);
    let newMembers = members.filter(user => !newNonMembers.includes(user));
    setNonMembers(newNonMembers);
    setMembers(newMembers);
    setSelectedMembers([]);
  };

  const updateMembers = async () => {
    try {
      let emailList = members.reduce((acc, item) => {
        acc.push(item.emailAddress);
        return acc;
      }, []);
      await accountsActions.syncMembership(ldapOrganizationData, ldapGroupData.name, emailList, getAccessToken);
      toastContext.showUpdateSuccessResultDialog("Group Membership");
      loadData();
    }
    catch (error) {
      toastContext.showErrorDialog(error);
    }
  };

  if (isLoading) {
    return (<LoadingDialog/>);
  }

  if (!authorizedActions.includes("update_group_membership")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update group membership."} />;
  }

    return (
      <DetailPanelContainer showRequiredFieldsMessage={false}>
        <div className="mb-3">
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
            <Col xs={2} className="">
              <div className="w-100">
                <div className="mt-5 mb-2">
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


                <div className="text-right mt-5">
                  <div className="mt-3">
                    <Button size="sm" variant="primary" onClick={updateMembers}>
                      <FontAwesomeIcon icon={faSave} fixedWidth/>Save
                    </Button>
                  </div>
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
          {/*<Row>
            <Col lg={12}>
              <div className="text-center mt-3">
                <div className="mt-3">
                  <Button size="sm" variant="primary" onClick={updateMembers}>
                    <FontAwesomeIcon icon={faSave} fixedWidth/>Save
                  </Button>
                </div>
              </div>
            </Col>
          </Row>*/}
        </div>
      </DetailPanelContainer>
    );
}

LdapGroupManagePanel.propTypes = {
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  getGroup: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapGroupManagePanel;
