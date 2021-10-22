import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SalesforceOrganizationSyncTaskUpstreamBranchSelectInput({model, setModel, disabled, visible}) {
  return (
    <GitBranchInput
      fieldName={"upstreamBranch"}
      service={model?.getData("service")}
      gitToolId={model?.getData("gitToolId")}
      workspace={model?.getData("workspace")}
      repoId={model?.getData("projectId")}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      visible={visible}
    />
  );
}

SalesforceOrganizationSyncTaskUpstreamBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskUpstreamBranchSelectInput;
