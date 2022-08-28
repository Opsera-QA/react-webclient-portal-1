import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import githubConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/github/github-connection-metadata";
import gitlabConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab-connection-metadata";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";

export const GIT_TOOL_CREATION_OPTIONS = {
  GITHUB: toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
  GITLAB: toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
};

export const GIT_TOOL_CREATION_OPTION_LABELS = {
  GITHUB: "Github",
  GITLAB: "Gitlab",
};

function GitToolCreationSelectionOptionInput(
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
      <Row>
        <Col xs={3} />
        <Col xs={3}>
          <SelectionIconCardBase
            selectedOption={gitToolOption}
            option={GIT_TOOL_CREATION_OPTIONS.GITHUB}
            onClickFunction={setDataFunction}
            titleBar={
              <IconTitleBar
                className={""}
                formattedIcon={
                  getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB)
                }
                title={GIT_TOOL_CREATION_OPTION_LABELS.GITHUB}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
          />
        </Col>
        <Col xs={3}>
          <SelectionIconCardBase
            selectedOption={gitToolOption}
            option={GIT_TOOL_CREATION_OPTIONS.GITLAB}
            onClickFunction={setDataFunction}
            titleBar={
              <IconTitleBar
                className={""}
                formattedIcon={
                  getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB)
                }
                title={GIT_TOOL_CREATION_OPTION_LABELS.GITLAB}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
          />
        </Col>
        <Col xs={3} />
      </Row>
    </div>
  );
}

GitToolCreationSelectionOptionInput.propTypes = {
  className: PropTypes.string,
  gitToolOption: PropTypes.string,
  setGitToolOption: PropTypes.func,
  setGitToolModel: PropTypes.func,
};

export default GitToolCreationSelectionOptionInput;


