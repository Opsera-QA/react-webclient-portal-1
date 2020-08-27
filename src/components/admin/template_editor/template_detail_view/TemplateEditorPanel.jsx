import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import Model, {DataState} from "../../../../core/data_model/model";
import {
  getCreateFailureResultDialog, getCreateSuccessResultDialog,
  getFormValidationErrorDialog,
  getUpdateFailureResultDialog, getUpdateSuccessResultDialog
} from "../../../common/toasts/toasts";
import templateActions from "../template-actions";
import PropTypes from "prop-types";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoJsonInput from "../../../common/input/dto_input/dto-json-input";
import {
  getOrganizationDropdownList,
} from "../../accounts/ldap/organizations/organization-functions";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoMultiselectInput from "../../../common/input/dto_input/dto-multiselect-input";
import DtoTagManagerInput from "../../../common/input/dto_input/dto-tag-manager-input";
import LoadingDialog from "../../../common/status_notifications/loading";
import SaveButton from "../../../common/buttons/SaveButton";
import pipelineHelpers from "../../../workflow/pipelineHelpers";

function TemplateEditorPanel({ templateData, setTemplateData }) {
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

  const createTemplate = async () => {
    if(templateDataDto.isModelValid()) {
      try {
        let response = await templateActions.createTemplate(templateDataDto, getAccessToken);
        let updatedDto = new Model(response.data, templateDataDto.metaData, false);
        setTemplateDataDto(updatedDto);
        setTemplateData(updatedDto);
        let toast = getCreateSuccessResultDialog(templateDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (error) {
        let toast = getCreateFailureResultDialog(templateDataDto.getType(), error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  const updateTemplate = async () => {
    if(templateDataDto.isModelValid()) {
      try {
        let response = await templateActions.updateTemplate(templateDataDto, getAccessToken);
        let updatedDto = new Model(response.data, templateDataDto.metaData, false);
        setTemplateDataDto(updatedDto);
        setTemplateData(updatedDto);
        let toast = getUpdateSuccessResultDialog(templateDataDto.getType(), setShowToast);
        setToast(toast);
        setShowToast(true);
      }
      catch (error) {
        let toast = getUpdateFailureResultDialog(templateDataDto.getType(), error.message, setShowToast);
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  // TODO: Remove and use multi-select once implemented for types.
  const updateSelectArray = async (fieldName, value) => {
    let newDataObject = templateDataDto;
    console.log(value.id)
    newDataObject.setData(fieldName, [value.id]);
    setTemplateDataDto({...newDataObject});
  }

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
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
              <DtoSelectInput textField={"name"}
                              valueField={"id"}
                              fieldName={"type"}
                              dataObject={templateDataDto}
                              setDataObject={setTemplateDataDto}
                              setDataFunction={updateSelectArray}
                              // valueFormatter={}
                              selectOptions={pipelineHelpers.PIPELINE_TYPES}/>
            </Col>
            <Col lg={6}>
              <DtoMultiselectInput fieldName={"roles"} dataObject={templateDataDto} setDataObject={setTemplateDataDto} selectOptions={roleOptions} setSelectOptions={setRoleOptions} />
            </Col>
            <Col lg={6}>
              <DtoTagManagerInput type={"template"} fieldName={"tags"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoJsonInput fieldName={"plan"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto m-3 px-3">
              <SaveButton updateRecord={updateTemplate} createRecord={createTemplate} recordDto={templateDataDto} />
            </div>
          </Row>
        </div>
      </>
    );
  }
}

TemplateEditorPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
};

export default TemplateEditorPanel;


