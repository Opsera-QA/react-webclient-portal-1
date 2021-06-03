import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SFDCToolInput from "../../inputs/SFDCToolInput";
import SFDCJenkinsAccountInput from "../../inputs/SFDCJenkinsAccountInput";
import DestSFDCToolInput from "../../inputs/DestSFDCToolInput";

function SFDCProfileMigrationJobEditorPanel({ sfdcStepConfigurationDto, setSFDCStepConfigurationDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    sfdcStepConfigurationDto.setData("isOrgToOrg", true);
  };

  if (sfdcStepConfigurationDto == null || sfdcStepConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <>
      {/* Jenkins acc details */}
      {/* <SFDCJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} /> */}
      {/* salesforce creds */}
      <SFDCToolInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* Dest SFDC org details */}
      <DestSFDCToolInput  dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
    </>
  );
}

SFDCProfileMigrationJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSFDCStepConfigurationDataDto: PropTypes.func
};

export default SFDCProfileMigrationJobEditorPanel;