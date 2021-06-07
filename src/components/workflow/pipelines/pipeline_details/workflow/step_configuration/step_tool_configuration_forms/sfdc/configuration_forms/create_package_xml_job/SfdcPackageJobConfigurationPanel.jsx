import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SfdcToolInput from "../../inputs/SfdcToolInput";
import SfdcJenkinsAccountInput from "../../inputs/SfdcJenkinsAccountInput";
import SfdcBitbucketWorkspaceInput from "../../inputs/SfdcBitbucketWorkspaceInput";
import SfdcGitRepositoryInput from "../../inputs/SfdcGitRepositoryInput";
import SfdcGitBranchInput from "../../inputs/SfdcGitBranchInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DestSfdcToolInput from "../../inputs/DestSfdcToolInput";

function SfdcPackageJobEditorPanel({ sfdcStepConfigurationDto, setSfdcStepConfigurationDataDto }) {
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
        <DestSfdcToolInput  dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      );
    }
      return (
      <>
        {/* account */}
        <SfdcJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        {/* workspace */}
        <SfdcBitbucketWorkspaceInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        {/* repo */}
        <SfdcGitRepositoryInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        {/* branch */}
        <SfdcGitBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        <div>
          <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
          <div className="small text-muted pb-2">Deletes the Jenkins workspace before building.</div>
        </div>        
      </>
      );
  };

  return (
    <>
      {/* salesforce creds */}
      <SfdcToolInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* is org to org */}
      <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"isOrgToOrg"} />
      {/* get dynamic fields based on above selection */}
      {getDynamicFields()}
    </>
  );
}

SfdcPackageJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func
};

export default SfdcPackageJobEditorPanel;