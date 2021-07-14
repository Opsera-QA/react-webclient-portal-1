import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AwsToolSelectInput from "./inputs/AwsToolSelectInput";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import IAMRoleSelectInput from "./inputs/IAMRoleSelectInput";
import awsLambdaFunctionTaskConfigurationMetadata from "./aws-lambda-metadata";
import LanguageSelectInput from "./inputs/LanguageSelectInput";

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
        <AwsToolSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"toolId"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"functionName"}
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
          disabled={gitTasksConfigurationData?.getData("toolId").length === 0}
          toolConfigId={gitTasksConfigurationData?.getData("toolId")}
        />
      </Col>
      <Col lg={12}>
        <LanguageSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("toolId").length === 0}
          toolConfigId={gitTasksConfigurationData?.getData("toolId")}
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
