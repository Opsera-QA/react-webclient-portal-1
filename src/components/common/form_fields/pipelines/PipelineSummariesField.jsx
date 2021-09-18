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

function PipelineSummariesField({ fieldName, model, pipelineIds }) {
  const {getAccessToken} = useContext(AuthContext);
  const [field] = useState(model.getFieldById(fieldName));
  const [isLoading, setIsLoading] = useState(false);
  const [pipelines, setPipelines] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setPipelines([]);

      if (Array.isArray(pipelineIds) && pipelineIds.length > 0) {
        const response = await pipelineActions.getPipelineSummariesV2(getAccessToken, cancelSource, pipelineIds);
        const pipelineList = response?.data;

        if (isMounted?.current === true && Array.isArray(pipelineList)) {
          setPipelines(pipelineList);
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
    if (Array.isArray(pipelines) && pipelines.length > 0) {
      return (
        <>
          {pipelines.map((pipeline) => {
            return (
              <div key={pipeline._id}>
                <PipelineSummaryCard pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)} />
              </div>
            );
          })}
        </>
      );
    }
  };

  if (isLoading) {
    return <PipelineSummaryCard isLoading={isLoading} />;
  }

  if (pipelineIds == null || pipelineIds === []) {
    return null;
  }

  if (!isLoading && (!Array.isArray(pipelines) || pipelines.length === 0)) {
    return <span>No Pipelines Found</span>;
  }

  return (
    <div>
      <FieldLabel field={field}/>
      {getPipelineCards()}
    </div>
  );
}

PipelineSummariesField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  pipelineIds: PropTypes.array,
};

export default PipelineSummariesField;