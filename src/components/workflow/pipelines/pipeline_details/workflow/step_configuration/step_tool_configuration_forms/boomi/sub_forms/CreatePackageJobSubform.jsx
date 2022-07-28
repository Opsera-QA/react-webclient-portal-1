import React, { useState } from "react";
import PropTypes from "prop-types";
import BoomiSCMToolTypeSelectInput from "../inputs/BoomiSCMToolTypeSelectInput";
import ProvarSourceControlManagementToolSelectInput from "../inputs/BoomiStepSourceControlManagementToolSelectInput";
import BoomiBitbucketWorkspaceInput from "../inputs/BoomiBitbucketWorkspaceInput";
import BoomiGitRepositoryInput from "../inputs/BoomiGitRepositoryInput";
import BoomiGitBranchInput from "../inputs/BoomiGitBranchInput";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import BoomiSCMRepoFilesSelectInput from "../inputs/BoomiSCMRepoFiles";

function CreatePackageJobSubform({ model, setModel, plan, stepId }) {
  if (
    !model?.getData("jobType") ||
    model?.getData("jobType") !== "CREATE_PACKAGE_COMPONENT"
  ) {
    return null;
  }

  return (
    <>
        <BoomiSCMToolTypeSelectInput
            dataObject={model}
            setDataObject={setModel}
        />
        <ProvarSourceControlManagementToolSelectInput
            model={model}
            setModel={setModel}
            disabled={model.getData("service").length === 0}
        />
        <BoomiBitbucketWorkspaceInput
            dataObject={model}
            setDataObject={setModel}
        />
        <BoomiGitRepositoryInput
            dataObject={model}
            setDataObject={setModel}
        />
        <BoomiGitBranchInput
            dataObject={model}
            setDataObject={setModel}
        />
        <TextInputBase
            dataObject={model}
            setDataObject={setModel}
            fieldName={"filePath"}
        />
        <BoomiSCMRepoFilesSelectInput
            setDataObject={setModel}
            dataObject={model}
            disabled={
                model && model.getData("filePath")
                    ? model.getData("filePath").length === 0
                    : true
            }
            tool_prop={
                model && model.getData("boomiToolId")
                    ? model.getData("boomiToolId")
                    : ""
            }
        />
    </>
  );
}

CreatePackageJobSubform.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default CreatePackageJobSubform;
