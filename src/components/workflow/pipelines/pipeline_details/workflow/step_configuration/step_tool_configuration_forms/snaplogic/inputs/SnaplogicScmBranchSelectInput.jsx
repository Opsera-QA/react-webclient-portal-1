import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SnaplogicScmBranchSelectInput({model, setModel, fieldName, disabled, disableBranch}) {

  const getDisabledOptions = () => {
    if (disabled === true) {
      return true;
    }

    if (disableBranch != null && disableBranch !== "") {
      return [disableBranch];
    }
  };

  return (
     <GitBranchInput
       fieldName={fieldName}
       service={model?.getData("service")}
       gitToolId={model?.getData("gitToolId")}
       repoId={model?.getData("repoId")}
       dataObject={model}
       setDataObject={setModel}
       disabled={getDisabledOptions()}
     />
  );
}

SnaplogicScmBranchSelectInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  disableBranch: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SnaplogicScmBranchSelectInput.defaultProps = {
  fieldName: "gitBranch"
};

export default SnaplogicScmBranchSelectInput;
