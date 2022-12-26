import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  faCog, faCode, faCodeBranch, faClipboardCheck, faSearchPlus,
} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineSourceConfigurationDetailsOverviewOverlay
  from "components/workflow/pipelines/overview/source/PipelineSourceConfigurationDetailsOverviewOverlay";

// TODO: Rewrite and separate into more components
export default function PipelineWorkflowSourceRepositoryItem(
  {
    pipeline,
    softLoading,
    status,
    fetchPlan,
    setInfoModal,
  }) {
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

  // TODO: launch directly in here instead
  const handleSourceEditClick = () => {
    fetchPlan({ id: pipeline._id, type: "source", item_id: "" });
  };

  // TODO: Remove the use of info modal
  const handleEditSourceSettingsClick = () => {
    if (PipelineRoleHelper.canUpdatePipelineStepDetails(userData, pipeline) !== true) {
      setInfoModal({
        show: true,
        header: "Permission Denied",
        message: "Editing pipeline workflow settings allows users to change the behavior of a pipeline step.  This action requires elevated privileges.",
        button: "OK",
      });
      return;
    }

    handleSourceEditClick();
  };

  return (
    <div className="source workflow-module-container workflow-module-container-width mt-2 mx-auto">
      {!softLoading ?
        <div className="text-muted title-text-6 pt-2 text-center mx-auto">Start of Workflow</div> :
        <div className="text-muted title-text-6 pt-2 text-center mx-auto green">
          <LoadingIcon className={"mr-1"} /> Processing Workflow...</div>
      }
      {pipeline?.workflow?.source?.repository &&
        <div className="d-flex">
          <div className={"pl-2"}>
                  <span className="text-muted small">
                    <IconBase icon={faCode} iconSize={"sm"} className={"mr-1"}/>
                    Repository: {pipeline.workflow.source.repository}
                  </span>
          </div>
        </div>
      }

      {pipeline?.workflow?.source?.branch &&
        <div className="d-flex">
          <div className={"pl-2"}>
                  <span className="text-muted small my-auto">
                    <IconBase icon={faCodeBranch} iconSize={"sm"} className={"mr-1"}/>
                    Primary Branch: {pipeline.workflow.source.branch}
                  </span>
          </div>
        </div>
      }

      {Array.isArray(pipeline?.workflow?.source?.secondary_branches) && pipeline?.workflow?.source?.secondary_branches?.length > 0 &&
        <div className="d-flex">
          <div className={"pl-2"}>
                  <span className="text-muted small my-auto">
                    <IconBase icon={faCodeBranch} iconSize={"sm"} className={"mr-1"}/>
                    Secondary Branches: {pipeline.workflow.source.secondary_branches?.join(", ")}
                  </span>
          </div>
        </div>
      }

      {pipeline.workflow.source.trigger_active &&
        <div className="d-flex">
          <div className="upper-case-first pl-2">
            <span className="text-muted small">
            <IconBase icon={faClipboardCheck} iconSize={"sm"} className={"mr-1 green"}/>
              Pipeline webhook {pipeline.workflow.source.trigger_active ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>}


      <div className="d-flex align-items-end flex-row m-2">
        <div className="ml-auto d-flex">
          {PipelineRoleHelper.canViewStepConfiguration(userData, pipeline) && <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({ message: "View Settings" })}>
            <div>
              <IconBase icon={faSearchPlus}
                        className={"text-muted ml-2 pointer"}
                        onClickFunction={() => {
                          showWebhookConfigurationSummary();
                        }}/>
            </div>
          </OverlayTrigger>
          }

          {status !== "running" && status !== "paused" ?
            <>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Configure pipeline level settings such as source repository and webhook events" })}>
                <div>
                  <IconBase icon={faCog}
                            className={"text-muted pointer ml-2"}
                            onClickFunction={() => {
                              handleEditSourceSettingsClick();
                            }}/>
                </div>
              </OverlayTrigger>
            </>
            :
            <>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })}>
                <div>
                  <IconBase icon={faCog}
                            className={"text-muted ml-2"} />
                </div>
              </OverlayTrigger>
            </>
          }
        </div>
      </div>
    </div>
  );
}


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

PipelineWorkflowSourceRepositoryItem.propTypes = {
  pipeline: PropTypes.object,
  softLoading: PropTypes.bool,
  status: PropTypes.string,
  fetchPlan: PropTypes.func,
  setInfoModal: PropTypes.func,
};