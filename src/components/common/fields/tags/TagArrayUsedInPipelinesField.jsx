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
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import TagsUsedInPipelineTable from 'components/reports/tags/pipelines/TagsUsedInPipelineTable';

function TagArrayUsedInPipelinesField({ tags }) {
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
  }, [tags]);

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
    if (Array.isArray(tags) && tags.length > 0) {
      const response = await adminTagsActions.getRelevantPipelinesV2(getAccessToken, cancelSource, tags);

      if (response?.data != null) {
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
              />
            </Col>
          );
        })}
      </Row>
    );
  };


  if (isLoading) {
    return <LoadingDialog message={"Loading Pipelines"} size={"sm"} />;
  }

  if (!isLoading && (tags == null || tags.length === 0)) {
    return null;
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          This tag combination is not currently used in any pipeline</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-text text-muted mb-2">
        <span>This tag combination is used in {pipelines.length} pipelines</span>
      </div>
      {getPipelineCards()}
      <TagsUsedInPipelineTable data={pipelines} loadData={loadData} isLoading={isLoading} isMounted={isMounted}/>
      {console.log(pipelines)}
    </div>
  );
}

TagArrayUsedInPipelinesField.propTypes = {
  tags: PropTypes.array,
};

export default TagArrayUsedInPipelinesField;