import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import ParallelPipelineTaskSummaryCard
  from "components/workflow/plan/step/parallel_processor/parallel_pipeline/ParallelPipelineTaskSummaryCard";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";

function ParallelPipelineTaskSummariesField({ fieldName, dataObject }) {
  const {getAccessToken} = useContext(AuthContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [isLoading, setIsLoading] = useState(false);
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let pipelineIds = parsePipelineIds();

      if (pipelineIds.length > 0) {
        let response = await pipelineActions.getPipelineSummaries(pipelineIds, getAccessToken);

        if (response?.data) {
          await initializePipelines(response.data);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const initializePipelines = async (pipelines) => {
    let initializedPipelines = [];

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      setPipelines(initializedPipelines);
    }

    for (let index = 0; index < pipelines.length; index++) {
      let pipeline = pipelines[index];
      let pipelineModel = new Model(pipeline, pipelineSummaryMetadata, false);
      const runNumber = getRunResponseValue(pipelineModel.getData("_id"), "runCount");

      if (runNumber != null) {
        const pipelineStateResponse = await pipelineActions.getPipelineStateAtRun(pipeline._id, runNumber, getAccessToken);
        pipelineModel.setData("state", pipelineStateResponse?.data?.status);
      }

      pipelineModel.setData("runNumber", runNumber || "No Pipeline Run Associated With This Task");
      initializedPipelines.push({...pipelineModel});
    }

    setPipelines([...initializedPipelines]);
  };

  const parsePipelineIds = () => {
    let runResponse = dataObject.getData(field.id);
    let parsedPipelineIds = [];

    if (runResponse == null || !Array.isArray(runResponse) || runResponse.length === 0) {
      return parsedPipelineIds;
    }

    runResponse.map((responseObject) => {
      parsedPipelineIds.push(responseObject.pipelineId);
    });

    return parsedPipelineIds;
  };

  const getRunResponseValue = (pipelineId, runResponseField) => {
    let runResponse = dataObject.getData(field.id);
    if (runResponse == null || !Array.isArray(runResponse) || runResponse.length === 0) {
      return null;
    }

    let response = runResponse.find((item) => {return item.pipelineId === pipelineId;});
    return response ? response[runResponseField] : null;
  };

  const getBody = () => {
    if (isLoading) {
      return <PipelineSummaryCard isLoading={isLoading} />;
    }

    if (pipelines.length === 0) {
      return <></>;
    }

    return(
      <div>
        {pipelines.map((pipeline) => {
          return (<ParallelPipelineTaskSummaryCard pipelineData={pipeline} key={pipeline.getData("_id")} />);
        })}
      </div>
    );
  };

  return (
    <FieldContainer>
      <FieldLabel field={field} />
      {getBody()}
    </FieldContainer>
  );
}

ParallelPipelineTaskSummariesField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

ParallelPipelineTaskSummariesField.defaultProps = {
  fieldName: "api_response.apiResponse.message.runResponse"
};

export default ParallelPipelineTaskSummariesField;