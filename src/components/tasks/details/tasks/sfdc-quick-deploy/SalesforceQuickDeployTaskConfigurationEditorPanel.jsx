import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import salesforceQuickDeployTaskConfigurationMetadata
  from "components/tasks/details/tasks/sfdc-quick-deploy/salesforceQuickDeployTaskConfigurationMetadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceQuickDeployTaskSalesforceToolSelectInput
  from "components/tasks/details/tasks/sfdc-quick-deploy/inputs/SalesforceQuickDeployTaskSalesforceToolSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function SalesforceQuickDeployTaskConfigurationEditorPanel({ taskModel, taskConfigurationModel, setTaskConfigurationModel }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {    
    const configurationData = modelHelpers.getToolConfigurationModel(taskModel.getData("configuration"), salesforceQuickDeployTaskConfigurationMetadata);
    setTaskConfigurationModel({...configurationData});
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getDynamicFields = () => {
    if(taskConfigurationModel.getData("autoScaleEnable") === true){
      return (
        <Col lg={12}>
          {/*<AgentLabelsSelectInput*/}
          {/*  dataObject={taskConfigurationModel}*/}
          {/*  setDataObject={setTaskConfigurationModel}*/}
          {/*  fieldName={"agentLabels"}*/}
          {/*/>*/}
        </Col>
      );
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <SalesforceQuickDeployTaskSalesforceToolSelectInput
          model={taskConfigurationModel}
          setModel={setTaskConfigurationModel}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={taskConfigurationModel}
          setDataObject={setTaskConfigurationModel}
          fieldName={"deployKey"}
        />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

SalesforceQuickDeployTaskConfigurationEditorPanel.propTypes = {
  taskModel: PropTypes.object,
  taskConfigurationModel: PropTypes.object,
  setTaskConfigurationModel: PropTypes.func,
};

export default SalesforceQuickDeployTaskConfigurationEditorPanel;


