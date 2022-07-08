import React from "react";
import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import PipelineCard from "components/workflow/pipelines/PipelineCard";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import modelHelpers from "components/common/model/modelHelpers";

// TODO: Combine with the one in pipelines if we can make it generic
function ImportPipelineSelectionCardView(
  {
    pipelines,
    pipelineFilterModel,
    loadData,
    isLoading,
    subscribedPipelineIds,
    onSelectFunction,
  }) {

  const getSelectButtonFunction = (pipeline) => {
    return (
      <Button
        variant={"primary"}
        size={"sm"}
        onClick={() => onSelectFunction(pipeline)}>
        <IconBase icon={faCheckCircle} className={"mr-1"}/>Import Settings
      </Button>
    );
  };

  const getCards = () => {
    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      return null;
    }

    return (
      <Row className={"mx-0"}>
        {pipelines.map((pipeline, idx) => (
          <Col key={idx} xl={6} md={12} className="p-2">
            <PipelineCard
              pipeline={pipeline}
              subscribedPipelineIds={subscribedPipelineIds}
              pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
              getSelectButtonFunction={getSelectButtonFunction}
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
  subscribedPipelineIds: PropTypes.array,
  onSelectFunction: PropTypes.func,
};

export default ImportPipelineSelectionCardView;