import React from "react";
import PropTypes from "prop-types";
import JenkinsStepSalesforceConfiguratorToolSelectInput from "components/common/list_of_values_input/tools/jenkins/JenkinsStepSalesforceConfiguratorToolSelectInput";
import { Form } from "react-bootstrap";
import JenkinsStepDestinationSalesforceCredentialsSelectInput from "components/common/list_of_values_input/tools/jenkins/JenkinsStepDestinationSalesforceCredentialsSelectInput";
import JenkinsSfdcUnitTestTypeSelectInput from "components/common/list_of_values_input/tools/jenkins/JenkinsSfdcUnitTestTypeSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

// TODO: Is this supposed to still be in here
const testArr = ["SFDC UNIT TESTING", "SFDC VALIDATE PACKAGE XML", "SFDC DEPLOY"];

// TODO: Rewrite
function JenkinsSfdcConfigurationPanel({ dataObject, setDataObject }) {
  const handleSFDCCreatePackageXMLChange = (checked) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("isOrgToOrg", checked);
    newDataObject.setData("sfdcDestToolId", "");
    newDataObject.setData("destAccountUsername", "");
    setDataObject({ ...newDataObject });
  };

  const getJenkinsSfdcInput = () => {
    if (dataObject.getData("jobType") !== "SFDC PUSH ARTIFACTS") {
     return (
       <JenkinsStepSalesforceConfiguratorToolSelectInput
         model={dataObject}
         setModel={setDataObject}
       />
     );
    }
  };

  //TODO: This should probably be its own component
  const getComparisonCheckbox = () => {
    if (dataObject?.getData("jobType") === "SFDC CREATE PACKAGE XML") {
      return (
        <Form.Check
          type="checkbox"
          label="Deploy from Salesforce Org"
          checked={dataObject.data.isOrgToOrg}
          onChange={(e) => handleSFDCCreatePackageXMLChange(e.target.checked)}
        />
      );
    }
  };

  const getSfdcCredentialsInput = () => {
    if (dataObject?.getData("isOrgToOrg") && dataObject?.getData("job_type") === 'sfdc-ant-profile' ) {
      return (
        <JenkinsStepDestinationSalesforceCredentialsSelectInput
          model={dataObject}
          setModel={setDataObject}
        />
      );
    }
  };

  const getUnitTestTypeInput = () => {
    if (dataObject?.getData("sfdcToolId")?.length > 0 && testArr.includes(dataObject?.getData("jobType"))) {
      return (
        <JenkinsSfdcUnitTestTypeSelectInput
          dataObject={dataObject}
          setDataObject={setDataObject}
        />
      );
    }
  };

  const getQuickDeployToggle = () => {
    if (dataObject?.getData("jobType") === "SFDC DEPLOY") {
      return (
        <BooleanToggleInput
          fieldName={"enableQuickDeploy"}
          dataObject={dataObject}
          setDataObject={setDataObject}
        />
      );
    }
  };

  if (dataObject == null) {
    return null;
  }

  return (
    <>
      {getJenkinsSfdcInput()}
      {getComparisonCheckbox()}
      {getSfdcCredentialsInput()}
      {getUnitTestTypeInput()}
      {getQuickDeployToggle()}
    </>
  );
}

JenkinsSfdcConfigurationPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsSfdcConfigurationPanel;
