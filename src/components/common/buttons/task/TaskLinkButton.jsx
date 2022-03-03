import React from "react";
import PropTypes from "prop-types";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function TaskLinkButton({taskId, openInNewWindow, className, variant, closePanel}) {
  let history = useHistory();

  const loadTool = () => {
    if (openInNewWindow) {
      window.open(`/task/details/${taskId}`);
    }
    else {
      history.push(`/task/details/${taskId}`);

      if (closePanel) {
        closePanel();
      }
    }
  };

  return (
    <Button onClick={() => loadTool()} className={className ? className : "mb-2 small"} size={"sm"} variant={variant}>
      <span className="my-auto"><IconBase icon={faTasks} className={"mr-2"}/>View</span>
    </Button>
  );
}

TaskLinkButton.propTypes = {
  taskId: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  closePanel: PropTypes.func
};

export default TaskLinkButton;
