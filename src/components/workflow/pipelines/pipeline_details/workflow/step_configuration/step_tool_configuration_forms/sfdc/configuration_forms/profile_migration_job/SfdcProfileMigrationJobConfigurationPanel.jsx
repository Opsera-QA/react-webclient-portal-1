import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SalesforceStepToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SalesforceStepToolSelectInput";
import DestSfdcToolInput from "../../inputs/DestSfdcToolInput";

function SfdcProfileMigrationJobEditorPanel({ sfdcStepConfigurationDto, setSfdcStepConfigurationDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    sfdcStepConfigurationDto.setData("isOrgToOrg", true);
  };

  if (sfdcStepConfigurationDto == null || sfdcStepConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      <SalesforceStepToolSelectInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      <DestSfdcToolInput  dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
    </>
  );
}

SfdcProfileMigrationJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func
};

export default SfdcProfileMigrationJobEditorPanel;