import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import templateActions from "../template-actions";
import PropTypes from "prop-types";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import DtoJsonInput from "../../../common/input/dto_input/dto-json-input";
import {
  getOrganizationAccountDropdownList,
} from "../../accounts/ldap/organizations/organization-functions";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoMultiselectInput from "../../../common/input/dto_input/dto-multiselect-input";
import DtoTagManagerInput from "../../../common/input/dto_input/dto-tag-manager-input";
import LoadingDialog from "../../../common/status_notifications/loading";
import SaveButton from "../../../common/buttons/SaveButton";
import pipelineHelpers from "../../../workflow/pipelineHelpers";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailPanelContainer from "../../../common/panels/detail_panel_container/DetailPanelContainer";
import BooleanToggleInput from "../../../common/inputs/BooleanToggleInput";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";

function TemplateEditorPanel({ templateData, setTemplateData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [templateDataDto, setTemplateDataDto] = useState({});
  const [ldapOrganizationAccountList, setLdapOrganizationAccountList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Pull roles from node
  const [roleOptions, setRoleOptions] = useState(["everyone", "Free Trial", "Administrators", "PowerUsers"]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getLdapOrganizationAccounts();
      setTemplateDataDto(templateData);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getLdapOrganizationAccounts = async () => {
    let ldapOrganizationAccountList = await getOrganizationAccountDropdownList("name", getAccessToken);
    setLdapOrganizationAccountList(ldapOrganizationAccountList);
  };

  const createTemplate = async () => {
    return await templateActions.createTemplate(templateDataDto, getAccessToken);
  };

  const updateTemplate = async () => {
    return await templateActions.updateTemplate(templateDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

    return (
      <EditorPanelContainer>
          <Row>
            <Col lg={6}>
              <DtoTextInput fieldName={"name"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={6}>
              <DtoToggleInput fieldName={"active"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={12}>
              <DtoTextInput fieldName={"description"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>

            <Col lg={6}>
              <DtoMultiselectInput textField={"name"}
                              valueField={"id"}
                              fieldName={"type"}
                              dataObject={templateDataDto}
                              setDataObject={setTemplateDataDto}
                              selectOptions={pipelineHelpers.PIPELINE_TYPES}/>
            </Col>
            <Col lg={6}>
              <DtoTagManagerInput type={"template"} fieldName={"tags"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>

            <Col lg={6}>
              <DtoMultiselectInput fieldName={"roles"} dataObject={templateDataDto} setDataObject={setTemplateDataDto} selectOptions={roleOptions} setSelectOptions={setRoleOptions} />
            </Col>
            <Col lg={6}>
              <DtoSelectInput valueField={"id"} fieldName={"account"} dataObject={templateDataDto} setDataObject={setTemplateDataDto} selectOptions={ldapOrganizationAccountList}/>
            </Col>
            <Col lg={6}>
              <BooleanToggleInput fieldName={"readOnly"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
            <Col lg={6}>
              <BooleanToggleInput fieldName={"singleUse"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>

            <Col lg={12}>
              <DtoJsonInput fieldName={"plan"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
            </Col>
          </Row>
          <Row>
            <div className="ml-auto m-3 px-3">
              <SaveButton updateRecord={updateTemplate} setData={setTemplateData} setRecordDto={setTemplateDataDto} handleClose={handleClose} createRecord={createTemplate} recordDto={templateDataDto} />
            </div>
          </Row>
      </EditorPanelContainer>
    );
}

TemplateEditorPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
  handleClose: PropTypes.func
};

export default TemplateEditorPanel;


