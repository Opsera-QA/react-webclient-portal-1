import React, {useState} from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {truncateString} from "components/common/helpers/string-helpers";

export function TaskSelectionCard(
  {
    task,
    selectedTasks,
    setSelectedTasks,
    disabled,
    stacked,
  }) {
  const [taskSelected, setTaskSelected] = useState(false);

  const selectTask = () => {
    const selectTask = !taskSelected;
    setTaskSelected(selectTask);

    if (selectTask) {
      if (!selectedTasks.includes(task)) {
        selectedTasks.push(task);
        setSelectedTasks([...selectedTasks]);
      }
    } else {
      if (selectedTasks.includes(task)) {
        setSelectedTasks([...selectedTasks.filter(selectedTask => selectedTask._id !== task?._id)]);
      }
    }
  };

  const getClassNames = () => {
    let classNames = "py-1";

    if (selectedTasks.includes(task)) {
      classNames += " selected";
    }

    if (disabled !== true) {
      classNames += " pointer";
    }

    return classNames;
  };

  return (
    <div
      key={task._id}
      className={getClassNames()}
      onClick={disabled !== true ? selectTask : undefined}
    >
      <Row className={"mx-0"}>
        <Col lg={12} xl={stacked !== true ? 6 : 12}>{truncateString(task.name, 50)}</Col>
        <Col lg={12} xl={stacked !== true ? 6 : 12} className={selectedTasks.includes(task) ? "d-flex w-100" : "d-flex w-100"}>
          <div>{task.owner_name}</div>
        </Col>
      </Row>
    </div>
  );
}

TaskSelectionCard.propTypes = {
  task: PropTypes.object,
  selectedTasks: PropTypes.array,
  setSelectedTasks: PropTypes.func,
  disabled: PropTypes.bool,
  stacked: PropTypes.bool,
};
