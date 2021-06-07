import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SfdcToolInput from "../../inputs/SfdcToolInput";
import SfdcJenkinsAccountInput from "../../inputs/SfdcJenkinsAccountInput";
import SfdcBitbucketWorkspaceInput from "../../inputs/SfdcBitbucketWorkspaceInput";
import SfdcGitRepositoryInput from "../../inputs/SfdcGitRepositoryInput";
import SfdcGitBranchInput from "../../inputs/SfdcGitBranchInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SfdcBuildStepSelectInput from "../../inputs/SfdcBuildStepSelectInput";

function SfdcBackupJobEditorPanel({ sfdcStepConfigurationDto, setSfdcStepConfigurationDataDto, listOfSteps }) {
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
      {/* is org to org */}
      <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"isFullBackup"} />
      {/* account */}
      <SfdcJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* workspace */}
      <SfdcBitbucketWorkspaceInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* repo */}
      <SfdcGitRepositoryInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* branch */}
      <SfdcGitBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* rollback branch */}
      <TextInputBase dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"rollbackBranchName"} />
      {/* Build Step Info */}
      <SfdcBuildStepSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} setDataObject={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
    </>
  );
}

SfdcBackupJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SfdcBackupJobEditorPanel;