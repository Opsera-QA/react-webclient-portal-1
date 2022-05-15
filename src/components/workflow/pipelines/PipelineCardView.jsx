import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import PipelineCard from "components/workflow/pipelines/PipelineCard";
import Model from "core/data_model/model";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import VanitySetCardView from "components/common/card/VanitySetCardView";

function PipelineCardView({ data, pipelineFilterModel, loadData, isLoading, subscribedPipelineIds }) {
  const getCards = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <Row className={"mx-0"}>
        {data.map((pipeline, idx) => (
          <Col key={idx} xl={6} md={12} className="p-2">
            <PipelineCard
              pipeline={pipeline}
              subscribedPipelineIds={subscribedPipelineIds}
              pipelineModel={new Model({...pipeline}, pipelineMetadata, false)}
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
  data: PropTypes.array,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  subscribedPipelineIds: PropTypes.array,
};

export default PipelineCardView;