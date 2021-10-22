import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import azureAksClusterTaskConfigurationMetadata from "./azure-cluster-metadata";
import AzureClusterAzureToolSelectInput from "components/tasks/details/tasks/azure-cluster-creation/inputs/AzureClusterAzureToolSelectInput";
import AzureCredentialIdSelectInput from "./inputs/AzureCredentialIdSelectInput";
import AzureRegionSelectInput from "./inputs/AzureRegionSelectInput";
import AzureMachineTypeSelectInput from "./inputs/AzureMachineTypeSelectInput";
import AzureKubeVersionsSelectInput from "./inputs/AzureKubeVersionsSelectInput";

function AzureClusterConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  const [azureConfig, setAzureConfig] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      gitTasksDataDto.getData("configuration"),
      azureAksClusterTaskConfigurationMetadata
    );
    setGitTasksConfigurationData({ ...configurationData });
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <AzureClusterAzureToolSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          setAzureConfig={setAzureConfig}
        />
      </Col>
      <Col lg={12}>
        <AzureCredentialIdSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          azureConfig={azureConfig}
          setApplicationData={setApplicationData}
        />
      </Col>
      <Col lg={12}>
        <AzureRegionSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          azureToolConfigId={gitTasksConfigurationData?.getData("azureToolConfigId")}
          azureApplication={gitTasksConfigurationData?.getData("azureCredentialId")}
          azureConfig={azureConfig}
          applicationData={applicationData}
        />
      </Col>
      <Col lg={12}>
        <AzureMachineTypeSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          azureToolConfigId={gitTasksConfigurationData?.getData("azureToolConfigId")}
          azureApplication={gitTasksConfigurationData?.getData("azureCredentialId")}
          azureConfig={azureConfig}
          applicationData={applicationData}
          region={gitTasksConfigurationData?.getData("region")}
        />
      </Col>
      <Col lg={12}>
        <AzureKubeVersionsSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          azureToolConfigId={gitTasksConfigurationData?.getData("azureToolConfigId")}
          azureApplication={gitTasksConfigurationData?.getData("azureCredentialId")}
          azureConfig={azureConfig}
          applicationData={applicationData}
          region={gitTasksConfigurationData?.getData("region")}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"clustername"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"disk_size_gb"}
          />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"node_min_count"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"node_max_count"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"vpcCIDRblock"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"subnetCIDRblock"}
        />
      </Col>
    </Row>
  );
}

AzureClusterConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default AzureClusterConfigurationPanel;
