import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SFDCToolInput from "../../inputs/SFDCToolInput";
import SFDCJenkinsAccountInput from "../../inputs/SFDCJenkinsAccountInput";
import SFDCBitbucketWorkspaceInput from "../../inputs/SFDCBitbucketWorkspaceInput";
import SFDCGitRepositoryInput from "../../inputs/SFDCGitRepositoryInput";
import SFDCGitBranchInput from "../../inputs/SFDCGitBranchInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DestSFDCToolInput from "../../inputs/DestSFDCToolInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SFDCBuildStepSelectInput from "../../inputs/SFDCBuildStepSelectInput";

function SFDCBackupJobEditorPanel({ sfdcStepConfigurationDto, setSFDCStepConfigurationDataDto, listOfSteps }) {
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
      {/* is org to org */}
      <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} fieldName={"isFullBackup"} />
      {/* account */}
      <SFDCJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* workspace */}
      <SFDCBitbucketWorkspaceInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* repo */}
      <SFDCGitRepositoryInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* branch */}
      <SFDCGitBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* rollback branch */}
      <TextInputBase dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} fieldName={"rollbackBranchName"} />
      {/* Build Step Info */}
      <SFDCBuildStepSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} setDataObject={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
    </>
  );
}

SFDCBackupJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSFDCStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SFDCBackupJobEditorPanel;