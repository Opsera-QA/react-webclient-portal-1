import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Tab from "react-bootstrap/Tab";
import {Col, Nav, Row} from "react-bootstrap";
import PipelineStepDetailsOverview from "components/workflow/pipelines/overview/PipelineStepDetailsOverview";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import TitleBarBase from "components/common/fields/TitleBarBase";
import PipelineOverviewStepTree from "components/workflow/pipelines/overview/PipelineOverviewStepTree";
import sourceRepositoryConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/source-repository-configuration-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import PipelineSourceRepositorySummaryPanel
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySummaryPanel";
import PipelineStepDetailsContainer from "components/workflow/pipelines/overview/PipelineStepDetailsContainer";

function PipelineOverviewContainer({ pipeline }) {
  const [pipelineSteps, setPipelineSteps] = useState([]);

  useEffect(() => {
    const steps = pipeline?.workflow?.plan;
    setPipelineSteps([]);

    if (Array.isArray(steps)) {
      setPipelineSteps(steps);
    }
  }, [JSON.stringify(pipeline)]);

  // TODO: Make own component. Perhaps, make container for tree and tab content and don't put tab content in this component.
  const getPipelineOverStepTabContent = () => {
    return (
      <Tab.Content>
        <Tab.Pane key={-1} eventKey={-1}>
          <PipelineStepDetailsContainer title={`Pipeline Source Configuration`}>
            <PipelineSourceRepositorySummaryPanel
              sourceRepositoryModel={modelHelpers.parseObjectIntoModel(pipeline?.workflow?.source, sourceRepositoryConfigurationMetadata)}
            />
          </PipelineStepDetailsContainer>
        </Tab.Pane>
        {pipelineSteps.map((pipelineStep, index) => (
          <Tab.Pane key={index} eventKey={index}>
            <PipelineStepDetailsOverview pipelineStep={pipelineStep} index={index} />
          </Tab.Pane>
        ))}
      </Tab.Content>
    );
  };

  if (!Array.isArray(pipelineSteps) || pipelineSteps.length === 0) {
    return (
      <span>No Pipeline Steps Configured Yet</span>
    );
  }

  return (
    <div>
      <div className="object-properties-input">
        <div className="content-container">
          <TitleBarBase title={`${pipeline?.name} Pipeline Summary`} icon={faDraftingCompass} />
          <Tab.Container defaultActiveKey={0}>
            <Row className={"makeup-container-body mx-0"}>
              <Col sm={2} className={"px-0"}>
                <PipelineOverviewStepTree pipelineSteps={pipelineSteps} />
              </Col>
              <Col sm={10} className={"px-0"}>
                {getPipelineOverStepTabContent()}
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
      <div className={"object-properties-footer"} />
    </div>
  );
}


PipelineOverviewContainer.propTypes = {
  pipeline: PropTypes.object,
};

export default PipelineOverviewContainer;