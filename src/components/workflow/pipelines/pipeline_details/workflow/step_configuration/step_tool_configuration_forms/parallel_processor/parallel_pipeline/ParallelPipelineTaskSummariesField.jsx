import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "../../../../../../../../../contexts/AuthContext";
import pipelineActions from "../../../../../../../pipeline-actions";
import ParallelPipelineTaskSummaryCard from "./ParallelPipelineTaskSummaryCard";
import Model from "../../../../../../../../../core/data_model/model";
import Label from "../../../../../../../../common/form_fields/Label";
import PipelineSummaryCard from "../../../../../pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata from "../../../../../pipeline_activity/pipeline-summary-metadata";

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
          initializePipelines(response.data);
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

  const initializePipelines = (pipelines) => {
    let initializedPipelines = [];

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      setPipelines(initializedPipelines);
    }

    pipelines.map((pipeline) => {
      let pipelineModel = new Model(pipeline, pipelineSummaryMetadata, false);
      pipelineModel.setData("runNumber", getRunResponseValue(pipelineModel.getData("_id"), "runCount"));
      pipelineModel.setData("status", getRunResponseValue(pipelineModel.getData("_id"), "status"));
      initializedPipelines.push({...pipelineModel});
    });

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

    let response = runResponse.find((item) => {return item.pipelineId === pipelineId});
    return response ? response[runResponseField] : null;
  };

  const getBody = () => {
    if (isLoading) {
      return <PipelineSummaryCard isLoading={isLoading} />
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
    <div>
      <Label field={field} />
      {getBody()}
    </div>
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