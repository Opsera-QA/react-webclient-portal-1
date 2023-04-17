import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { taskHelper } from "components/tasks/task.helper";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import {SubMenuContainer, SubMenuItem} from "@opsera/react-vanity-set";
import {
  PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS
} from "components/landing/v2/widgets/pipelines/widgets/SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase";

export const TASK_WORKFLOW_WIDGET_HEADER_ITEMS = {
  SUMMARY: "summary",
  ACTIVITY_LOGS: "activity_logs",
  ANALYTICS: "analytics",
  MORE_DETAILS: "more_details",
};

export default function SoftwareDevelopmentLandingTaskWidgetHeaderTabBarBase(
  {
    selectedHeaderItem,
    setSelectedHeaderItem,
    selectedWorkflow,
    setSelectedWorkflow,
  }) {
  const history = useHistory();

  const handleHeaderItemClick = () => {
    history.push(taskHelper.getDetailViewLink(selectedWorkflow?.getMongoDbId()));
  };

  if (selectedWorkflow == null) {
    return null;
  }

  return (
    <div className={"w-100 d-flex my-2"}>
      <ActionBarButton
        action={() => setSelectedWorkflow(undefined)}
        icon={faArrowLeft}
        popoverText={"Select Another Workflow"}
        className={"ml-2"}
      />
      <SubMenuContainer className={"mx-auto"}>
        <SubMenuItem
          className={"px-3"}
          itemKey={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY}
          activeKey={selectedHeaderItem}
          setActiveKey={setSelectedHeaderItem}
          label={"Summary"}
        />
        <SubMenuItem
          className={"px-3"}
          itemKey={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.ACTIVITY_LOGS}
          activeKey={selectedHeaderItem}
          setActiveKey={setSelectedHeaderItem}
          label={"Activity Logs"}
        />
        <SubMenuItem
          className={"px-3"}
          itemKey={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.ANALYTICS}
          activeKey={selectedHeaderItem}
          setActiveKey={setSelectedHeaderItem}
          label={"Analytics"}
        />
        <SubMenuItem
          className={"px-3"}
          itemKey={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.MORE_DETAILS}
          setActiveKey={handleHeaderItemClick}
          label={"Full Details"}
        />
      </SubMenuContainer>
    </div>
  );
}

SoftwareDevelopmentLandingTaskWidgetHeaderTabBarBase.propTypes = {
  selectedHeaderItem: PropTypes.string,
  setSelectedHeaderItem: PropTypes.func,
  selectedWorkflow: PropTypes.object,
  setSelectedWorkflow: PropTypes.func,
};
