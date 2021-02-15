import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import WarningDialog from "components/common/status_notifications/WarningDialog";

function LdapUserEditorPanel({ ldapUserData, orgDomain, setLdapUserData, authorizedActions, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapUserDataDto, setLdapUserDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapUserDataDto(ldapUserData);
    setIsLoading(false);
  };

  const createLdapUser = async () => {
    const email = ldapUserDataDto.getData("emailAddress");
    const emailIsAvailable = await accountsActions.isEmailAvailable(email, getAccessToken);

    if (emailIsAvailable?.data === false) {
      throw `User with email ${email} already exists. Please try another email address.`;
    }

    return await accountsActions.createUser(orgDomain, ldapUserDataDto, getAccessToken);
  };

  const updateLdapUser = async () => {
    return await accountsActions.updateUser(orgDomain, ldapUserDataDto, getAccessToken);
  };

  if (isLoading) {
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
      setRecordDto={setLdapUserDataDto}
      recordDto={ldapUserDataDto}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase disabled={!ldapUserDataDto.isNew()} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <TextInputBase disabled={!ldapUserDataDto.isNew()} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"emailAddress"} />
        </Col>
        <Col lg={4}>
          <TextInputBase setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"title"}/>
        </Col>
        <Col lg={4}>
          <TextInputBase setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"firstName"}/>
        </Col>
        <Col lg={4}>
          <TextInputBase setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"lastName"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"preferredName"} />
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"division"}/>
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"site"}/>
        </Col>
        <Col lg={6}>
          <TextInputBase disabled={true} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"teams"} />
        </Col>
        <Col lg={6}>
          <TextInputBase disabled={true} setDataObject={setLdapUserDataDto} dataObject={ldapUserDataDto} fieldName={"departmentName"} />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

LdapUserEditorPanel.propTypes = {
  showButton: PropTypes.bool,
  orgDomain: PropTypes.string,
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapUserEditorPanel;


