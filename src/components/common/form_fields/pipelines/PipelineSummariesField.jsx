import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import pipelineActions from "../../../workflow/pipeline-actions";
import {AuthContext} from "../../../../contexts/AuthContext";
import PipelineSummaryCard from "../../../workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import Model from "../../../../core/data_model/model";
import Label from "../Label";
import pipelineSummaryMetadata from "../../../workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";

function PipelineSummariesField({ fieldName, dataObject }) {
  const {getAccessToken} = useContext(AuthContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelines, setPipelines] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let pipelineIds = dataObject.getData(field.id);
      pipelineIds = Array.isArray(pipelineIds) ? pipelineIds : [pipelineIds];
      let response = await pipelineActions.getPipelineSummaries(pipelineIds, getAccessToken);
      setPipelines(response.data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getPipelineCards = () => {
    return (
      <>
      {pipelines.map((pipeline) => {
        return (
          <div key={pipeline._id}><PipelineSummaryCard pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)} /></div>
        );
      })}
      </>
    );
  };

  if (isLoading) {
    return <PipelineSummaryCard isLoading={isLoading} />;
  }

  if (!isLoading && pipelines.length === 0) {
    return <span>No Pipelines Found</span>;
  }

  return (
    <div>
      <Label field={field}/>
      {getPipelineCards()}
    </div>
  );
}

PipelineSummariesField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default PipelineSummariesField;