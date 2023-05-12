import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";
import {taskHelper} from "components/tasks/task.helper";

export default function ViewTaskButton(
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
    history.push(taskHelper.getDetailViewLink(taskId));
    toastContext.clearOverlayPanel();
  };

  if (isMongoDbId(taskId) == null) {
    return null;
  }

  return (
    <VanityButtonBase
      onClickFunction={handleLoadFunction}
      normalText={buttonText}
      variant={variant}
      buttonSize={buttonSize}
      className={className}
      icon={faSearchPlus}
    />
  );
}

ViewTaskButton.propTypes = {
  taskId: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.string,
  buttonSize: PropTypes.string,
  className: PropTypes.string,
};

ViewTaskButton.defaultProps = {
  buttonText: "View Task",
};
