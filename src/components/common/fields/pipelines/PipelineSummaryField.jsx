import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import FieldLabel from "components/common/fields/FieldLabel";
import axios from "axios";

function PipelineSummaryField({ model, fieldName, pipelineId }) {
  const {getAccessToken} = useContext(AuthContext);
  const [field] = useState(model?.getFieldById(fieldName));
  const [isLoading, setIsLoading] = useState(false);
  const [pipeline, setPipeline] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setPipeline(undefined);
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (pipelineId != null && pipelineId !== "") {
        const response = await pipelineActions.getPipelineSummariesV2(getAccessToken, cancelSource, [pipelineId]);
        const pipelines = response?.data;

        if (isMounted?.current === true && Array.isArray(pipelines) && pipelines.length > 0) {
          setPipeline(pipelines[0]);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      if(isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPipelineCards = () => {
    if (pipeline) {
      return (
        <PipelineSummaryCard
          pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)}
        />
      );
    }
  };

  if (pipelineId == null || pipelineId === "") {
    return null;
  }

  if (isLoading) {
    return <PipelineSummaryCard isLoading={isLoading} />;
  }

  if (pipeline == null) {
    return <span>No Pipeline found with ID ({pipelineId}). Access Rules may restrict you from seeing the Pipeline, or the Pipeline may have been deleted.</span>;
  }

  return (
    <div>
      <FieldLabel field={field}/>
      {getPipelineCards()}
    </div>
  );
}

PipelineSummaryField.propTypes = {
  pipelineId: PropTypes.string,
  model: PropTypes.object,
  fieldName: PropTypes.string,
};

export default PipelineSummaryField;