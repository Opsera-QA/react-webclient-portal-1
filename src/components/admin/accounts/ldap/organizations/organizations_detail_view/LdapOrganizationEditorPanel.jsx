import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PersistButtonContainer from "components/common/buttons/saving/containers/PersistButtonContainer";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

function LdapOrganizationEditorPanel({ ldapOrganizationData, setLdapOrganizationData, authorizedActions, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [ldapOrganizationDataDto, setLdapOrganizationDataDto] = useState({});
  const [ opseraUserList, setOpseraUsersList] = useState([]);
  const [ currentOpseraUser, setCurrentOpseraUser ] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try{
      setIsLoading(true);
      setLdapOrganizationDataDto(ldapOrganizationData);
      await loadOpseraUsers();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  // TODO: make select component
  const loadOpseraUsers = async () => {
    const response = await accountsActions.getUsers(getAccessToken);
    const users = response?.data?.data;
    let parsedUserNames = [];

    if (Array.isArray(users) && users.length > 0) {
      users.map(user => {
        if (ldapOrganizationData.getData("orgOwnerEmail") != null) {
          if (user["email"] === ldapOrganizationData.getData("orgOwnerEmail")) {
            setCurrentOpseraUser({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
          }
        }
        parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
      });
    }

    setOpseraUsersList(parsedUserNames);
  };

  const createOrganization = async () => {
    return await accountsActions.createOrganization(ldapOrganizationDataDto, getAccessToken);
  };

  const updateLdapOrganization = async () => {
    return await accountsActions.updateOrganization(ldapOrganizationDataDto, getAccessToken);
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    ldapOrganizationDataDto.setData("orgOwner", option["firstName"] + " " + option["lastName"]);
    ldapOrganizationDataDto.setData("orgOwnerEmail", option["email"]);
    setLdapOrganizationDataDto({...ldapOrganizationDataDto});
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("update_organization")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this organization"} />;
  }

    return (
      <EditorPanelContainer>
          <Row>
            <Col lg={12}>
              <div className="p-2">
                <label className="mt-0"><span>Opsera Customer Record<span className="danger-red">*</span></span></label>
                <DropdownList
                  data={opseraUserList}
                  valueField='value'
                  textField='text'
                  filter='contains'
                  groupBy={user => capitalizeFirstLetter(user.id.organizationName, "-", "No Organization Name")}
                  defaultValue={currentOpseraUser}
                  onChange={handleOpseraUserChange}
                />
              </div>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={!ldapOrganizationDataDto.isNew()} fieldName={"name"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase fieldName={"description"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase fieldName={"orgName"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"orgOwner"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"orgOwnerEmail"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"envCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"numberOfLicenses"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"objectCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"subscription"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
          </Row>
        <PersistButtonContainer
          handleClose={handleClose}
          recordDto={ldapOrganizationDataDto}
          setRecordDto={setLdapOrganizationDataDto}
          updateRecord={updateLdapOrganization}
          createRecord={createOrganization}
          addAnotherOption={false}
        />
      </EditorPanelContainer>
    );
}

LdapOrganizationEditorPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  setLdapOrganizationData: PropTypes.func,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapOrganizationEditorPanel;


