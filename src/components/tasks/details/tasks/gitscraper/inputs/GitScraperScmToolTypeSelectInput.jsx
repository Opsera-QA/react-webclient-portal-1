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
    await newModel.setData("repositories",[]);
    await newModel.setData("reposToScan",[]);
    await newModel.setData("gitToolId", "");
    await newModel.setData("workspace", "");
    await newModel.setData("bitbucketWorkspace", "");
    await newModel.setData(fieldName, selectedOption?.value);
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