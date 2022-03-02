import React, {useState, useEffect, useContext} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {ldapOrganizationMetaData} from "components/admin/accounts/ldap/organizations/ldap-organizations-metadata";
import {ldapIdpAccountsMetaData} from "../idp_accounts/ldap-idp-account-metadata";
import {
  ldapOrganizationAccountMetaData
} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-metadata";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import accountsActions from "components/admin/accounts/accounts-actions";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import {AuthContext} from "contexts/AuthContext";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";

function LdapCustomerOnboardEditorPanel() {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapOrganizationDataDto, setLdapOrganizationDataDto] = useState(undefined);
  const [ldapOrganizationAccountDataDto, setLdapOrganizationAccountDataDto] = useState(undefined);
  const [ldapIdpAccountDataDto, setLdapIdpAccountDataDto] = useState({});

  const [error, setErrors] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [usersFormData, setUsersFormData] = useState({users: []});
  // eslint-disable-next-line no-unused-vars
  const [opseraUserList, setOpseraUsersList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentOpseraUser, setCurrentOpseraUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapOrganizationDataDto(new Model({...ldapOrganizationMetaData.newObjectFields}, ldapOrganizationMetaData, true));
    setLdapOrganizationAccountDataDto(new Model({...ldapOrganizationAccountMetaData.newObjectFields}, ldapOrganizationAccountMetaData, true));
    setLdapIdpAccountDataDto(new Model({...ldapIdpAccountsMetaData.newObjectFields}, ldapIdpAccountsMetaData, true));
    // await loadOpseraUsers();
    // await unpackLdapUserData(ldapUserData);
    setIsLoading(false);
  };

  // TODO: Implement if we use this for updates
  // eslint-disable-next-line no-unused-vars
  const unpackLdapUserData = async (ldapUserData) => {
    console.log("ldapUserData in unpackLdapUserData: " + JSON.stringify(ldapUserData));
    // if (ldapUserData != null) {
    //   setFormField("key", ldapUserData["key"] != null ? ldapUserData["key"] : "");
    //   setFormField("value", ldapUserData["value"] != null ? ldapUserData["value"] : "");
    //   setFormField("configuration", ldapUserData["configuration"] != null ? ldapUserData["configuration"] : {});
    //   setFormField("active", ldapUserData["active"] != null ? ldapUserData["active"] : false);
    // }
    // setIsLoading(false);
  };


  // TODO: Wire up new route after registered users changes are merged in
  // const loadOpseraUsers = async () => {
  //   const response = await accountsActions.getUsersV2(getAccessToken);
  //   // console.log("Opsera Users: \n" + JSON.stringify(response.data));
  //
  //   let parsedUserNames = [];
  //   Object.keys(response.data["users"]).length > 0 && response.data["users"].map(user => {
  //     parsedUserNames.push({text: (user["firstName"] + " " + user["lastName"]) + ": " + user["email"], id: user});
  //   });
  //   console.log("Parsed Organization Names: " + JSON.stringify(parsedUserNames));
  //   setOpseraUsersList(parsedUserNames);
  // };

  // eslint-disable-next-line no-unused-vars
  const addAdmin = (user) => {
    // let currentUsers = formData["users"];
    //
    let newAdmin = {
      name: user.accountName,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      departmentName: user.organizationName,
      administrator: true,
      preferredName: "",
      division: "",
      teams: [],
      title: "",
      site: ""
    };
    //
    // if (currentUsers[0] != null && currentUsers[0].administrator === true) {
    //   currentUsers[0] = newUser;
    // } else {
    //   currentUsers.unshift(newUser);
    // }
    ldapOrganizationAccountDataDto.setData("administrator", newAdmin);

    console.log("administrator: " + JSON.stringify(ldapOrganizationAccountDataDto.getData("administrator")));
    // setFormData({...formData, users: currentUsers});
    // console.log("Current Users: " + JSON.stringify(currentUsers));
  };

  //TODO: Check fields
  const isFormValid = true;

  const createLdap = async () => {
    let completeAccount = {organization: ldapOrganizationDataDto.getPersistData(), orgAccount: ldapOrganizationAccountDataDto.getPersistData(), users: usersFormData.users, idpAccount: ldapIdpAccountDataDto.getPersistData()};


    console.log("Persisting new account to DB: " + JSON.stringify(completeAccount));

    if (isFormValid) {
      let createLdapAccountResponse = await accountsActions.create(completeAccount, getAccessToken);
      console.log("createLdapAccountResponse: ", JSON.stringify(createLdapAccountResponse));

      if (createLdapAccountResponse.error != null) {
        const errorMsg = `Microservice error reported creating the organization for : ${completeAccount.accountName}.  Error returned: ${JSON.stringify(createLdapAccountResponse.error.message, null, 2)}`;
        console.log(errorMsg);
        setErrors(errorMsg);
      }
      else {
        setHasSaved(true);
      }
    }
  };

  // TODO: Implement if needed
  // eslint-disable-next-line no-unused-vars
  const updateLdapAccount = async (newLdapUserData) => {
    //   if(isFormValid) {
    //     try {
    //       console.log("Persisting values in ChangeMap : " + JSON.stringify(changeMap));
    //       // TODO: Should this be 'Name'?
    //       const response = await accountsActions.update(newLdapUserData._id, changeMap, getAccessToken);
    //       console.log("Response data: " + JSON.stringify(response.data));
    //       setLdapUserData({ ...response.data });
    //       setChangeMap({});
    //     }
    //     catch (err) {
    //       console.log(err.message);
    //     }
    //   }
    //
  };

  // TODO: Wire up setters inside opseraUser select input tailored to this form
  // const handleOpseraUserChange = (selectedOption) => {
  //   let option = selectedOption.id;
  //   console.log("Setting opsera account to: " + JSON.stringify(selectedOption));
  //   console.log("option.organizationName: " + option["organizationName"]);
  //   console.log("Opsera User Selected: " + JSON.stringify(option));
  //   setOrganizationFormField("orgName", option["organizationName"]);
  //   setOrganizationFormField("orgOwner", option["firstName"] + " " + option["lastName"]);
  //   setOrganizationFormField("orgOwnerEmail", option["email"]);
  //   setOrganizationAccountFormField("orgDomain", option["domain"]);
  //   setOrganizationAccountFormField("org", option["organizationName"]);
  //   // setFormField("opseraId", option._id);
  //   addAdmin(option);
  //   setCurrentOpseraUser(option);
  // };

  // TODO: Wire up toasts
  // eslint-disable-next-line no-unused-vars
  const getError = () => {
    if (error && error.length > 0) {
      return (<div className="pb-2 error-text">WARNING! An error has occurred saving your configuration: {error}</div>);
    }
  };

  // TODO: Find way to wire with actual editors instead of copying them here
  const getOrganizationFields = () => {
    return (
      <div>
        <div className="content-container content-card-1 max-content-width m-3">
          <div className="pl-2 content-block-header title-text-header-1">
            Organization
          </div>
          <EditorPanelContainer
            disable={true}
            recordDto={ldapOrganizationDataDto}
            setRecordDto={setLdapOrganizationDataDto}
            // updateRecord={updateLdapOrganization}
            // createRecord={createOrganization}
            addAnotherOption={false}
          >
            <Row>
              <Col lg={12}>
                <div className="p-2">
                  <label className="mt-0"><span>Opsera Customer Record<span className="danger-red">*</span></span></label>
                  <StandaloneSelectInput
                    selectOptions={opseraUserList}
                    valueField='value'
                    textField='text'
                    disabled={true}
                    groupBy={user => capitalizeFirstLetter(user.id.organizationName, "-", "No Organization Name")}
                    // defaultValue={currentOpseraUser}
                    // onChange={handleOpseraUserChange}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={!ldapOrganizationDataDto.isNew() || true} fieldName={"name"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"description"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"orgName"} dataObject={ldapOrganizationDataDto} setDataObject={setLdapOrganizationDataDto}/>
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
          </EditorPanelContainer>
          <div className="content-block-footer"/>
        </div>
      </div>
    );
  };

  const getOrganizationAccountFields = () => {
    return (
      <div>
        <div className="content-container content-card-1 max-content-width m-3">
          <div className="pl-2 content-block-header title-text-header-1">
            Organization Account
          </div>
          <EditorPanelContainer
            // createRecord={createOrganizationAccount}
            // updateRecord={updateLdapOrganizationAccount}
            setRecordDto={setLdapOrganizationAccountDataDto}
            recordDto={ldapOrganizationAccountDataDto}
            disable={true}
            addAnotherOption={false}
          >
            <Row>
              <Col>
                <div className="custom-select-input m-2">
                  <label className="mt-0"><span>Opsera Customer Record<span
                    className="danger-red">*</span></span></label>
                  <StandaloneSelectInput
                    selectOptions={opseraUserList}
                    valueField='value'
                    textField='text'
                    filter='contains'
                    disabled={true}
                    groupBy={user => capitalizeFirstLetter(user.id.organizationName, "-", "No Organization Name")}
                    defaultValue={currentOpseraUser}
                    // onChange={handleOpseraUserChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <TextInputBase disabled={true || !ldapOrganizationAccountDataDto.isNew()} fieldName={"orgOwner"}
                               dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"orgOwnerEmail"} dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true || !ldapOrganizationAccountDataDto.isNew()} fieldName={"orgDomain"}
                               dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true || !ldapOrganizationAccountDataDto.isNew()} fieldName={"name"}
                               dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"accountName"} dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"description"} dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"configEntryType"} dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"entityID"} dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"idpPostURL"} dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <TextInputBase disabled={true} fieldName={"idpVendor"} dataObject={ldapOrganizationAccountDataDto}
                               setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              {/*<Col>*/}
              {/*  <ItemInput field={fields.idpReturnAttributes} setData={setFormField}*/}
              {/*             formData={formData}/>*/}
              {/*</Col>*/}
              <Col lg={12}>
                <BooleanToggleInput disabled={true} fieldName={"isMultipleIDP"}
                                    dataObject={ldapOrganizationAccountDataDto}
                                    setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <BooleanToggleInput disabled={true} fieldName={"localAuth"} dataObject={ldapOrganizationAccountDataDto}
                                    setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <BooleanToggleInput disabled={true} fieldName={"samlEnabled"}
                                    dataObject={ldapOrganizationAccountDataDto}
                                    setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
              <Col lg={12}>
                <BooleanToggleInput disabled={true} fieldName={"oAuthEnabled"}
                                    dataObject={ldapOrganizationAccountDataDto}
                                    setDataObject={setLdapOrganizationAccountDataDto}/>
              </Col>
            </Row>
          </EditorPanelContainer>
          <div className="content-block-footer"/>
        </div>
      </div>
    );
  };

  const getUsersInput = () => {
    return (
      <div className="content-container content-card-1 max-content-width m-3">
        <div className="pl-2 content-block-header title-text-header-1">
          User Accounts
        </div>
        <div className="p-3">
          <Row>
            <Col>
              {/*<UserInput field={ ldapUsersMetadata.users } setData={setUsersFormField} formData={usersFormData}/>*/}
            </Col>
          </Row>
        </div>
        <div className="content-block-footer"/>
      </div>
    );
  };

  const getIdpAccountFields = () => {
    return (
      <div className="content-container content-card-1 max-content-width m-3">
        <div className="pl-2 content-block-header title-text-header-1">
          IDP Account
        </div>
        <EditorPanelContainer
          recordDto={ldapIdpAccountDataDto}
          setRecordDto={setLdapIdpAccountDataDto}
          // updateRecord={updateLdapIdpAccount}
          // createRecord={createIdpAccount}
          addAnotherOption={false}
          disable={ldapIdpAccountDataDto.isNew() || true}
        >
          <Row>
            <Col lg={12}>
              <TextInputBase disabled={true || !ldapIdpAccountDataDto.isNew()} fieldName={"name"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"domain"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"idpRedirectURI"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"clientID"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"issuer"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"baseUrl"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"idpVendor"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"configEntryType"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
            <Col lg={12}>
              <TextInputBase disabled={true} fieldName={"idpNameIDMapping"} dataObject={ldapIdpAccountDataDto} setDataObject={setLdapIdpAccountDataDto}/>
            </Col>
          </Row>
        </EditorPanelContainer>
        <div className="content-block-footer"/>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingDialog size={"sm"} message={"Loading Customer Onboard Editor"} />;
  }

  return (
    <div className="scroll-y hide-x-overflow full-height">
      {getOrganizationFields()}
      {getOrganizationAccountFields()}
      {getUsersInput()}
      {getIdpAccountFields()}
      <Row>
        <div className="ml-auto px-3">
          {/*{newLdapUser ?*/}
          <Button size="sm" disabled={true || isSaving || hasSaved} variant="primary" onClick={() => createLdap()}>Create
            Account</Button>
          {// : <Button size="sm" variant="primary" disabled={Object.keys(changeMap).length === 0}
            //           onClick={() => updateLdapAccount(ldapUserData)}>Save changes</Button>
          }
        </div>
        {isSaving &&
        <div className="text-center"><IconBase icon={faSpinner} spin className="ml-1" fixedWidth/>Saving is in
          progress</div>}
        {hasSaved && <div className="text-center">Your account has been created</div>}
      </Row>
    </div>
  );
}

LdapCustomerOnboardEditorPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  canDelete: PropTypes.bool,
  newLdapUser: PropTypes.bool,
  handleClose: PropTypes.func
};

export default LdapCustomerOnboardEditorPanel;


