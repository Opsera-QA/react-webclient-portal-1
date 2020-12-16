import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "../../../../../../../../../contexts/AuthContext";
import pipelineActions from "../../../../../../../pipeline-actions";
import Model from "../../../../../../../../../core/data_model/model";
import Label from "../../../../../../../../common/form_fields/Label";
import PipelineSummaryCard from "../../../../../pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata from "../../../../../pipeline_activity/pipeline-summary-metadata";
import ChildPipelineTaskSummaryCard from "./ChildPipelineTaskSummaryCard";

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
          let pipelineStateResponse = await pipelineActions.getPipelineStates(pipelineIds, getAccessToken);
          initializePipelines(response.data, pipelineStateResponse?.data);
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

  const initializePipelines = (pipelines, pipelineStates) => {
    let initializedPipelines = [];

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      setPipelines(initializedPipelines);
    }

    pipelines.map((pipeline) => {
      let pipelineModel = new Model(pipeline, pipelineSummaryMetadata, false);

      const pipelineData = dataObject.getPersistData();
      if (pipelineStates != null) {
        let pipelineStateObject = pipelineStates.find((item) => {return item.pipelineId === pipelineModel.getData("_id")});
        pipelineModel.setData("state", pipelineStateObject?.state);
      }
      pipelineModel.setData("runNumber", pipelineData.api_response?.body?.runCount || "No Run Status Associated With This Task");
      initializedPipelines.push({...pipelineModel});
    });

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
          return (<ChildPipelineTaskSummaryCard pipelineData={pipeline} key={pipeline.getData("_id")} />);
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

ChildPipelineTaskSummariesField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

ChildPipelineTaskSummariesField.defaultProps = {
  fieldName: "api_response.body.pipelineId"
};

export default ChildPipelineTaskSummariesField;