import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import {taskHelper} from "components/tasks/task.helper";

export default function TaskFooter({ taskModel }) {
  const { themeConstants } = useComponentStateReference();
  const color = taskHelper.getTaskColor(taskModel, themeConstants);

  return (
    <div
      style={{
        backgroundColor: color,
        color: themeConstants.COLOR_PALETTE.WHITE,
      }}
      className={"py-1 overlay-footer"}
    >
      <CenteredContentWrapper>
        <span>Task</span>
      </CenteredContentWrapper>
    </div>
  );
}

TaskFooter.propTypes = {
  taskModel: PropTypes.object,
};
