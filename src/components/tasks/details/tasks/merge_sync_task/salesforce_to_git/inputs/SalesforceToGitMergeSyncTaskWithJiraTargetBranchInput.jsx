import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { bitbucketActions } from "components/inventory/tools/tool_details/tool_jobs/bitbucket/bitbucket.actions";
import { githubActions } from "components/inventory/tools/tool_details/tool_jobs/github/github.actions";
import { gitlabActions } from "components/inventory/tools/tool_details/tool_jobs/gitlab/gitlab.actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput";
import SalesforceToGitMergeSyncTaskTargetBranchSelectInput
  from "components/tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskTargetBranchSelectInput";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import Col from "react-bootstrap/Col";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InlineLoadingDialog from "components/common/status_notifications/loading/InlineLoadingDialog";

function SalesforceToGitMergeSyncTaskWithJiraTargetBranchInput(
  {
    model,
    setModel,
    service,
    toolId,
    workspace,
    jiraIssueId,
    repositoryId,
    disabled,
  }) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);  
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setError(undefined);
    if (isMongoDbId(toolId) === true && hasStringValue(repositoryId) === true && hasStringValue(service) === true && hasStringValue(jiraIssueId) === true) {
      loadData().catch((error) => {
        throw error;
      });
    }
  }, [jiraIssueId, repositoryId, service, workspace, toolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);      
      let response = {};
      switch (service) {
        case toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET:
          response = await bitbucketActions.getBranch(
            getAccessToken,
            cancelTokenSource,
            toolId,
            workspace,
            repositoryId,
            jiraIssueId,
          );
          break;
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB:
          response = await githubActions.getBranch(
            getAccessToken,
            cancelTokenSource,
            toolId,
            repositoryId,
            jiraIssueId,
          );
          break;
        case toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB:
          response = await gitlabActions.getBranch(
            getAccessToken,
            cancelTokenSource,
            toolId,
            repositoryId,
            jiraIssueId,
          );
          break;
        default:
          response = {};
      }

      const data = DataParsingHelper.parseObject(response?.data?.data, false);
      const newModel = { ...model };
      if (data && (data?.branch === jiraIssueId || data?.name === jiraIssueId)) {
        newModel?.setData("targetBranch", jiraIssueId);
        newModel?.setData("isNewBranch", false);
        newModel?.setDefaultValue("upstreamBranch");
      } else {
        newModel?.setData("isNewBranch", true);
        newModel?.setData("targetBranch", jiraIssueId);
      }
      setModel({ ...newModel });
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getBranchInputs = () => {
    if (model?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput
              model={model}
              setModel={setModel}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={model}
              setDataObject={setModel}
              fieldName={"targetBranch"}
              disabled={true}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskTargetBranchSelectInput
          model={model}
          setModel={setModel}
          sourceBranch={model?.getData("sourceBranch")}
        />
      </Col>
    );
  };

  if (isLoading) {
    return (
      <Col lg={12}>
        <InlineLoadingDialog />
      </Col>
    );
  }

  return (
    <>
      {getBranchInputs()}
    </>
  );
}

SalesforceToGitMergeSyncTaskWithJiraTargetBranchInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jiraIssueId: PropTypes.string,
  repositoryId: PropTypes.string,
  service: PropTypes.string,
  toolId: PropTypes.string,
  workspace: PropTypes.string,
};

export default SalesforceToGitMergeSyncTaskWithJiraTargetBranchInput;
