import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SalesforceStepToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SalesforceStepToolSelectInput";
import SfdcUnitTestTypeSelectInput from "../../inputs/SfdcUnitTestTypeSelectInput";
import SfdcBuildStepSelectInput from "../../inputs/SfdcBuildStepSelectInput";

function SfdcValidatePackageConfigPanel({ sfdcStepConfigurationDto, setSfdcStepConfigurationDataDto, listOfSteps }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    sfdcStepConfigurationDto.setData("isOrgToOrg", false);
  };

  if (sfdcStepConfigurationDto == null || sfdcStepConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      <SalesforceStepToolSelectInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      <SfdcUnitTestTypeSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"sfdcUnitTestType"} setDataObject={setSfdcStepConfigurationDataDto} isProd={true} />
      <SfdcBuildStepSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} setDataObject={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
    </>
  );
}

SfdcValidatePackageConfigPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SfdcValidatePackageConfigPanel;