import React, {useState} from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {truncateString} from "components/common/helpers/string-helpers";

export function ToolSelectionCard(
  {
    tool,
    selectedTools,
    setSelectedTools,
    disabled,
    stacked,
  }) {
  const [toolSelected, setToolSelected] = useState(false);

  const selectTool = () => {
    const selectTool = !toolSelected;
    setToolSelected(selectTool);

    if (selectTool) {
      if (!selectedTools.includes(tool)) {
        selectedTools.push(tool);
        setSelectedTools([...selectedTools]);
      }
    } else {
      if (selectedTools.includes(tool)) {
        setSelectedTools([...selectedTools.filter(selectedTool => selectedTool._id !== tool?._id)]);
      }
    }
  };

  const getClassNames = () => {
    let classNames = "py-1";

    if (selectedTools.includes(tool)) {
      classNames += " selected";
    }

    if (disabled !== true) {
      classNames += " pointer";
    }

    return classNames;
  };

  return (
    <div
      key={tool._id}
      className={getClassNames()}
      onClick={disabled !== true ? selectTool : undefined}
    >
      <Row className={"mx-0"}>
        <Col lg={12} xl={stacked !== true ? 6 : 12}>{truncateString(tool.name, 50)}</Col>
        <Col lg={12} xl={stacked !== true ? 6 : 12} className={selectedTools.includes(tool) ? "d-flex w-100" : "d-flex w-100"}>
          <div>{tool.owner_name}</div>
        </Col>
      </Row>
    </div>
  );
}

ToolSelectionCard.propTypes = {
  tool: PropTypes.object,
  selectedTools: PropTypes.array,
  setSelectedTools: PropTypes.func,
  disabled: PropTypes.bool,
  stacked: PropTypes.bool,
};
