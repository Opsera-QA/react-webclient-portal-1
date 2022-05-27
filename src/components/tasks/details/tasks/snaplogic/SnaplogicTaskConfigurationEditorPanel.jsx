import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import snaplogicTaskConfigurationMetadata from "./snaplogicTaskConfigurationMetadata";
import SnaplogicToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicToolSelectInput";
import SnaplogicScmToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicScmToolTypeSelectInput";
import SnaplogicScmToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicScmToolSelectInput";
import SnaplogicScmRepositorySelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicScmRepositorySelectInput";
import SnaplogicScmBranchSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicScmBranchSelectInput";
import SnaplogicProjectSpaceSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicProjectSpaceSelectInput";
import SnaplogicProjectSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/snaplogic/inputs/SnaplogicProjectSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SnaplogicTaskConfigurationEditorPanel({ taskModel, taskConfigurationModel, setTaskConfigurationModel }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(taskModel.getData("configuration"), snaplogicTaskConfigurationMetadata);
    setTaskConfigurationModel({...configurationData});
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getSourceSelection = () => {
    return (
      <>
        <Col lg={12}>
            <SnaplogicScmToolTypeSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
            />
        </Col>
        <Col lg={12}>
            <SnaplogicScmToolSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
            />
        </Col>
        <Col lg={12}>
            <SnaplogicScmRepositorySelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
            />
        </Col>
        <Col lg={12}>
            <SnaplogicScmBranchSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
                disableBranch={taskConfigurationModel.getData("targetBranch")}
            />
        </Col>
        <Col lg={12}>
            <SnaplogicScmBranchSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
                fieldName={"targetBranch"}
                disableBranch={taskConfigurationModel.getData("gitBranch")}
            />
        </Col>
      </>
    );
  };

  const getProjectFields = () => {

    if(taskConfigurationModel.getData("toolConfigId") == null || 
    taskConfigurationModel.getData("toolConfigId") == undefined || 
        taskConfigurationModel.getData("toolConfigId") === "") {
      return null;
    }

    return (
      <>
        <Col lg={12}>
           <SnaplogicProjectSpaceSelectInput
            model={taskConfigurationModel}
            setModel={setTaskConfigurationModel}
            />
        </Col>
        <Col lg={12}>
            <SnaplogicProjectSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
                toolConfigId={taskConfigurationModel.getData("toolConfigId")}
                projectSpace={taskConfigurationModel.getData("projectSpace")}
            />
        </Col>
      </>
    );
  };

  const getValidationFields = () => {

    if(!taskConfigurationModel.getData("iValidatorScan")) {
      return null;
    }

    return (
      <>
        <Col lg={12}>
            <TextInputBase 
                dataObject={taskConfigurationModel}
                setDataObject={setTaskConfigurationModel}
                fieldName={"validationURL"}
            />
        </Col>
        <Col lg={12}>
          <VaultTextInput
            dataObject={taskConfigurationModel}
            setDataObject={setTaskConfigurationModel}
            fieldName={"validationToken"}
          />
        </Col> 
      </>
    );
  };

  return (
    <Row>
        <Col lg={12}>
        <SnaplogicToolSelectInput
                model={taskConfigurationModel}
                setModel={setTaskConfigurationModel}
            /> 
        </Col>
        {getSourceSelection()}
        {getProjectFields()}
        <Col lg={12}>
            <BooleanToggleInput
                dataObject={taskConfigurationModel}
                setDataObject={setTaskConfigurationModel}
                fieldName={"iValidatorScan"}
            />
        </Col>
        {getValidationFields()}
    </Row>
  );
}

SnaplogicTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SnaplogicTaskConfigurationEditorPanel;


