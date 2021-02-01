import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DropdownList from "react-widgets/lib/DropdownList";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import IdpVendorSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_idp_accounts/IdpVendorSelectInput";

function LdapOrganizationAccountEditorPanel({ldapOrganizationAccountData, ldapOrganization, setLdapOrganizationAccountData, authorizedActions, handleClose}) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapOrganizationAccountDataDto, setLdapOrganizationAccountDataDto] = useState({});
  const [opseraUserList, setOpseraUsersList] = useState([]);
  const [currentOpseraUser, setCurrentOpseraUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await unpackLdapOrganizationAccountData();
    setIsLoading(false);
  };

  const unpackLdapOrganizationAccountData = async () => {
    let ldapOrganizationAccountDataDto = ldapOrganizationAccountData;
    if (ldapOrganizationAccountDataDto.isNew() && ldapOrganization != null) {
      let orgDomain = ldapOrganization.orgOwnerEmail.substring(ldapOrganization.orgOwnerEmail.lastIndexOf("@") + 1);
      ldapOrganizationAccountDataDto.setData("orgDomain", orgDomain);
      ldapOrganizationAccountDataDto.setData("name", ldapOrganization["name"] + "-acc");
      ldapOrganizationAccountDataDto.setData("org", ldapOrganization["name"] != null ? ldapOrganization["name"] : "");
    }

    setLdapOrganizationAccountDataDto(ldapOrganizationAccountDataDto);
    await loadOpseraUsers(ldapOrganizationAccountDataDto);
  };


  // TODO: Pull into general helper
  const loadOpseraUsers = async (ldapOrganizationAccountDataDto) => {
    const response = await accountsActions.getUsers(getAccessToken);
    const users = response?.data?.data;
    let parsedUserNames = [];

    if (Array.isArray(users) && users.length > 0) {
      users.map(user => {
        let orgDomain = user.email.substring(user.email.lastIndexOf("@") + 1);
        if (ldapOrganizationAccountData.isNew() || ldapOrganizationAccountDataDto["orgDomain"].includes(orgDomain)) {
          if (ldapOrganizationAccountData.getData("orgOwnerEmail") != null) {
            if (user["email"] === ldapOrganizationAccountDataDto.getData("orgOwnerEmail")) {
              setCurrentOpseraUser({
                text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user
              });
            }
          }
          parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
        }
      });
    }
    // console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
    setOpseraUsersList(parsedUserNames);
  };

  const updateLdapOrganizationAccount = async () => {
    return await accountsActions.updateOrganizationAccount(ldapOrganizationAccountDataDto, getAccessToken);
  };

  const createOrganizationAccount = async () => {
    return await accountsActions.createOrganizationAccount(ldapOrganizationAccountDataDto, getAccessToken);
  };

  const addAdmin = (user) => {
    let newAdmin = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.email,
      departmentName: user.organizationName,
      preferredName: "",
      division: "",
      teams: ["team1"],
      title: "",
      site: "Site1"
    };

    ldapOrganizationAccountDataDto.setData("administrator", {...newAdmin});
    setLdapOrganizationAccountDataDto({...ldapOrganizationAccountDataDto});
  };

  const handleOpseraUserChange = (selectedOption) => {
    let option = selectedOption.id;
    setCurrentOpseraUser(option);
    ldapOrganizationAccountDataDto.setData("orgOwner", option["firstName"] + " " + option["lastName"]);
    ldapOrganizationAccountDataDto.setData("orgOwnerEmail", option["email"]);
    setLdapOrganizationAccountDataDto({...ldapOrganizationAccountDataDto});
    addAdmin(option);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("update_organization_account")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this organization account"} />;
  }

    return (
      <EditorPanelContainer
        createRecord={createOrganizationAccount}
        updateRecord={updateLdapOrganizationAccount}
        setRecordDto={setLdapOrganizationAccountDataDto}
        recordDto={ldapOrganizationAccountDataDto}
        handleClose={handleClose}
      >
          <Row>
            <Col>
              <div className="custom-select-input m-2">
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
          </Row>
          <Row>
            <Col lg={12}>
              <TextInputBase disabled={!ldapOrganizationAccountDataDto.isNew()} fieldName={"orgOwner"}
                            dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"orgOwnerEmail"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={!ldapOrganizationAccountDataDto.isNew()} fieldName={"orgDomain"}
                            dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={!ldapOrganizationAccountDataDto.isNew()} fieldName={"name"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase fieldName={"accountName"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase fieldName={"description"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"configEntryType"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <IdpVendorSelectInput fieldName={"idpVendor"} dataObject={ldapOrganizationAccountDataDto} setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase fieldName={"entityID"} dataObject={ldapOrganizationAccountDataDto} setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"idpPostURL"} dataObject={ldapOrganizationAccountDataDto}
                            setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            {/*<Col>*/}
            {/*  <ItemInput field={fields.idpReturnAttributes} setData={setFormField}*/}
            {/*             formData={formData}/>*/}
            {/*</Col>*/}
            <Col lg={12}>
              <BooleanToggleInput disabled={true} fieldName={"isMultipleIDP"} dataObject={ldapOrganizationAccountDataDto}
                              setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <BooleanToggleInput disabled={true} fieldName={"localAuth"} dataObject={ldapOrganizationAccountDataDto}
                              setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <BooleanToggleInput disabled={true} fieldName={"samlEnabled"} dataObject={ldapOrganizationAccountDataDto}
                              setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <BooleanToggleInput disabled={true} fieldName={"oAuthEnabled"} dataObject={ldapOrganizationAccountDataDto}
                              setDataObject={setLdapOrganizationAccountDataDto}/>
            </Col>
          </Row>
      </EditorPanelContainer>
    );
}

LdapOrganizationAccountEditorPanel.propTypes = {
  ldapOrganization: PropTypes.object,
  ldapOrganizationAccountData: PropTypes.object,
  setLdapOrganizationAccountData: PropTypes.func,
  authorizedActions: PropTypes.array,
  handleClose: PropTypes.func
};

export default LdapOrganizationAccountEditorPanel;


