import React, { useState, useEffect, useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import templateActions from "components/admin/template_editor/template-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PipelineTypeMultiSelectInput
  from "components/common/list_of_values_input/admin/pipeline_templates/PipelineTypeMultiSelectInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import LdapOrganizationAccountSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOrganizationAccountSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import JsonInput from "components/common/inputs/object/JsonInput";
import TagManager from "components/common/inputs/tags/TagManager";
import axios from "axios";

function TemplateEditorPanel({ templateData, setTemplateData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [templateDataDto, setTemplateDataDto] = useState({});
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
    setTemplateDataDto(templateData);
    setIsLoading(false);
  };

  const createTemplate = async (cancelToken = cancelTokenSource) => {
    return await templateActions.createTemplateV2(getAccessToken, cancelToken, templateDataDto);
  };

  const updateTemplate = async (cancelToken = cancelTokenSource) => {
    return await templateActions.updateTemplateV2(getAccessToken, cancelToken, templateDataDto);
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      createRecord={createTemplate}
      updateRecord={updateTemplate}
      recordDto={templateDataDto}
      handleClose={handleClose}
      setRecordDto={setTemplateDataDto}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase fieldName={"name"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
        </Col>
        <Col lg={6}>
          <ActivityToggleInput fieldName={"active"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase fieldName={"description"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
        </Col>
        <Col lg={6}>
          <PipelineTypeMultiSelectInput dataObject={templateDataDto} setDataObject={setTemplateDataDto} />
          <LdapOrganizationAccountSelectInput fieldName={"account"} dataObject={templateDataDto} setDataObject={setTemplateDataDto} />
        </Col>
        <Col lg={6} className="my-auto">
          <BooleanToggleInput fieldName={"readOnly"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
          <BooleanToggleInput fieldName={"singleUse"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
          <BooleanToggleInput fieldName={"publicUse"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
        </Col>
        <Col lg={6}>
          <JsonInput fieldName={"plan"} model={templateDataDto} setModel={setTemplateDataDto}/>
        </Col>
        <Col lg={6}>
          <TagManager type={"template"} dataObject={templateDataDto} setDataObject={setTemplateDataDto}/>
        </Col>
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


