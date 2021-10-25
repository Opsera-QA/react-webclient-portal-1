import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import ec2ClusterCreationTaskConfigurationMetadata from "./ecs-creation-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import ClusterTemplateSelectInput from "./inputs/ClusterTemplateSelectInput";
import NetworkingOnlySubForm from "./sub_forms/NetworkingOnlySubForm";
import EC2SubForm from "./sub_forms/EC2SubForm";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";


function EC2ClusterCreationTaskConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), ec2ClusterCreationTaskConfigurationMetadata);
    setGitTasksConfigurationData({...configurationData});
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicFields = () => {
    if(gitTasksConfigurationData?.getData("clusterTemplate") && gitTasksConfigurationData?.getData("clusterTemplate") === "fargate"){
      return (
        <Col lg={12}>
          <NetworkingOnlySubForm dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData}/>
        </Col>
      );
    }
    if(gitTasksConfigurationData?.getData("clusterTemplate") && gitTasksConfigurationData?.getData("clusterTemplate") === "ec2"){
      return (
        <Col lg={12}>
          <EC2SubForm dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData}/>
        </Col>
      );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <RoleRestrictedAwsAccountToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"awsToolId"}
        />
      </Col>
      <Col lg={12}>
        <ClusterTemplateSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"clusterTemplate"} disabled={gitTasksDataDto.getData("configuration")?.stackId && gitTasksDataDto.getData("configuration")?.stackId.length > 0}/>
      </Col>
      <Col lg={12}>
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"clusterName"} />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

EC2ClusterCreationTaskConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default EC2ClusterCreationTaskConfigurationPanel;


