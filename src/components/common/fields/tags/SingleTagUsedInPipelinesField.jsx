import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import Model from "core/data_model/model";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import LoadingIcon from "components/common/icons/LoadingIcon";
import LoadingDialog from "components/common/status_notifications/loading";

function SingleTagUsedInPipelinesField({ tag, closePanel, className }) {
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [tag]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadPipelines(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadPipelines = async (cancelSource = cancelTokenSource) => {
    if (tag != null) {
      const response = await adminTagsActions.getRelevantPipelinesV2(getAccessToken, cancelSource, [tag]);

      if (isMounted?.current === true && response?.data != null) {
        setPipelines(response?.data?.data);
      }
    }
  };

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

  if (isLoading) {
    return <div className={"my-2"}><LoadingDialog size={"md"} message={"Loading Pipeline Usage"} isLoading={isLoading} /></div>;
  }

  if (!isLoading && (tag == null || tag === "")) {
    return null;
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className={className}>
        <div className="text-muted mb-2">
          <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          This tag is not currently applied on any pipeline</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-muted mb-2">
        <span>This tag is applied on {pipelines.length} pipeline{pipelines?.length !== 1 ? 's' : ''}</span>
      </div>
      {getPipelineCards()}
    </div>
  );
}

SingleTagUsedInPipelinesField.propTypes = {
  tag: PropTypes.object,
  closePanel: PropTypes.func,
  className: PropTypes.string
};

export default SingleTagUsedInPipelinesField;