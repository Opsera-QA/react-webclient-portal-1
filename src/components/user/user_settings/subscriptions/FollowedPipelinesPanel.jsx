import React from "react";
import Model from "core/data_model/model";
import Col from "react-bootstrap/Col";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import Row from "react-bootstrap/Row";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import useGetPipelines from "hooks/workflow/pipelines/useGetPipelines";

function FollowedPipelinesPanel({className}) {
  const {
    pipelines,
    isLoading,
    error,
  } = useGetPipelines(
    undefined,
    undefined,
    false,
    undefined,
    true
  );

  const getBody = () => {
    if (isLoading === true) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading Pipeline Subscriptions</div>;
    }

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      return (
        <div className={"form-text text-muted ml-3"}>
          <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          You are not currently following to any Pipelines</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={"mb-2"}>You are currently following <strong>{pipelines?.length}</strong> pipelines.</div>
        <Row>
          {pipelines.map((pipeline) => {
            return (
              <Col md={6} key={pipeline?._id}>
                <PipelineSummaryCard
                  pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)}
                  loadPipelineInNewWindow={false}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  if (isLoading) {
    return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading Pipeline Subscriptions</div>;
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          You are not currently following any Pipelines</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {getBody()}
    </div>
  );
}

FollowedPipelinesPanel.propTypes = {
  className: PropTypes.string
};

export default FollowedPipelinesPanel;
