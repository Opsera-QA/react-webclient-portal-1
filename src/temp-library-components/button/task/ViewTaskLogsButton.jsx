import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {taskHelper} from "components/tasks/task.helper";

export default function ViewTaskLogsButton(
  {
    taskId,
    buttonText,
    buttonSize,
    variant,
    className,
  }) {
  const history = useHistory();
  const { toastContext } = useComponentStateReference();

  const handleLoadFunction = async () => {
    history.push(`${taskHelper.getDetailViewLink(taskId)}/logs`);
    toastContext.clearOverlayPanel();
  };

  if (isMongoDbId(taskId) !== true) {
    return null;
  }

  return (
    <VanityButtonBase
      onClickFunction={handleLoadFunction}
      normalText={buttonText}
      variant={variant}
      buttonSize={buttonSize}
      className={className}
      icon={faClipboardList}
    />
  );
}

ViewTaskLogsButton.propTypes = {
  taskId: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  buttonSize: PropTypes.string,
  className: PropTypes.string,
};

ViewTaskLogsButton.defaultProps = {
  buttonText: "View Logs",
};
