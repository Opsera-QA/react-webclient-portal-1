import React, {useState} from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export function PipelineSelectionCard(
  {
    pipeline, 
    selectedPipelines, 
    setSelectedPipelines,
  }) {
  const [pipelineSelected, setUserSelected] = useState(false);

  const selectUser = () => {
    let selectUser = !pipelineSelected;
    setUserSelected(selectUser);

    if (selectUser) {
      if (!selectedPipelines.includes(pipeline)) {
        selectedPipelines.push(pipeline);
        setSelectedPipelines([...selectedPipelines]);
      }
    } else {
      if (selectedPipelines.includes(pipeline)) {
        let newSelectedUsers = selectedPipelines.filter(selectedPipeline => selectedPipeline._id !== pipeline?._id);
        setSelectedPipelines([...newSelectedUsers]);
      }
    }
  };

  return (
    <li key={pipeline._id} className={selectedPipelines.includes(pipeline) ? "p-1 member-list selected" : "p-1 member-list"} onClick={selectUser}>
      <Row className={"mx-0"}>
        <Col lg={12} xl={6} className={"no-wrap-inline"}>{pipeline.name}</Col>
        <Col lg={12} xl={6} className={selectedPipelines.includes(pipeline) ? "d-flex w-100" : "d-flex w-100 text-muted"}>
          <div>{pipeline.owner_name}</div>
        </Col>
      </Row>
    </li>
  );
}

PipelineSelectionCard.propTypes = {
  pipeline: PropTypes.object,
  selectedPipelines: PropTypes.array,
  setSelectedPipelines: PropTypes.func,
};
