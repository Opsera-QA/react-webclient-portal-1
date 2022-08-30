import React, { useState } from "react";
import PropTypes from "prop-types";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import FreeTrialLandingTaskWidgetHeaderTabBar
  , { TASK_WIDGET_HEADER_ITEMS } from "components/trial/landing/widgets/tasks/FreeTrialLandingTaskWidgetHeaderTabBar";
import FreeTrialLandingTaskWidgetBody from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetBody";

export default function FreeTrialLandingTaskWorkflowWidget(
  {
    className,
    selectedTask,
    setSelectedTask,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(TASK_WIDGET_HEADER_ITEMS.SUMMARY);
  const [isLoading, setIsLoading] = useState(false);
  const [taskIsLoading, setTaskIsLoading] = useState(false);

  const getTitleBar = () => {
    return (
      <div className={"w-100"}>
        {selectedTask?.getData("name")}
      </div>
    );
  };

  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        title={getTitleBar()}
        isLoading={isLoading || taskIsLoading}
      >
        <FreeTrialLandingTaskWidgetHeaderTabBar
          selectedHeaderItem={selectedHeaderItem}
          setSelectedHeaderItem={setSelectedHeaderItem}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <FreeTrialLandingTaskWidgetBody
          selectedHeaderItem={selectedHeaderItem}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          isLoading={isLoading}
          setIsLoading={setTaskIsLoading}
        />
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

FreeTrialLandingTaskWorkflowWidget.propTypes = {
  className: PropTypes.string,
  selectedTask: PropTypes.object,
  setSelectedTask: PropTypes.func,
};
