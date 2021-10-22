import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SalesforceStepToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/inputs/SalesforceStepToolSelectInput";
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
        <SfdcJenkinsAccountInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        <SfdcBitbucketWorkspaceInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        <SfdcGitRepositoryInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        <SfdcGitBranchInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
        {/* Workspace Delete Flag */}
        <div>
          <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
          <div className="small text-muted pb-2">Deletes the Jenkins workspace before building.</div>
        </div>        
      </>
      );
  };

  return (
    <>      
      <SalesforceStepToolSelectInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} />
      {/* is org to org */}
      <BooleanToggleInput dataObject={sfdcStepConfigurationDto} setDataObject={setSfdcStepConfigurationDataDto} fieldName={"isOrgToOrg"} />      
      {getDynamicFields()}
    </>
  );
}

SfdcPackageJobEditorPanel.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  setSfdcStepConfigurationDataDto: PropTypes.func
};

export default SfdcPackageJobEditorPanel;