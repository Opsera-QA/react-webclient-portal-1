import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SfdcJenkinsAccountInput from "../../inputs/SfdcJenkinsAccountInput";
import SfdcBitbucketWorkspaceInput from "../../inputs/SfdcBitbucketWorkspaceInput";
import SfdcGitRepositoryInput from "../../inputs/SfdcGitRepositoryInput";
import SfdcGitBranchInput from "../../inputs/SfdcGitBranchInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SfdcGitUpstreamBranchInput from "../../inputs/SfdcGitUpstreamBranchInput";
import SfdcBuildStepSelectInput from "../../inputs/SfdcBuildStepSelectInput";


function SfdcPushArtifactsJobEditorPanel({ sfdcStepConfigurationDto, setSfdcStepConfigurationDataDto, listOfSteps }) {
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
          <TextInputBase dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"gitBranch"}  />
          {/* Upstream branch */}
          <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"hasUpstreamBranch"} />
          {getUpstreamFields()}
        </>
      );
    }
      return (
       <SfdcGitBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      );
  };
  
  const getUpstreamFields = () => {
    if (sfdcStepConfigurationDto.getData("hasUpstreamBranch") === true) { 
      return (
        <SfdcGitUpstreamBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      );
    }
  };

  return (
    <>      
      <SfdcJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />      
      <SfdcBitbucketWorkspaceInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />      
      <SfdcGitRepositoryInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* is a new branch flag */}
      <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"isNewBranch"} />
      {getBackupFields()}      
      <SfdcBuildStepSelectInput dataObject={sfdcStepConfigurationDto} fieldName={"stepIdXML"} setDataObject={setSfdcStepConfigurationDataDto} listOfSteps={listOfSteps} />
      {/* Script File Details */}
      <TextInputBase fieldName={"scriptFilePath"} dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      <TextInputBase fieldName={"scriptFileName"} dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* Output File Details */}
      <TextInputBase setDataObject={setSfdcStepConfigurationDataDto} dataObject={sfdcStepConfigurationDto} fieldName={"outputPath"} />
      <TextInputBase setDataObject={setSfdcStepConfigurationDataDto} dataObject={sfdcStepConfigurationDto} fieldName={"outputFileName"} />
    </>
  );
}

SfdcPushArtifactsJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func,
  listOfSteps: PropTypes.array
};

export default SfdcPushArtifactsJobEditorPanel;