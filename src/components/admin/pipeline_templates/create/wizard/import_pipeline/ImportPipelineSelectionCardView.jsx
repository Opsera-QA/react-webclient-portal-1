import React from "react";
import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import modelHelpers from "components/common/model/modelHelpers";
import PipelineCardBase from "temp-library-components/cards/pipelines/PipelineCardBase";

// TODO: Combine with the one in pipelines if we can make it generic
function ImportPipelineSelectionCardView(
  {
    pipelines,
    pipelineFilterModel,
    loadData,
    isLoading,
    onSelectFunction,
  }) {

  const getCards = () => {
    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      return null;
    }

    return (
      <Row className={"mx-0"}>
        {pipelines.map((pipeline, idx) => (
          <Col key={idx} xl={6} md={12} className="p-2">
            <PipelineCardBase
              pipeline={pipeline}
              onClickFunction={() => onSelectFunction(pipeline)}
              pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={pipelineFilterModel}
      cards={getCards()}
    />
  );
}

ImportPipelineSelectionCardView.propTypes = {
  pipelines: PropTypes.array,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  onSelectFunction: PropTypes.func,
};

export default ImportPipelineSelectionCardView;