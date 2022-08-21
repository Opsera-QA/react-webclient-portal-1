import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import PipelineWidgetsBody from "components/trial/pipelines/widgets/PipelineWidgetsBody";
import PipelinesWidgetHeaderTitleBar from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTitleBar";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";

export default function FreeTrialLandingPipelinesWidget({ className }) {
  const [selectedPipelineId, setSelectedPipelineId] = useState(undefined);
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

  const getTitleBar = () => {
    return (
      <PipelinesWidgetHeaderTitleBar
        selectedPipelineId={selectedPipelineId}
        setSelectedPipelineId={setSelectedPipelineId}
        pipelines={pipelines}
      />
    );
  };

  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        heightSize={5}
        titleIcon={faDraftingCompass}
        title={getTitleBar()}
        isLoading={isLoading}
      >
        <PipelineWidgetsBody
          selectedPipelineId={selectedPipelineId}
        />
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

FreeTrialLandingPipelinesWidget.propTypes = {
  className: PropTypes.string,
};
