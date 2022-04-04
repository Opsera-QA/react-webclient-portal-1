import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SCRAPER_SCM_TOOL_LIST = [
  {
    name: "Gitlab",
    value: "gitlab",
  },
  {
    name: "Github",
    value: "github",
  },
  {
    name: "Bitbucket",
    value: "bitbucket",
  },
];

function GitScraperScmToolTypeSelectInput({model, setModel, isLoading, disabled}) {
  const setDataFunction = async (fieldName, selectedOption) => {
    let newModel = {...model};
    await newModel.setData(fieldName, selectedOption?.value);
    newModel.setData("gitToolId", "");
    newModel.setData("repository", "");
    newModel.setData("gitBranch", "");
    newModel.setData("gitFilePath", "");
    newModel.setData("workspace", "");
    newModel.setData("projectId", "");
    newModel.setData("repoId", "");
    newModel.setData("bitbucketWorkspaceName", "");
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"service"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={SCRAPER_SCM_TOOL_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Tool Type"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

GitScraperScmToolTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default GitScraperScmToolTypeSelectInput;