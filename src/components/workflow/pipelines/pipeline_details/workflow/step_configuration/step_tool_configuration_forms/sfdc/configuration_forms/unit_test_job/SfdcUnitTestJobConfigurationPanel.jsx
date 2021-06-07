import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SfdcToolInput from "../../inputs/SfdcToolInput";
import SfdcUnitTestTypeSelectInput from "../../inputs/SfdcUnitTestTypeSelectInput";
import SfdcBuildStepSelectInput from "../../inputs/SfdcBuildStepSelectInput";

function SfdcUnitTestEditorPanel({ sfdcStepConfigurationDto, setSfdcStepConfigurationDataDto, listOfSteps }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    sfdcStepConfigurationDto.setData("isOrgToOrg", false);
  };

  if (sfdcStepConfigurationDto == null || sfdcStepConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      {/* salesforce creds */}
      <SfdcToolInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* Unit Test Type selection input */}
      <SfdcUnitTestTypeSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"sfdcUnitTestType"} setDataObject={setSfdcStepConfigurationDataDto} isProd={false} />
      {/* Build Step Info */}
      <SfdcBuildStepSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} setDataObject={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
    </>
  );
}

SfdcUnitTestEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SfdcUnitTestEditorPanel;