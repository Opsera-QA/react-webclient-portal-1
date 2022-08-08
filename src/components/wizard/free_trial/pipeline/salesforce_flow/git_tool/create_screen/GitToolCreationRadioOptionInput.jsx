import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import githubConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/github/github-connection-metadata";
import gitlabConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab-connection-metadata";

export const GIT_TOOL_CREATION_OPTIONS = {
  GITHUB: toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
  GITLAB: toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
};

export const GIT_TOOL_CREATION_OPTION_LABELS = {
  GITHUB: "Github",
  GITLAB: "Gitlab",
};

// TODO: Should we make something more similar to the mockups?
function GitToolCreationRadioOptionInput(
  {
    setGitToolModel,
    className,
    gitToolOption,
    setGitToolOption,
  }) {
  const setDataFunction = (newValue) => {
    setGitToolOption(newValue);

    switch (newValue) {
      case GIT_TOOL_CREATION_OPTIONS.GITHUB:
        setGitToolModel({...modelHelpers.getNewModelForMetadata(githubConnectionMetadata)});
        return;
      case GIT_TOOL_CREATION_OPTIONS.GITLAB:
        setGitToolModel({...modelHelpers.getNewModelForMetadata(gitlabConnectionMetadata)});
        return;
    }
  };

  return (
    <div className={className}>
      <WizardSelectionRadioOption
        onClickFunction={setDataFunction}
        selectedOption={gitToolOption}
        option={GIT_TOOL_CREATION_OPTIONS.GITHUB}
        text={GIT_TOOL_CREATION_OPTION_LABELS.GITHUB}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
      />
      <WizardSelectionRadioOption
        className={"mt-2"}
        onClickFunction={setDataFunction}
        selectedOption={gitToolOption}
        option={GIT_TOOL_CREATION_OPTIONS.GITLAB}
        text={GIT_TOOL_CREATION_OPTION_LABELS.GITLAB}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
      />
    </div>
  );
}

GitToolCreationRadioOptionInput.propTypes = {
  className: PropTypes.string,
  gitToolOption: PropTypes.string,
  setGitToolOption: PropTypes.func,
  setGitToolModel: PropTypes.func,
};

export default GitToolCreationRadioOptionInput;


