import React from "react";
import PropTypes from "prop-types";
import { faCode, faCodeBranch, faClipboardCheck, faSearchPlus } from "@fortawesome/pro-light-svg-icons";
import LoadingIcon from "components/common/icons/LoadingIcon";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineSourceConfigurationDetailsOverviewOverlay from "components/workflow/pipelines/overview/source/PipelineSourceConfigurationDetailsOverviewOverlay";
import modelHelpers from "components/common/model/modelHelpers";
import { sourceRepositoryConfigurationMetadata } from "components/workflow/plan/source/sourceRepositoryConfiguration.metadata";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineWorkflowItemFieldBase from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import PipelineWorkflowStepTextField from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowStepTextField";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import EditPipelineWorkflowSourceRepositoryIcon from "components/workflow/pipelines/pipeline_details/workflow/source/EditPipelineWorkflowSourceRepositoryIcon";

// TODO: Rewrite and separate into more components
export default function PipelineWorkflowSourceRepositoryItem(
  {
    pipeline,
    fetchPlan,
    softLoading,
    status,
  }) {
  const source = DataParsingHelper.parseNestedObject(pipeline, "workflow.source", {});
  const sourceRepositoryModel = modelHelpers.parseObjectIntoModel(source, sourceRepositoryConfigurationMetadata);
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const showWebhookConfigurationSummary = () => {
    toastContext.showOverlayPanel(
      <PipelineSourceConfigurationDetailsOverviewOverlay
        pipeline={pipeline}
      />
    );
  };

  // TODO: In the long term we should stamp which field in the metadata should correspond to this,
  //  so we can capture cases where they're saved in different fields
  const getSecondaryBranchesField = () => {
    const secondaryBranches = DataParsingHelper.parseNestedArray(source, "secondary_branches");

    if (secondaryBranches) {
      return (
        <PipelineWorkflowItemFieldBase
          icon={faCodeBranch}
          className={"mx-2 my-1"}
          label={"Secondary Branches"}
          value={secondaryBranches?.join(", ")}
        />
      );
    }
  };

  const getTitle = () => {
    if (softLoading === true) {
      return (
        <div className={"text-muted title-text-6 pt-2 text-center mx-auto green"}>
          <LoadingIcon className={"mr-1"} /> Processing Workflow...
        </div>
      );
    }

    return (
      <div className={"text-muted title-text-6 pt-2 text-center mx-auto"}>
        Start of Workflow
      </div>
    );
  };

  return (
    <div className={"source workflow-module-container workflow-module-container-width mt-2 mx-auto"}>
      {getTitle()}
      <PipelineWorkflowStepTextField
        icon={faCode}
        fieldName={"repository"}
        model={sourceRepositoryModel}
        className={"mx-2 my-1"}
      />
      <PipelineWorkflowStepTextField
        icon={faCodeBranch}
        fieldName={"branch"}
        model={sourceRepositoryModel}
        className={"mx-2 my-1"}
      />
      {getSecondaryBranchesField()}
      <PipelineWorkflowItemFieldBase
        icon={faClipboardCheck}
        className={"mx-2 my-1"}
        label={"Pipeline Webhook"}
        iconClassName={"green"}
        value={sourceRepositoryModel.getData("trigger_active") === true ? "Enabled" : undefined}
        hideColon={true}
      />
      <div className="d-flex align-items-end flex-row m-2">
        <div className="ml-auto d-flex">
          {PipelineRoleHelper.canViewStepConfiguration(userData, pipeline) &&
            <OverlayIconBase
              icon={faSearchPlus}
              className={"text-muted ml-2 pointer"}
              onClickFunction={() => {
                showWebhookConfigurationSummary();
              }}
              overlayBody={"View Settings"}
            />
          }

          <EditPipelineWorkflowSourceRepositoryIcon
            pipeline={pipeline}
            fetchPlan={fetchPlan}
            status={status}
          />
        </div>
      </div>
    </div>
  );
}

PipelineWorkflowSourceRepositoryItem.propTypes = {
  pipeline: PropTypes.object,
  softLoading: PropTypes.bool,
  status: PropTypes.string,
  fetchPlan: PropTypes.func,
  setInfoModal: PropTypes.func,
};