import React from "react";
import PropTypes from "prop-types";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import githubConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/github/github-connection-metadata";
import gitlabConnectionMetadata
  from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab-connection-metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";

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
    setGitToolId,
  }) {
  const { themeConstants } = useComponentStateReference();

  const setDataFunction = (newValue) => {
    setGitToolOption(newValue);
    setGitToolId(undefined);

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
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={"Pick your choice of GIT Repository to Register and to be used for Version Control System for the Workflow"}
        />
      </CenteredContentWrapper>
      <Row>
        <Col xs={3} />
        <Col xs={3}>
          <SelectionIconCard
            selectedOption={gitToolOption}
            option={GIT_TOOL_CREATION_OPTIONS.GITHUB}
            onClickFunction={setDataFunction}
            highlightedBorderColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
            titleBar={
              <CardIconTitleBar
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
          <SelectionIconCard
            selectedOption={gitToolOption}
            option={GIT_TOOL_CREATION_OPTIONS.GITLAB}
            onClickFunction={setDataFunction}
            highlightedBorderColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
            titleBar={
              <CardIconTitleBar
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
  setGitToolId: PropTypes.func,
};

export default GitToolCreationSelectionOptionInput;


