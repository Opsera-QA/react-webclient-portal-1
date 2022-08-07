import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

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
    className,
    gitToolOption,
    setGitToolOption,
  }) {
  return (
    <div className={className}>
      <WizardSelectionRadioOption
        onClickFunction={setGitToolOption}
        selectedOption={gitToolOption}
        option={GIT_TOOL_CREATION_OPTIONS.GITHUB}
        text={GIT_TOOL_CREATION_OPTION_LABELS.GITHUB}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
      />
      <WizardSelectionRadioOption
        className={"mt-2"}
        onClickFunction={setGitToolOption}
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
};

export default GitToolCreationRadioOptionInput;


