import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import accountsActions from "../../../accounts-actions";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import {capitalizeFirstLetter} from "../../../../../common/helpers/string-helpers";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import SaveButton from "../../../../../common/buttons/SaveButton";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import WarningDialog from "../../../../../common/status_notifications/WarningDialog";

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
      await loadOpseraUsers();
      setLdapOrganizationDataDto(ldapOrganizationData)
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadOpseraUsers = async () => {
    const response = await accountsActions.getUsers(getAccessToken);
    let parsedUserNames = [];
    Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
      if (ldapOrganizationData.getData("orgOwnerEmail") != null) {
        if (user["email"] === ldapOrganizationData.getData("orgOwnerEmail")) {
          setCurrentOpseraUser({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
        }
      }
      parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
    });
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
      <>
        <div className="scroll-y full-height">
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
              <DtoTextInput disabled={!ldapOrganizationDataDto.isNew()} fieldName={"name"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"description"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"orgName"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"orgOwner"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"orgOwnerEmail"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"envCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"numberOfLicenses"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"objectCount"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput disabled={true} fieldName={"subscription"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={ldapOrganizationDataDto} setRecordDto={setLdapOrganizationDataDto} setData={setLdapOrganizationData} createRecord={createOrganization} updateRecord={updateLdapOrganization} handleClose={handleClose}/>
            </div>
          </Row>
        </div>
      </>
    );
}

LdapOrganizationEditorPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  setLdapOrganizationData: PropTypes.func,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapOrganizationEditorPanel;


