import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";
import githubConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/github/github-connection-metadata";
import gitlabConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab-connection-metadata";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import bitbucketConnectionMetadata from "../../../../../../inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket-connection-metadata";
import AzureDevopsConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/azure-devops/azureDevops-connection-metadata";

export const GIT_TOOL_CREATION_OPTIONS = {
  GITHUB: toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
  GITLAB: toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
  BITBUCKET: toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET,
  AZURE: toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
};

export const GIT_TOOL_CREATION_OPTION_LABELS = {
  GITHUB: "Github",
  GITLAB: "Gitlab",
  BITBUCKET: "Bitbucket",
  AZURE: "Azure",
};

function GitToolCreationSelectionOptionInput({
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
        setGitToolModel({
          ...modelHelpers.getNewModelForMetadata(githubConnectionMetadata),
        });
        return;
      case GIT_TOOL_CREATION_OPTIONS.GITLAB:
        setGitToolModel({
          ...modelHelpers.getNewModelForMetadata(gitlabConnectionMetadata),
        });
        return;
      case GIT_TOOL_CREATION_OPTIONS.BITBUCKET:
        setGitToolModel({
          ...modelHelpers.getNewModelForMetadata(bitbucketConnectionMetadata),
        });
        return;
      case GIT_TOOL_CREATION_OPTIONS.AZURE:
        setGitToolModel({
          ...modelHelpers.getNewModelForMetadata(AzureDevopsConnectionMetadata),
        });
        return;
    }
  };

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={
            "Pick your choice of GIT Repository to Register and to be used for Version Control System for the Workflow"
          }
        />
      </CenteredContentWrapper>
      <Row className={"d-flex align-items-center justify-content-center px-4"}>
        <Col xs={3}>
          <SelectionIconCardBase
            selectedOption={gitToolOption}
            option={GIT_TOOL_CREATION_OPTIONS.GITHUB}
            onClickFunction={setDataFunction}
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
            }
            titleBar={
              <IconTitleBar
                className={""}
                icon={getLargeVendorIconFromToolIdentifier(
                  toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB,
                )}
                title={GIT_TOOL_CREATION_OPTION_LABELS.GITHUB}
                titleClassName={"mx-auto py-1"}
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
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
            }
            titleBar={
              <IconTitleBar
                className={""}
                icon={getLargeVendorIconFromToolIdentifier(
                  toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
                )}
                title={GIT_TOOL_CREATION_OPTION_LABELS.GITLAB}
                titleClassName={"mx-auto py-1"}
                subTitleClassName={"mx-auto"}
              />
            }
          />
        </Col>
        <Col xs={3}>
          <SelectionIconCardBase
            selectedOption={gitToolOption}
            option={GIT_TOOL_CREATION_OPTIONS.BITBUCKET}
            onClickFunction={setDataFunction}
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
            }
            titleBar={
              <IconTitleBar
                className={""}
                icon={
                  <div style={{height: "96px"}}>
                    {getLargeVendorIconFromToolIdentifier(
                      toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET,
                    )}
                  </div>
                }
                title={GIT_TOOL_CREATION_OPTION_LABELS.BITBUCKET}
                titleClassName={"mx-auto py-1"}
                subTitleClassName={"mx-auto"}
              />
            }
          />
        </Col>
        <Col xs={3}>
          <SelectionIconCardBase
            selectedOption={gitToolOption}
            option={GIT_TOOL_CREATION_OPTIONS.AZURE}
            onClickFunction={setDataFunction}
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
            }
            titleBar={
              <IconTitleBar
                className={""}
                icon={getLargeVendorIconFromToolIdentifier(
                  toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
                )}
                title={GIT_TOOL_CREATION_OPTION_LABELS.AZURE}
                titleClassName={"mx-auto py-1"}
                subTitleClassName={"mx-auto"}
              />
            }
          />
        </Col>
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
