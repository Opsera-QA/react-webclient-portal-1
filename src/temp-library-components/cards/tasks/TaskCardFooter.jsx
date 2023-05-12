import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import {taskHelper} from "components/tasks/task.helper";

export default function TaskCardFooter({ taskModel }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <CardFooterBase
      backgroundColor={taskHelper.getTaskColor(taskModel?.getData("status"), themeConstants)}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Task"}
    />
  );
}

TaskCardFooter.propTypes = {
  taskModel: PropTypes.object,
};
