import React from "react";
import PropTypes from "prop-types";
import Tab from "react-bootstrap/Tab";
import {Col, Nav, Row} from "react-bootstrap";
import PipelineStepDetailsOverview from "components/workflow/pipelines/overview/PipelineStepDetailsOverview";

function PipelineOverviewContainer({ pipelineSteps }) {
  // TODO: Make own component
  const getPipelineStepTree = () => {
    return (
      <Col sm={2} className={"pr-0"}>
        <div className="blueprint-title mb-3">Pipeline Steps</div>
        <Nav variant={"pills"} className="flex-column">
          <div className={"scroll-y"}>
            {pipelineSteps.map((pipelineStep, index) => (
              <>
                <Nav.Item key={index}>
                  <Nav.Link key={index} eventKey={index}>
                    {`Step ${index + 1}: ${pipelineStep?.name}`}
                  </Nav.Link>
                </Nav.Item>
              </>
            ))}
          </div>
        </Nav>
      </Col>
    );
  };

  if (!Array.isArray(pipelineSteps) || pipelineSteps.length === 0) {
    return (
      <span>No Pipeline Steps Configured Yet</span>
    );
  }

  return (
    <div className="mb-1 mt-3 bordered-content-block p-3 w-100">
      <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
        <Row>
          {getPipelineStepTree()}
          <Col sm={10}>
            <Tab.Content>
              {pipelineSteps.map((pipelineStep, index) => (
                <Tab.Pane key={index} eventKey={index}>
                  <PipelineStepDetailsOverview pipelineStep={pipelineStep} index={index} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}


PipelineOverviewContainer.propTypes = {
  pipelineSteps: PropTypes.array,
};

export default PipelineOverviewContainer;