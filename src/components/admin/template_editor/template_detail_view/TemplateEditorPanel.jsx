import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import Model, {DataState} from "../../../../core/data_model/model";
import {getFormValidationErrorDialog, getPersistResultDialog} from "../../../common/toasts/toasts";
import templateActions from "../template-actions";
import Loading from "../../../common/status_notifications/loading";
import PropTypes from "prop-types";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoItemInput from "../../../common/input/dto_input/item-displayer/dto-item-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoJsonInput from "../../../common/input/dto_input/dto-json-input";
import {
  getOrganizationDropdownList,
} from "../../../accounts/ldap_organizations/organization-functions";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoMultiselectInput from "../../../common/input/dto_input/dto-multiselect-input";

function TemplateEditorPanel({ templateData, setTemplateData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [templateDataDto, setTemplateDataDto] = useState({});
  const [ldapOrganizationAccountList, setLdapOrganizationAccountList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});
  const [roleOptions, setRoleOptions] = useState(["everyone", "Free Trial", "Administrators", "PowerUsers"]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getLdapOrganizationAccounts();
    setTemplateDataDto(templateData);
    setIsLoading(false);
  };

  const getLdapOrganizationAccounts = async () => {
    let ldapOrganizationAccountList = await getOrganizationDropdownList("name", getAccessToken);
    setLdapOrganizationAccountList(ldapOrganizationAccountList);
  };

  const updateTemplate = async () => {
    if(templateDataDto.isModelValid()) {
      try {
        console.log("Attempting to update: " + JSON.stringify(templateDataDto.data));
        let response = await templateActions.updateTemplate(templateDataDto, getAccessToken);
        // getToolRegistryItem(toolId);
        console.log("response: " + JSON.stringify(response));
        let updatedDto = new Model(response.data, templateDataDto.metaData, false);
        setTemplateDataDto(updatedDto);
        setTemplateData(updatedDto);
        let toast = getPersistResultDialog(true, "update", "Template", undefined, setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const createTemplate = async () => {
    if(templateDataDto.isModelValid()) {
      try {
        console.log("Attempting to update: " + JSON.stringify(templateDataDto.data));
        let response = await templateActions.createTemplate(templateDataDto, getAccessToken);
        // getToolRegistryItem(toolId);
        console.log("response: " + JSON.stringify(response));
        let updatedDto = new Model(response.data, templateDataDto.metaData, false);
        setTemplateDataDto(updatedDto);
        setTemplateData(updatedDto);
        handleClose();
      }
      catch (err) {
        console.log(err.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };
  
  return (
    <>
      {isLoading ? <Loading size="sm"/> : null}

      {!isLoading && <>
        <div className="mx-2 my-3">
          {showToast && toast}
          <Row>
            <Col lg={6}>
              <DtoTextInput disabled={!templateDataDto.isNew()} fieldName={"name"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoToggleInput fieldName={"active"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoTextInput fieldName={"description"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoSelectInput valueField={"id"} fieldName={"account"} dataObject={templateDataDto} setDataObject={setTemplateDataDto} selectOptions={ldapOrganizationAccountList}/>
            </Col>
            <Col lg={6}>
              <DtoItemInput fieldName={"type"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoMultiselectInput fieldName={"roles"} dataObject={templateDataDto} setDataObject={setTemplateDataDto} selectOptions={roleOptions} setSelectOptions={setRoleOptions} />
            </Col>
            <Col lg={6}>
              <DtoItemInput fieldName={"tags"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoJsonInput fieldName={"plan"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto m-3 px-3">
              {templateDataDto.isNew()
                ? <Button size="sm" variant="primary" onClick={() => createTemplate()}>Create Template</Button>
                : <Button size="sm" variant="primary" disabled={templateDataDto.dataState === DataState.LOADED}
                          onClick={() => updateTemplate()}>Save</Button>
              }
            </div>
          </Row>
        </div>
      </>}
    </>
  );
}

TemplateEditorPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
  handleClose: PropTypes.func
};

export default TemplateEditorPanel;


