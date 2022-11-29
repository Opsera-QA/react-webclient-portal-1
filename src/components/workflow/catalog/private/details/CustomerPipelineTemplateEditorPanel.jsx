import React, {useContext} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineTemplateActions from "components/admin/pipeline_templates/pipelineTemplate.actions";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineTypeMultiSelectInput
  from "components/common/list_of_values_input/admin/pipeline_templates/PipelineTypeMultiSelectInput";
import TagManager from "components/common/inputs/tags/TagManager";

function CustomerPipelineTemplateEditorPanel(
  {
    pipelineTemplateModel,
    setPipelineTemplateModel,
    handleClose,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const {cancelTokenSource} = useComponentStateReference();

  const updateTemplate = async () => {
    return await pipelineTemplateActions.updateTemplateV2(
      getAccessToken,
      cancelTokenSource,
      pipelineTemplateModel
    );
  };

  if (pipelineTemplateModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      updateRecord={updateTemplate}
      recordDto={pipelineTemplateModel}
      handleClose={handleClose}
      setRecordDto={setPipelineTemplateModel}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={pipelineTemplateModel}
            setDataObject={setPipelineTemplateModel}
          />
        </Col>
        <Col lg={6}>
          <PipelineTypeMultiSelectInput
            dataObject={pipelineTemplateModel}
            setDataObject={setPipelineTemplateModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={pipelineTemplateModel}
            setDataObject={setPipelineTemplateModel}
          />
        </Col>
        <Col lg={12}>
          <TagManager
            type={"template"}
            dataObject={pipelineTemplateModel}
            setDataObject={setPipelineTemplateModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

CustomerPipelineTemplateEditorPanel.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  setPipelineTemplateModel: PropTypes.func,
  handleClose: PropTypes.func
};

export default CustomerPipelineTemplateEditorPanel;


