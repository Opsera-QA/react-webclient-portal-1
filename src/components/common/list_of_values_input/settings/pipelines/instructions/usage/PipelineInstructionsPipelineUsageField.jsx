import React from "react";
import PropTypes from "prop-types";
import { faExclamationCircle } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";
import useGetPipelinesByPipelineInstructionsUsage
  from "components/common/list_of_values_input/settings/pipelines/instructions/usage/useGetPipelinesByPipelineInstructionsUsage";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function PipelineInstructionsPipelineUsageField(
  {
    pipelineInstructionsId,
    closePanel,
    className,
  }) {
  const {
    pipelines,
    setPipelines,
    isLoading,
    error,
    loadData,
  } = useGetPipelinesByPipelineInstructionsUsage(pipelineInstructionsId);

  const getPipelineCards = () => {
    return (
      <Row>
        {pipelines.map((pipeline) => {
          return (
            <Col md={6} key={pipeline._id}>
              <PipelineSummaryCard
                pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)}
                loadPipelineInNewWindow={false}
                closePanelFunction={closePanel}
              />
            </Col>
          );
        })}
      </Row>
    );
  };

  if (isMongoDbId(pipelineInstructionsId) !== true) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={"my-2"}>
        <LoadingDialog
          size={"md"}
          message={"Loading Pipeline Usage"}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className={className}>
        <div className="text-muted mb-2">
          <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          These Pipeline Instructions are not currently in use by any Pipeline</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-muted mb-2">
        <span>This set of Pipeline Instructions is in use by {pipelines.length} pipeline{pipelines?.length !== 1 ? "s" : ""}</span>
      </div>
      {getPipelineCards()}
    </div>
  );
}

PipelineInstructionsPipelineUsageField.propTypes = {
  pipelineInstructionsId: PropTypes.string,
  closePanel: PropTypes.func,
  className: PropTypes.string,
};