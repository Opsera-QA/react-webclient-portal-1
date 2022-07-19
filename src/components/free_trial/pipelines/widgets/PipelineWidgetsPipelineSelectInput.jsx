import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {NavigationDropdownSelectInputBase} from "@opsera/makeup-and-vanity-set/dist/makeup-and-vanity-set.module";
import pipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import InlineLoadingDialog from "components/common/status_notifications/loading/InlineLoadingDialog";

function PipelineWidgetsPipelineSelectInput({ selectedPipeline, setSelectedPipeline}) {
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
      setSelectedPipeline(pipelines[0]);
    }
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
      selectedOption={selectedPipeline?._id}
      selectOptions={pipelines}
      setDataFunction={setSelectedPipeline}
      title={`${selectedPipeline?.name}`}
      textField={"name"}
      valueField={"_id"}
    />
  );
}

PipelineWidgetsPipelineSelectInput.propTypes = {
  selectedPipeline: PropTypes.object,
  setSelectedPipeline: PropTypes.func,
};

export default PipelineWidgetsPipelineSelectInput;
