import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import CheckboxInputBase from "components/common/inputs/boolean/CheckboxInputBase";

// TODO: Rework component
function GitUpstreamBranchInput({ dataObject, setDataObject, gitToolId, service, workspace, repoId }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    newDataObject.setData("gitBranch", selectedOption);
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = () => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({ ...newDataObject });
  };

  const getUpstreamBranchField = () => {
    if (dataObject?.getData("hasUpstreamBranch") === true) {
      return (
        <GitBranchInput
          fieldName={"upstreamBranch"}
          service={service}
          gitToolId={gitToolId}
          workspace={workspace}
          repoId={repoId}
          dataObject={dataObject}
          setDataObject={setDataObject}
        />
      );
    }
  };

  const getDynamicFields = () => {
    if (dataObject?.getData("isNewBranch") === true) {
      return (
        <div>
          <TextInputBase
            fieldName={"gitBranch"}
            dataObject={dataObject}
            setDataObject={setDataObject}
          />
          <CheckboxInputBase
            fieldName={"hasUpstreamBranch"}
            model={dataObject}
            setModel={setDataObject}
          />
          {getUpstreamBranchField()}
        </div>
      );
    }

    return (
      <GitBranchInput
        fieldName={"branch"}
        service={service}
        gitToolId={gitToolId}
        workspace={workspace}
        repoId={repoId}
        dataObject={dataObject}
        setDataFunction={setDataFunction}
        setDataObject={setDataObject}
        clearDataFunction={clearDataFunction}
        />
    );
  };

  const setIsNewBranchFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("isNewBranch", !!selectedOption);
    newDataObject.setData("hasUpstreamBranch", false);
    newDataObject.setData("upstreamBranch", "");
    setDataObject({ ...newDataObject });
  };

  return (
    <div>
      <CheckboxInputBase
        fieldName={"isNewBranch"}
        setDataFunction={setIsNewBranchFunction}
        model={dataObject}
        setModel={setDataObject}
      />
      {getDynamicFields()}
    </div>
  );
}

GitUpstreamBranchInput.propTypes = {
  options: PropTypes.object,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func, 
  repoId: PropTypes.string,
  service: PropTypes.string,
  gitToolId: PropTypes.string,
  workspace: PropTypes.string,
};

export default GitUpstreamBranchInput;
