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

function UserEditorPanel({ userData, orgDomain, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [userModel, setUserModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
      const isEmailTaken = await checkIfEmailExists();

      if (isEmailTaken === false) {
        const userResponse = await createLdapUser();
        console.log("userResponse: " + JSON.stringify(userResponse));


        const ssoUserResponse = await createSsoUser();
        console.log("ssoUserResponse: " + JSON.stringify(ssoUserResponse));
        // TODO: Check response;
        // TODO: Check response;
        // const groupAssignmentResponse = await assignUserToSelectedGroups();
        // TODO: Check response;

        //TODO: Only keep this in if it's necessary
        // const syncLdapResponse = await syncLdap();
      }
    }
    catch (error) {
      return error;
    }
  };

  const checkIfEmailExists = async () => {
    const email = userModel?.getData("emailAddress");
    const emailIsAvailable = await accountsActions.isEmailAvailableV2(getAccessToken, cancelTokenSource, email);

    if (emailIsAvailable?.data === false) {
      throw `User with email ${email} already exists. Please try another email address.`;
    }

    return false;
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

    console.log("newLdapUserData: " + JSON.stringify(newLdapUserData));
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

  // const assignUserToSelectedGroups = async () => {
  //
  // };

  const syncLdap = async (userId) => {
    return await RegisteredUserActions.syncLdap(userId, getAccessToken);
  };

  const updateLdapUser = async () => {
    return await accountsActions.updateUserV2(getAccessToken, cancelTokenSource, orgDomain, userModel);
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
        {/*TODO: Add LocalAuth disabled switch */}
        {/*TODO: Add group membership multiselect input*/}
        {/*<Col lg={6}>*/}
        {/*  <TextInputBase disabled={true} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"teams"} />*/}
        {/*</Col>*/}
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


