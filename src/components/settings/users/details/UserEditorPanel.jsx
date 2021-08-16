import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import axios from "axios";
import userActions from "components/user/user-actions";
import {DialogToastContext} from "contexts/DialogToastContext";

function UserEditorPanel({ ldapUserData, orgDomain, setLdapUserData, authorizedActions, handleClose }) {
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
    setUserModel(ldapUserData);
    setIsLoading(false);
  };

  const createLdapUser = async () => {
    const email = userModel?.getData("emailAddress");
    const emailIsAvailable = await accountsActions.isEmailAvailableV2(getAccessToken, cancelTokenSource, email);

    if (emailIsAvailable?.data === false) {
      throw `User with email ${email} already exists. Please try another email address.`;
    }

    await userActions.createOpseraAccount(userModel);
    return await accountsActions.createUserV2(getAccessToken, cancelTokenSource, orgDomain, userModel);
  };

  const updateLdapUser = async () => {
    return await accountsActions.updateUser(orgDomain, userModel, getAccessToken);
  };

  if (isLoading || userModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("update_user")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this user"} />;
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      createRecord={createLdapUser}
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
          <TextInputBase disabled={!setUserModel?.isNew()} setDataObject={setUserModel} dataObject={userModel} fieldName={"emailAddress"} />
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setUserModel} dataObject={userModel} fieldName={"division"}/>
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setUserModel} dataObject={setUserModel} fieldName={"site"}/>
        </Col>
        {/*TODO: Add group membership multiselect input*/}
        {/*<Col lg={6}>*/}
        {/*  <TextInputBase disabled={true} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"teams"} />*/}
        {/*</Col>*/}
      </Row>
    </EditorPanelContainer>
  );
}

UserEditorPanel.propTypes = {
  showButton: PropTypes.bool,
  orgDomain: PropTypes.string,
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default UserEditorPanel;


