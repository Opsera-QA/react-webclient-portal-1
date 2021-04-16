import React from "react";
import PropTypes from "prop-types";
import GitTaskTypeSelectInput from "components/common/list_of_values_input/git_tasks/GitTaskTypeSelectInput";
import SFDCGitTaskEditorPanel from "./sfdc/SFDCGitTaskConfigurationPanel";
import BranchToBranchGitTaskConfigurationPanel from "./branch-to-branch/BranchToBranchGitTaskConfigurationPanel";

function GitTasksConfigurationPanel({ gitTasksDataDto, setGitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData }) {
  const getConfigurationPanel = () => {
    switch (gitTasksDataDto.getData("type")) {
      case "sync-sfdc-repo":
        return (
          <SFDCGitTaskEditorPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "sync-git-branches":
        return (
          <BranchToBranchGitTaskConfigurationPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "":
      default:
        return <div className="text-center text-muted p-5">You must select a notification type before configuring notification type details.</div>;
    }
  };

  const handleGitTaskTypeChange = (fieldName, value) => {
    let newDataObject = gitTasksDataDto;
    newDataObject.setData("type", value.value);
    newDataObject.setData("configuration", {});
    setGitTasksConfigurationData(undefined);
    setGitTasksDataDto({...newDataObject});
  };

  return (
    <div>
      <div>
        <GitTaskTypeSelectInput setDataFunction={handleGitTaskTypeChange} dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

GitTasksConfigurationPanel.propTypes = {
  gitTaskType: PropTypes.string,
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
  setGitTasksDataDto: PropTypes.func
};

export default GitTasksConfigurationPanel;
