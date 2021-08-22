import React from "react";
import PropTypes from "prop-types";
import {Col, Nav} from "react-bootstrap";

function PipelineOverviewStepTree({ pipelineSteps }) {
  // TODO: Make own component
  //   Make MakeupTreeBase Component
  //   Make MakeupTreeItem Component
  if (!Array.isArray(pipelineSteps) || pipelineSteps.length === 0) {
    return (
      <span>No Pipeline Steps Configured Yet</span>
    );
  }


  //   TODO: Make MakeupTreeBase Component
  //   Make MakeupTreeItem Component
  return (
    <div className={"scroll-y makeup-tree-container"}>
      <div className="p-2 makeup-tree-title">Pipeline Steps</div>
      <Nav variant={"pills"} className={"flex-column"}>
        <div className={"scroll-y h-75 p-2"}>
          {pipelineSteps.map((pipelineStep, index) => (
            <Nav.Item key={index}>
              <Nav.Link key={index} eventKey={index}>
                {`Step ${index + 1}: ${pipelineStep?.name}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </div>
      </Nav>
    </div>
  );
}


PipelineOverviewStepTree.propTypes = {
  pipelineSteps: PropTypes.object,
};

export default PipelineOverviewStepTree;