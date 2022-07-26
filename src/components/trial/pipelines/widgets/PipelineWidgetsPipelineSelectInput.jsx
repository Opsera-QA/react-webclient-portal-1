import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {NavigationDropdownSelectInputBase} from "@opsera/makeup-and-vanity-set/dist/makeup-and-vanity-set.module";
import pipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import InlineLoadingDialog from "components/common/status_notifications/loading/InlineLoadingDialog";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function PipelineWidgetsPipelineSelectInput({ selectedPipelineId, setSelectedPipelineId}) {
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadPipelines();
    }
    catch (error) {
      if(isMounted?.current === true){
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const loadPipelines = async () => {
    // TODO: Just pull owned pipelines
    const response = await pipelineActions.getPipelinesV3(getAccessToken, cancelTokenSource);
    const pipelines = response?.data?.data;

    if (isMounted.current === true && Array.isArray(pipelines)) {
      setPipelines(pipelines);
      setSelectedPipelineId(pipelines[0]?._id);
    }
  };

  const getSelectedPipelineName = () => {
    if (isMongoDbId(selectedPipelineId) === true) {
      if (Array.isArray(pipelines) && pipelines.length > 0) {
        const foundPipeline = pipelines?.find((pipeline) => pipeline?._id === selectedPipelineId);

        if (foundPipeline) {
          return foundPipeline?.name;
        }
      }

      return selectedPipelineId;
    }

    return "Select a Pipeline";
  };

  if (isLoading) {
    return (
      <InlineLoadingDialog
        isLoading={isLoading}
        message={"Loading Pipelines"}
      />
    );
  }

  return (
    <NavigationDropdownSelectInputBase
      selectedOption={selectedPipelineId}
      selectOptions={pipelines}
      setDataFunction={setSelectedPipelineId}
      title={getSelectedPipelineName()}
      textField={"name"}
      valueField={"_id"}
    />
  );
}

PipelineWidgetsPipelineSelectInput.propTypes = {
  selectedPipelineId: PropTypes.object,
  setSelectedPipelineId: PropTypes.func,
};

export default PipelineWidgetsPipelineSelectInput;
