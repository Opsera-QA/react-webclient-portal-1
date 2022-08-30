import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";

export const TASK_WIDGET_HEADER_ITEMS = {
  SUMMARY: "summary",
  LOGS: "logs",
  METRICS: "metrics",
  MORE: "more",
  SELECT_ANOTHER_WORKFLOW: "select_another_workflow",
};

export default function FreeTrialLandingTaskWidgetHeaderTabBar(
  {
    selectedHeaderItem,
    setSelectedHeaderItem,
    selectedTask,
    setSelectedTask,
  }) {
  const history = useHistory();
  const {
    themeConstants,
  } = useComponentStateReference();

  const handleHeaderItemClick = (selectedOption) => {
    switch (selectedOption) {
      case TASK_WIDGET_HEADER_ITEMS.SUMMARY:
        setSelectedHeaderItem(TASK_WIDGET_HEADER_ITEMS.SUMMARY);
        break;
      case TASK_WIDGET_HEADER_ITEMS.LOGS:
        setSelectedHeaderItem(TASK_WIDGET_HEADER_ITEMS.LOGS);
        break;
      case TASK_WIDGET_HEADER_ITEMS.METRICS:
        setSelectedHeaderItem(TASK_WIDGET_HEADER_ITEMS.METRICS);
        break;
      case TASK_WIDGET_HEADER_ITEMS.SELECT_ANOTHER_WORKFLOW:
        setSelectedTask(undefined);
        break;
      case TASK_WIDGET_HEADER_ITEMS.MORE:
        default:
          history.push(`/task/details/${selectedTask?.getMongoDbId()}`);
    }
  };

  if (selectedTask == null) {
    return null;
  }

  return (
    <div className={"w-100 d-flex my-2"}>
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={TASK_WIDGET_HEADER_ITEMS.SUMMARY}
        screenLabel={"Summary"}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={TASK_WIDGET_HEADER_ITEMS.LOGS}
        screenLabel={"Logs"}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={TASK_WIDGET_HEADER_ITEMS.METRICS}
        screenLabel={"Metrics"}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={TASK_WIDGET_HEADER_ITEMS.MORE}
        screenLabel={"More..."}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={TASK_WIDGET_HEADER_ITEMS.SELECT_ANOTHER_WORKFLOW}
        screenLabel={"Select another Workflow..."}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
    </div>
  );
}

FreeTrialLandingTaskWidgetHeaderTabBar.propTypes = {
  selectedHeaderItem: PropTypes.string,
  setSelectedHeaderItem: PropTypes.func,
  selectedTask: PropTypes.object,
  setSelectedTask: PropTypes.func,
};
