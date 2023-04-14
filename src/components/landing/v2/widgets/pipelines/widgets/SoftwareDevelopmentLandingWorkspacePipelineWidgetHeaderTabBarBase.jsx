import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";
import { pipelineHelper } from "components/workflow/pipeline.helper";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";

export const PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS = {
  SUMMARY: "summary",
  ACTIVITY_LOGS: "activity_logs",
  ANALYTICS: "analytics",
  MORE_DETAILS: "more_details",
};

export default function SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase(
  {
    selectedHeaderItem,
    setSelectedHeaderItem,
    selectedWorkflow,
    setSelectedWorkflow,
  }) {
  const history = useHistory();
  const {
    themeConstants,
  } = useComponentStateReference();

  const handleHeaderItemClick = () => {
    history.push(pipelineHelper.getDetailViewLink(selectedWorkflow?._id));
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
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY}
        screenLabel={"Summary"}
        setCurrentScreen={setSelectedHeaderItem}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.ACTIVITY_LOGS}
        screenLabel={"Activity Logs"}
        setCurrentScreen={setSelectedHeaderItem}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.ANALYTICS}
        screenLabel={"Analytics"}
        setCurrentScreen={setSelectedHeaderItem}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WORKFLOW_WIDGET_HEADER_ITEMS.MORE_DETAILS}
        screenLabel={"Full Details"}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
    </div>
  );
}

SoftwareDevelopmentLandingWorkspacePipelineWidgetHeaderTabBarBase.propTypes = {
  selectedHeaderItem: PropTypes.string,
  setSelectedHeaderItem: PropTypes.func,
  selectedWorkflow: PropTypes.object,
  setSelectedWorkflow: PropTypes.func,
};
