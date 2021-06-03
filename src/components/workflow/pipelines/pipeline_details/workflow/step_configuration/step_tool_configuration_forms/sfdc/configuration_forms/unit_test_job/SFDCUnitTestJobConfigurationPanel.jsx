import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SFDCToolInput from "../../inputs/SFDCToolInput";
import SFDCJenkinsAccountInput from "../../inputs/SFDCJenkinsAccountInput";
import SFDCUnitTestTypeSelectInput from "../../inputs/SFDCUnitTestTypeSelectInput";
import SFDCBuildStepSelectInput from "../../inputs/SFDCBuildStepSelectInput";

function SFDCUnitTestEditorPanel({ sfdcStepConfigurationDto, setSFDCStepConfigurationDataDto, listOfSteps }) {
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
      <SFDCToolInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* Unit Test Type selection input */}
      <SFDCUnitTestTypeSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"sfdcUnitTestType"} setDataObject={setSFDCStepConfigurationDataDto} isProd={false} />
      {/* Build Step Info */}
      <SFDCBuildStepSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} setDataObject={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
    </>
  );
}

SFDCUnitTestEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSFDCStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SFDCUnitTestEditorPanel;