import React from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import PipelineCard from "components/workflow/pipelines/PipelineItem";
import Model from "core/data_model/model";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";

function PipelineCardView({ data, pipelineFilterDto, setPipelineFilterDto, loadData, isLoading }) {
  const getCards = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <Row className={"mx-0"}>
        {data.map((item, idx) => (
          <Col key={idx} xl={6} md={12} className="p-2">
            <PipelineCard item={item} dataModel={new Model({...item}, pipelineMetadata, false)}/>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setPipelineFilterDto}
      paginationDto={pipelineFilterDto}
      cards={getCards()}
    />
  );
}

PipelineCardView.propTypes = {
  data: PropTypes.array,
  pipelineFilterDto: PropTypes.object,
  setPipelineFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default PipelineCardView;