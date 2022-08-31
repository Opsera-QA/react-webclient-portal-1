import React, { useState } from "react";
import PropTypes from "prop-types";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import FreeTrialLandingWorkflowWidgetHeaderTabBarBase
  , {
  FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS,
} from "components/trial/landing/widgets/workflow/FreeTrialLandingWorkflowWidgetHeaderTabBarBase";
import FreeTrialLandingTaskWidgetBody from "components/trial/landing/widgets/tasks/body/FreeTrialLandingTaskWidgetBody";

export default function FreeTrialLandingTaskWorkflowWidget(
  {
    className,
    selectedTask,
    setSelectedTask,
  }) {
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(FREE_TRIAL_LANDING_WORKFLOW_WIDGET_HEADER_ITEMS.SUMMARY);
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
        <FreeTrialLandingWorkflowWidgetHeaderTabBarBase
          selectedHeaderItem={selectedHeaderItem}
          setSelectedHeaderItem={setSelectedHeaderItem}
          selectedWorkflow={selectedTask}
          setSelectedWorkflow={setSelectedTask}
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
