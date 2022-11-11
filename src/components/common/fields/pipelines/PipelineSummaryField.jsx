import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import pipelineActions from "components/workflow/pipeline-actions";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import useComponentStateReference from "hooks/useComponentStateReference";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function PipelineSummaryField(
  {
    model,
    fieldName,
    pipelineId,
    className,
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pipeline, setPipeline] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    setPipeline(undefined);

    if (isMongoDbId(pipelineId) === true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [pipelineId]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      if (pipelineId != null && pipelineId !== "") {
        const response = await pipelineActions.getPipelineSummariesV2(
          getAccessToken,
          cancelTokenSource,
          [pipelineId]
        );
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

  const getSummaryCard = () => {
    if (isMongoDbId(pipelineId) !== true) {
      return null;
    }

    if (isLoading) {
      return (
        <PipelineSummaryCard
          isLoading={isLoading}
        />
      );
    }

    if (pipeline == null) {
      return <span>No Pipeline found with ID ({pipelineId}). Access Rules may restrict you from seeing the Pipeline, or the Pipeline may have been deleted.</span>;
    }

    return (
      <PipelineSummaryCard
        pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)}
      />
    );
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <TextFieldBase
          fieldName={fieldName}
          showClipboardButton={true}
          dataObject={model}
        />
      </div>
      {getSummaryCard()}
    </div>
  );
}

PipelineSummaryField.propTypes = {
  pipelineId: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
  fieldName: PropTypes.string,
};

export default PipelineSummaryField;