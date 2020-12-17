import React, {useState, useEffect, useContext} from "react";
import {Row, Col, Button, Alert} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/pro-light-svg-icons";
import {Link, useParams} from "react-router-dom";
import accountsActions from "components/admin/accounts/accounts-actions.js";

import "components/admin/accounts/accounts.css";
import PropTypes from "prop-types";
import UserPanel from "../../../common/panels/user_panel/usersPanel";
import LoadingDialog from "../../../common/status_notifications/loading";
import WarningDialog from "../../../common/status_notifications/WarningDialog";
import DetailPanelContainer from "../../../common/panels/detail_panel_container/DetailPanelContainer";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import StandaloneSaveButton from "../../../common/buttons/saving/StandaloneSaveButton";
import CancelButton from "../../../common/buttons/CancelButton";
import MessageField from "../../../common/form_fields/MessageField";

function LdapGroupMembershipManagementPanel({ldapGroupData, ldapOrganizationData, setActiveTab, loadData, authorizedActions}) {
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

  const getTopRow = () => {
    return (
      <Row>
        <Col xs={5}>
          <div className="mb-2 text-right">
            <Button size="sm" variant="danger" onClick={removeAllMembers}>
              <FontAwesomeIcon icon={faMinusCircle} className="mr-2" fixedWidth/>Remove All
            </Button>
          </div>
        </Col>
        <Col xs={2}/>
        <Col xs={5}>
          <div className="mb-2">
            <Button size="sm" variant="success" onClick={addAllToMembers}>
              <span><FontAwesomeIcon className="mr-2" icon={faPlusCircle} fixedWidth/> Add All</span>
            </Button>
          </div>
        </Col>
      </Row>
    )
  }

  const getMembersSide = () => {
    return (
      <Col xs={5}>
        <UserPanel users={members} setSelectedUsers={setSelectedMembers} selectedUsers={selectedMembers} usersTitle="Members"/>
      </Col>
    )
  };

  const goToSummaryPanel = () => {
    setActiveTab("summary");
  }

  const getMiddleColumn = () => {
    return (
      <Col xs={2}>
        <div className="w-100">
          <div className="d-flex justify-content-between py-1">
            <CancelButton isLoading={isLoading} cancelFunction={goToSummaryPanel} />
            <StandaloneSaveButton saveFunction={updateMembers} type={"Members"} />
          </div>
          <div className="mt-5 mb-2">
            <Button disabled={selectedMembers.length === 0} size="sm" className="w-100" variant="outline-primary" onClick={() => addSelectedToNonMembers()}>
              <div className="justify-content-between">
                <FontAwesomeIcon className="mr-2" icon={faArrowRight} fixedWidth/>
                <span>Remove Selected</span>
              </div>
            </Button>
          </div>
          <div>
            <Button disabled={selectedNonMembers.length === 0} size="sm" className="w-100" variant="outline-primary" onClick={() => addSelectedToMembers()}>
              <div className="justify-content-between">
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} fixedWidth/>
                <span>Add Selected</span>
              </div>
            </Button>
          </div>
        </div>
      </Col>
    );
  };

  const getNonmembersSide = () => {
    return (
      <Col xs={5}>
        <UserPanel users={nonMembers} setSelectedUsers={setSelectedNonMembers} selectedUsers={selectedNonMembers} usersTitle="Not Members"/>
      </Col>
    );
  };

  if (isLoading) {
    return (<LoadingDialog/>);
  }

  if (!authorizedActions.includes("update_group_membership")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update group membership."} />;
  }

  return (
    <DetailPanelContainer showRequiredFieldsMessage={false}>
      <Row>
        <MessageField
          message={` 
            Manage group membership below by adding items from the right column into the left or removing members from the left column.  
            Changes must be saved before being complete.  Group membership changes take effect after the user logs back in.
          `} />
      </Row>
      {getTopRow()}
      <Row>
        {getMembersSide()}
        {getMiddleColumn()}
        {getNonmembersSide()}
      </Row>
    </DetailPanelContainer>
  );
}

LdapGroupMembershipManagementPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  getGroup: PropTypes.func,
  setActiveTab: PropTypes.func,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapGroupMembershipManagementPanel;
