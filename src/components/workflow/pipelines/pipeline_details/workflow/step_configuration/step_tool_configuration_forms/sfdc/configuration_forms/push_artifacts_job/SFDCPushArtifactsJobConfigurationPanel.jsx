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
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SFDCGitUpstreamBranchInput from "../../inputs/SFDCGitUpstreamBranchInput";
import SFDCBuildStepSelectInput from "../../inputs/SFDCBuildStepSelectInput";


function SFDCPushArtifactsJobEditorPanel({ sfdcStepConfigurationDto, setSFDCStepConfigurationDataDto, listOfSteps }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    sfdcStepConfigurationDto.setData("isOrgToOrg", false);
  };

  if (sfdcStepConfigurationDto == null || sfdcStepConfigurationDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  const getBackupFields = () => {
    if (sfdcStepConfigurationDto.getData("isNewBranch") === true) {
      return (
        <>
          <TextInputBase dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} fieldName={"gitBranch"}  />
          {/* Upstream branch */}
          <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} fieldName={"hasUpstreamBranch"} />
          {getUpstreamFields()}
        </>
      );
    }
      return (
       <SFDCGitBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      );
  };
  
  const getUpstreamFields = () => {
    if (sfdcStepConfigurationDto.getData("hasUpstreamBranch") === true) { 
      return (
        <SFDCGitUpstreamBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      );
    }
  };

  return (
    <>
      {/* account */}
      <SFDCJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* workspace */}
      <SFDCBitbucketWorkspaceInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* repo */}
      <SFDCGitRepositoryInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      {/* is a new branch flag */}
      <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} fieldName={"isNewBranch"} />
      {getBackupFields()}
      {/* Build Step Info */}
      <SFDCBuildStepSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} setDataObject={setSFDCStepConfigurationDataDto} listOfSteps={listOfSteps} />
      <TextInputBase fieldName={"scriptFilePath"} dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      <TextInputBase fieldName={"scriptFileName"} dataObject={sfdcStepConfigurationDto} setDataObject={setSFDCStepConfigurationDataDto} />
      <TextInputBase setDataObject={setSFDCStepConfigurationDataDto} dataObject={sfdcStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setSFDCStepConfigurationDataDto} dataObject={sfdcStepConfigurationDto} fieldName={"outputFileName"} />
    </>
  );
}

SFDCPushArtifactsJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSFDCStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SFDCPushArtifactsJobEditorPanel;