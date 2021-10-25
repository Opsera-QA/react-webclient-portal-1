import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import IAMRoleSelectInput from "./inputs/IAMRoleSelectInput";
import awsLambdaFunctionTaskConfigurationMetadata from "./aws-lambda-metadata";
import LanguageSelectInput from "./inputs/LanguageSelectInput";
import OctopusProjectNameInput
  from "../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/input/OctopusProjectNameInput";
import FunctionNameWithButton from "./inputs/FunctionNameWithButton";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";

function AwsLambdaConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      gitTasksDataDto.getData("configuration"),
      awsLambdaFunctionTaskConfigurationMetadata
    );
    setGitTasksConfigurationData({ ...configurationData });
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <RoleRestrictedAwsAccountToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"awsToolConfigId"}
        />
      </Col>
      <Col lg={12}>
        <FunctionNameWithButton
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          stepTool={gitTasksDataDto?.data}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"handler"}
        />
      </Col>
      <Col lg={12}>
        <IAMRoleSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("awsToolConfigId").length === 0}
          toolConfigId={gitTasksConfigurationData?.getData("awsToolConfigId")}
        />
      </Col>
      <Col lg={12}>
        <LanguageSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("awsToolConfigId").length === 0}
          toolConfigId={gitTasksConfigurationData?.getData("awsToolConfigId")}
        />
      </Col>
    </Row>
  );
}

AwsLambdaConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default AwsLambdaConfigurationPanel;
