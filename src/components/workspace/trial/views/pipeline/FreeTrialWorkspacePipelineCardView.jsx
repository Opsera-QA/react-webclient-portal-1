import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { useHistory } from "react-router-dom";
import modelHelpers from "components/common/model/modelHelpers";
import WorkspacePipelineCardBase from "components/workspace/cards/WorkspacePipelineCardBase";

export default function FreeTrialWorkspacePipelineCardView(
  {
    pipelines,
    pipelineFilterModel,
    loadData,
    isLoading,
  }) {
  const history = useHistory();

  const handleDetailsClick = (pipelineId) => {
    history.push(`/workflow/details/${pipelineId}/summary`);
  };

  const getCards = () => {
    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      return null;
    }

    return (
      <Row className={"mx-0"}>
        {pipelines.map((pipeline, index) => (
          <Col
            key={index}
            xl={3}
            lg={4}
            md={6}
            sm={12}
            className={"p-2"}
          >
            <WorkspacePipelineCardBase
              pipelineModel={modelHelpers.parseObjectIntoModel(pipeline, pipelineMetadata)}
              onClickFunction={() => handleDetailsClick(pipeline?._id)}
              tooltip={"Click to view Pipeline"}
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

FreeTrialWorkspacePipelineCardView.propTypes = {
  pipelines: PropTypes.array,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};