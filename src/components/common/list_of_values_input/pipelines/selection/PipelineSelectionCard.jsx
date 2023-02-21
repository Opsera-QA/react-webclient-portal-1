import React, {useState} from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {truncateString} from "components/common/helpers/string-helpers";

export function PipelineSelectionCard(
  {
    pipeline,
    selectedPipelines,
    setSelectedPipelines,
    disabled,
    stacked,
  }) {
  const [pipelineSelected, setPipelineSelected] = useState(false);

  const selectPipeline = () => {
    const selectPipeline = !pipelineSelected;
    setPipelineSelected(selectPipeline);

    if (selectPipeline) {
      if (!selectedPipelines.includes(pipeline)) {
        selectedPipelines.push(pipeline);
        setSelectedPipelines([...selectedPipelines]);
      }
    } else {
      if (selectedPipelines.includes(pipeline)) {
        setSelectedPipelines([...selectedPipelines.filter(selectedPipeline => selectedPipeline._id !== pipeline?._id)]);
      }
    }
  };

  const getClassNames = () => {
    let classNames = "py-1";

    if (selectedPipelines.includes(pipeline)) {
      classNames += " selected";
    }

    if (disabled !== true) {
      classNames += " pointer";
    }

    return classNames;
  };

  return (
    <div
      key={pipeline._id}
      className={getClassNames()}
      onClick={disabled !== true ? selectPipeline : undefined}
    >
      <Row className={"mx-0"}>
        <Col lg={12} xl={stacked !== true ? 6 : 12}>{truncateString(pipeline.name, 50)}</Col>
        <Col lg={12} xl={stacked !== true ? 6 : 12} className={selectedPipelines.includes(pipeline) ? "d-flex w-100" : "d-flex w-100"}>
          <div>{pipeline.owner_name}</div>
        </Col>
      </Row>
    </div>
  );
}

PipelineSelectionCard.propTypes = {
  pipeline: PropTypes.object,
  selectedPipelines: PropTypes.array,
  setSelectedPipelines: PropTypes.func,
  disabled: PropTypes.bool,
  stacked: PropTypes.bool,
};
