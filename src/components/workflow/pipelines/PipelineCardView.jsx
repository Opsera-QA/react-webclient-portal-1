import React from "react";
import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import PipelineCard from "components/workflow/pipelines/PipelineCard";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { useHistory } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import modelHelpers from "components/common/model/modelHelpers";

function PipelineCardView({ pipelines, pipelineFilterModel, loadData, isLoading, subscribedPipelineIds }) {
  let history = useHistory();

  const handleDetailsClick = (pipelineId) => e => {
    e.preventDefault();
    history.push(`/workflow/details/${pipelineId}/summary`);
  };

  const getSelectButton = (pipeline) => {
    return (
      <Button
        variant={"primary"}
        size={"sm"}
        className={"w-50"}
        onClick={handleDetailsClick(pipeline?._id)}>
        <IconBase icon={faSearch} className={"mr-1"}/>View
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
              getSelectButtonFunction={getSelectButton}
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

PipelineCardView.propTypes = {
  pipelines: PropTypes.array,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  subscribedPipelineIds: PropTypes.array,
};

export default PipelineCardView;