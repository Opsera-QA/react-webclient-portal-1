import React from "react";
import PropTypes from "prop-types";
import {Nav} from "react-bootstrap";

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
    <div className={"makeup-tree-container h-100"}>
      <div className="p-2 makeup-tree-title">Pipeline Steps</div>
      <Nav variant={"pills"} className={"flex-column"} defaultActiveKey={-1}>
        <div className={"h-100"}>
          <div className={"makeup-tree-container-body p-2"}>
            <Nav.Item key={0}>
              <Nav.Link key={0} eventKey={0}>
                {`Source Repository Configuration`}
              </Nav.Link>
            </Nav.Item>
            {pipelineSteps.map((pipelineStep, index) => (
              <Nav.Item key={index + 1}>
                <Nav.Link key={index + 1} eventKey={index + 1}>
                  {`Step ${index + 1}: ${pipelineStep?.name}`}
                </Nav.Link>
              </Nav.Item>
            ))}
          </div>
        </div>
      </Nav>
    </div>
  );
}


PipelineOverviewStepTree.propTypes = {
  pipelineSteps: PropTypes.array,
};

export default PipelineOverviewStepTree;