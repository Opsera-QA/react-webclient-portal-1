import PropTypes from "prop-types";
import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskCardFooter from "temp-library-components/cards/tasks/TaskCardFooter";
import TaskCardHeader from "temp-library-components/cards/tasks/TaskCardHeader";
import CardIconTitleBar from "components/common/fields/title/CardIconTitleBar";
import SelectionIconCard from "components/common/card_containers/SelectionIconCard";
import TaskCardBody from "temp-library-components/cards/tasks/TaskCardBody";
import {getLargeVendorIconComponentFromTaskType} from "components/common/helpers/icon-helpers";

export default function TaskCardBase(
  {
    taskModel,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    const type = taskModel?.getData("type");
    const icon = getLargeVendorIconComponentFromTaskType(type);

    return (
      <CardIconTitleBar
        formattedIcon={icon}
        title={`${taskModel?.getData("name")}`}
        className={"mx-1"}
        iconSize={"4x"}
      />
    );
  };

  if (taskModel == null) {
    return undefined;
  }

  return (
    <SelectionIconCard
      cardHeader={<TaskCardHeader taskModel={taskModel} />}
      titleBar={getTitleBar()}
      contentBody={<TaskCardBody taskModel={taskModel} />}
      cardFooter={<TaskCardFooter taskModel={taskModel} />}
      onClickFunction={onClickFunction ? () => onClickFunction(taskModel) : undefined}
      tooltip={tooltip}
      selectedOption={selectedOption}
      option={option}
      highlightedBorderColor={themeConstants.RESOURCE_COLORS.TASKS}
    />
  );
}

TaskCardBase.propTypes = {
  taskModel: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
};