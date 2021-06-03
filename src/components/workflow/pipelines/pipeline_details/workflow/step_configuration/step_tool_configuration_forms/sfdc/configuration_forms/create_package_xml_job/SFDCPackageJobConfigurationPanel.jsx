import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SFDCToolInput from "../../inputs/SFDCToolInput";
import SFDCJenkinsAccountInput from "../../inputs/SFDCJenkinsAccountInput";
import SFDCBitbucketWorkspaceInput from "../../inputs/SFDCBitbucketWorkspaceInput";
import SFDCGitRepositoryInput from "../../inputs/SFDCGitRepositoryInput";
import SFDCGitBranchInput from "../../inputs/SFDCGitBranchInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DestSFDCToolInput from "../../inputs/DestSFDCToolInput";

function SFDCPackageJobEditorPanel({ sfdcStepConfigurationDto, setSFDCStepConfigurationDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    sfdcStepConfigurationDto.setData("isOrgToOrg", sfdcStepConfigurationDto.getData("isOrgToOrg") || false);
  };
  
  if (sfdcStepConfigurationDto == null || sfdcStepConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

 
  const getDynamicFields = () => {
    if (sfdcStepConfigurationDto.getData("isOrgToOrg") === true) {
      return (
        <DestSFDCToolInput  dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      );
    }
      return (
      <>
        {/* account */}
        <SFDCJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
        {/* workspace */}
        <SFDCBitbucketWorkspaceInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
        {/* repo */}
        <SFDCGitRepositoryInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
        {/* branch */}
        <SFDCGitBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
        <div>
          <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
          <div className="small text-muted pb-2">Deletes the Jenkins workspace before building.</div>
        </div>        
      </>
      );
  };

  return (
    <>
      {/* salesforce creds */}
      <SFDCToolInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* is org to org */}
      <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} fieldName={"isOrgToOrg"} />
      {/* get dynamic fields based on above selection */}
      {getDynamicFields()}
    </>
  );
}

SFDCPackageJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSFDCStepConfigurationDataDto: PropTypes.func
};

export default SFDCPackageJobEditorPanel;