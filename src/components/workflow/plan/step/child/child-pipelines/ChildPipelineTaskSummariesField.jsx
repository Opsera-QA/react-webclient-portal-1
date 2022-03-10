import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import Model from "core/data_model/model";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import ChildPipelineTaskSummaryCard
  from "components/workflow/plan/step/child/child-pipelines/ChildPipelineTaskSummaryCard";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";

function ChildPipelineTaskSummariesField({ fieldName, dataObject }) {
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
      let pipelineIds = parsePipelineId();

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

      const pipelineData = dataObject.getPersistData();
      let runNumber = pipelineData.api_response?.body?.runCount;

      if (runNumber != null) {
        const pipelineStateResponse = await pipelineActions.getPipelineStateAtRun(pipeline._id, runNumber, getAccessToken);
        pipelineModel.setData("state", pipelineStateResponse?.data?.status);
      }

      pipelineModel.setData("runNumber", runNumber || "No Pipeline Run Associated With This Task");
      initializedPipelines.push({...pipelineModel});
    }

    setPipelines([...initializedPipelines]);
  };

  const parsePipelineId = () => {
    let runResponse = dataObject.getData(field.id);
    let parsedPipelineIds = [];

    if (runResponse == null || runResponse === "") {
      return parsedPipelineIds;
    }
    parsedPipelineIds.push(runResponse);
    return parsedPipelineIds;
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
          return (<ChildPipelineTaskSummaryCard pipelineData={pipeline} key={pipeline.getData("_id")} />);
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

ChildPipelineTaskSummariesField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

ChildPipelineTaskSummariesField.defaultProps = {
  fieldName: "api_response.body.pipelineId"
};

export default ChildPipelineTaskSummariesField;