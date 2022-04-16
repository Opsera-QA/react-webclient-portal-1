import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import sfdxCertGenTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AgentLabelsSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import SalesforceOrganizationSyncTaskJenkinsToolSelectInput
  from "components/tasks/details/tasks/sfdc-org-sync/inputs/SalesforceOrganizationSyncTaskJenkinsToolSelectInput";

function MergeSyncTaskConfigurationPanel({ gitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {

  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(gitTasksDataDto.getData("configuration"), sfdxCertGenTaskConfigurationMetadata);
    setGitTasksConfigurationData({...configurationData});
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicFields = () => {
    if(gitTasksConfigurationData.getData("autoScaleEnable") === true){
      return (
        <Col lg={12}>
          <AgentLabelsSelectInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"agentLabels"} />
        </Col>
      );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        {/*TODO: Make Certificate Generation specific input not setting all these fields that are irrelevant*/}
        <SalesforceOrganizationSyncTaskJenkinsToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
        />
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"countryName"} />
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"state"} />
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"locality"} />
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"organization"} />
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"unitName"} />
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"commonName"} />
        <TextInputBase dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"email"} />
        <DateTimeInput dataObject={gitTasksConfigurationData} setDataObject={setGitTasksConfigurationData} fieldName={"expiryDate"} minDate={new Date()} dropUp={true} />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

MergeSyncTaskConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default MergeSyncTaskConfigurationPanel;


