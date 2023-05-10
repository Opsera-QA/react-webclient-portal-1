import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function OracleFusionReportMigrationGitBranchInput({model, setModel, disabled}) {
  return (
     <GitBranchInput
       fieldName={"gitBranch"}
       service={model.getData("service")}
       gitToolId={model.getData("gitToolId")}
       repoId={model.getData("repoId")}
       dataObject={model}
       setDataObject={setModel}
       disabled={disabled}
     />
  );
}

OracleFusionReportMigrationGitBranchInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default OracleFusionReportMigrationGitBranchInput;
