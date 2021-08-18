import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import userActions from "components/user/user-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import Model from "core/data_model/model";
import {ldapUsersMetaData} from "components/settings/ldap_users/ldap-users-metadata";
import {ssoUserMetadata} from "components/settings/users/sso-user-metadata";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import LdapGroupMultiSelectInput
  from "components/common/list_of_values_input/settings/groups/LdapGroupMultiSelectInput";
import ActiveLogTerminal from "components/common/logging/ActiveLogTerminal";

function UserEditorPanel({ userData, orgDomain, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [userModel, setUserModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setUserModel(userData);
    setIsLoading(false);
  };

  const handleUserCreation = async () => {
    try {
      setIsSaving(true);
      let newLogs = addLog([], "Beginning the user creation process...");
      newLogs = addLog(newLogs, `Checking if email address [${userModel?.getData("emailAddress")}] is available`);
      const isEmailTaken = await checkIfEmailExists();

      if (isEmailTaken === true) {
        newLogs = addLog(newLogs, `Email address [${userModel?.getData("emailAddress")}] is already taken!`);
        throw `User with email ${userModel?.getData("emailAddress")} already exists. Please try another email address.`;
      }

      newLogs = addLog(newLogs, `Email address [${userModel?.getData("emailAddress")}] is available.`);
      newLogs = addLog(newLogs, `Adding user [${userModel?.getData("emailAddress")}] to Organization ${userModel?.getData("organizationName")}.`);
      const userResponse = await createLdapUser();


      if (userResponse?.status !== 200) {
        addLog(newLogs, `Error adding user to Organization`);
        throw "Error adding user to Organization";
      }

      newLogs = addLog(newLogs, `User [${userModel?.getData("emailAddress")}] successfully added to Organization ${userModel?.getData("organizationName")}.`);
      newLogs = addLog(newLogs, `Adding user [${userModel?.getData("emailAddress")}] to Opsera Platform.`);
      const ssoUserResponse = await createSsoUser();

      if (ssoUserResponse?.data?.status !== 200) {
        addLog(newLogs, `Error adding user to Opsera Platform`);
        throw "User was successfully added to Organization but could not be added to Opsera Platform.";
      }

      newLogs = addLog(newLogs, `User [${userModel?.getData("emailAddress")}] successfully added to Opsera Platform.`);
      const groups = userModel.getArrayData("groups");

      if (Array.isArray(groups) && groups.length > 0) {
        newLogs = addLog(newLogs, `Adding user [${userModel?.getData("emailAddress")}] to Groups [${JSON.stringify(groups)}].`);
        await assignUserToSelectedGroups(newLogs, groups);
      }

      return "Success";
    }
    finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  const checkIfEmailExists = async () => {
    const email = userModel?.getData("emailAddress");
    const emailIsAvailable = await accountsActions.isEmailAvailableV2(getAccessToken, cancelTokenSource, email);

    return emailIsAvailable?.data === false;
  };

  const createLdapUser = async () => {
    const newLdapUserData = {
      preferredName: userModel?.getData("preferredName"),
      name: `${userModel?.getData("firstName")} ${userModel?.getData("lastName")}`,
      firstName: userModel?.getData("firstName"),
      lastName: userModel?.getData("lastName"),
      emailAddress: userModel?.getData("emailAddress"),
      division: userModel?.getData("division"),
      site: userModel?.getData("site"),
      teams: userModel?.getData("teams"),
      title: userModel?.getData("title"),
    };
    const newLdapUser = new Model({...newLdapUserData}, ldapUsersMetaData, false);

    return await accountsActions.createUserV2(getAccessToken, cancelTokenSource, orgDomain, newLdapUser);
  };

  const createSsoUser = async () => {
    const newSsoUserData = {
      preferredName: userModel?.getData("preferredName"),
      name: `${userModel?.getData("firstName")} ${userModel?.getData("lastName")}`,
      firstName: userModel?.getData("firstName"),
      lastName: userModel?.getData("lastName"),
      email: userModel?.getData("emailAddress"),
      division: userModel?.getData("division"),
      site: userModel?.getData("site"),
      teams: userModel?.getData("teams"),
      title: userModel?.getData("title"),
      company: userModel?.getData("company"),
      ldapOrgAccount: userModel?.getData("ldapOrgAccount"),
      ldapOrgDomain: userModel?.getData("ldapOrgDomain"),
      organizationName: userModel?.getData("organizationName"),
      orgAccount: userModel?.getData("orgAccount"),
      cloudProvider: userModel?.getData("cloudProvider"),
      cloudProviderRegion: userModel?.getData("cloudProviderRegion"),
    };
    const newSsoUser = new Model({...newSsoUserData}, ssoUserMetadata, false);

    return await userActions.createOpseraAccount(newSsoUser);
  };

  const assignUserToSelectedGroups = async (newLogs, groups) => {
    const userEmail = userModel?.getData("emailAddress");

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const groupResponse = await accountsActions.getGroupV2(getAccessToken, cancelTokenSource, orgDomain, group);
      const existingGroup = groupResponse?.data;
      const members = existingGroup?.members;

      newLogs = addLog(newLogs, `Adding user [${userModel?.getData("emailAddress")}] to Group [${group}].`);

      if (existingGroup && Array.isArray(members)) {
        let emailList = members.reduce((acc, item) => {
          acc.push(item.emailAddress);
          return acc;
        }, []);

        if (Array.isArray(emailList) && !emailList.includes[userEmail]) {
          emailList.push(userEmail);
          const response = await accountsActions.syncMembershipV2(getAccessToken, cancelTokenSource, orgDomain, group, emailList);

          if (response?.status === 200) {
            newLogs = addLog(newLogs, `User [${userModel?.getData("emailAddress")}] successfully added to Group [${group}].`);
          }
          else {
            newLogs = addLog(newLogs, `Error adding User [${userModel?.getData("emailAddress")}] to Group [${group}].`);
          }
        }
      }
    }
  };

  // TODO: Wire up if necessary
  const syncLdap = async (userId) => {
    return await RegisteredUserActions.syncLdap(userId, getAccessToken);
  };

  const updateLdapUser = async () => {
    return await accountsActions.updateUserV2(getAccessToken, cancelTokenSource, orgDomain, userModel);
  };

  const getLogs = () => {
    if (isSaving && logs.length > 0) {
      return (
        <Col lg={12}>
          <ActiveLogTerminal logs={logs} handleClose={closeLogs} />
        </Col>
      );
    }
  };

  const addLog = (currentLogs, newLog) => {
    if (isMounted?.current === true) {
      const newLogs = [...currentLogs];
      newLogs.push(`${newLog}\n`);
      setLogs([...newLogs]);
      return newLogs;
    }
  };

  const closeLogs = () => {
    if (isMounted?.current === true) {
      setLogs([]);
    }
  };

  if (isLoading || orgDomain == null || userModel == null) {
    return (<LoadingDialog size={"sm"} message={"Loading User Creation Form"} />);
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      createRecord={handleUserCreation}
      updateRecord={updateLdapUser}
      setRecordDto={setUserModel}
      recordDto={userModel}
      showBooleanToggle={true}
      booleanToggleDisabled={true}
      enabledText={"Active"}
      disabledText={"Inactive"}
      disable={isSaving === true}
    >
      <Row>
        <Col lg={4}>
          <TextInputBase setDataObject={setUserModel} dataObject={userModel} fieldName={"title"}/>
        </Col>
        <Col lg={4}>
          <TextInputBase setDataObject={setUserModel} dataObject={userModel} fieldName={"firstName"}/>
        </Col>
        <Col lg={4}>
          <TextInputBase setDataObject={setUserModel} dataObject={userModel} fieldName={"lastName"}/>
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setUserModel} dataObject={userModel} fieldName={"preferredName"} />
        </Col>
        <Col lg={6}>
          <TextInputBase disabled={!userModel?.isNew()} setDataObject={setUserModel} dataObject={userModel} fieldName={"emailAddress"} />
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setUserModel} dataObject={userModel} fieldName={"division"}/>
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setUserModel} dataObject={userModel} fieldName={"site"}/>
        </Col>
        <Col lg={6}>
          <LdapGroupMultiSelectInput setModel={setUserModel} model={userModel} fieldName={"groups"}/>
        </Col>
        <Col lg={6}>
          <BooleanToggleInput disabled={true} setDataObject={setUserModel} dataObject={userModel} fieldName={"localAuth"}/>
        </Col>
        {getLogs()}
      </Row>
    </EditorPanelContainer>
  );
}

UserEditorPanel.propTypes = {
  orgDomain: PropTypes.string,
  userData: PropTypes.object,
  handleClose: PropTypes.func,
};

export default UserEditorPanel;


