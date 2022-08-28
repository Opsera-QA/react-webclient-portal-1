import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import HeaderNavigationBarItem from "components/header/navigation_bar/HeaderNavigationBarItem";
import { PIPELINE_WIDGET_HEADER_ITEMS } from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTitleBar";

export default function PipelinesWidgetHeaderTabBar(
  {
    selectedHeaderItem,
    setSelectedHeaderItem,
    selectedPipeline,
    setSelectedPipeline,
  }) {
  const history = useHistory();
  const {
    themeConstants,
  } = useComponentStateReference();

  const handleHeaderItemClick = (selectedOption) => {
    switch (selectedOption) {
      case PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE:
        setSelectedHeaderItem(PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE);
        break;
      case PIPELINE_WIDGET_HEADER_ITEMS.LOGS:
        setSelectedHeaderItem(PIPELINE_WIDGET_HEADER_ITEMS.LOGS);
        break;
      case PIPELINE_WIDGET_HEADER_ITEMS.METRICS:
        setSelectedHeaderItem(PIPELINE_WIDGET_HEADER_ITEMS.METRICS);
        break;
      case PIPELINE_WIDGET_HEADER_ITEMS.SELECT_ANOTHER_WORKFLOW:
        setSelectedPipeline(undefined);
        break;
      case PIPELINE_WIDGET_HEADER_ITEMS.MORE:
        default:
          history.push(`/workflow/details/${selectedPipeline?._id}/summary`);
    }
  };

  if (selectedPipeline == null) {
    return null;
  }

  return (
    <div className={"w-100 d-flex my-2"}>
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE}
        screenLabel={"Pipeline"}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WIDGET_HEADER_ITEMS.LOGS}
        screenLabel={"Logs"}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WIDGET_HEADER_ITEMS.METRICS}
        screenLabel={"Metrics"}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WIDGET_HEADER_ITEMS.MORE}
        screenLabel={"More..."}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
      <HeaderNavigationBarItem
        currentScreen={selectedHeaderItem}
        screenName={PIPELINE_WIDGET_HEADER_ITEMS.SELECT_ANOTHER_WORKFLOW}
        screenLabel={"Select another Workflow..."}
        setCurrentScreen={handleHeaderItemClick}
        className={"my-auto"}
        fontColor={themeConstants.COLOR_PALETTE.BLACK}
      />
    </div>
  );
}

PipelinesWidgetHeaderTabBar.propTypes = {
  selectedHeaderItem: PropTypes.string,
  setSelectedHeaderItem: PropTypes.func,
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
};
