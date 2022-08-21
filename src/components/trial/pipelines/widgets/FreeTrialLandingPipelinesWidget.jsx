import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import PipelineWidgetsBody from "components/trial/pipelines/widgets/PipelineWidgetsBody";
import PipelinesWidgetHeaderTitleBar, {
  PIPELINE_WIDGET_HEADER_ITEMS,
} from "components/trial/pipelines/widgets/PipelinesWidgetHeaderTitleBar";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";

const WIDGET_HEIGHT_SIZE = 5;
const WIDGET_DROPDOWN_MAX_HEIGHT = `${WIDGET_HEIGHT_SIZE * 25}px`;

export default function FreeTrialLandingPipelinesWidget({ className }) {
  const [selectedPipelineId, setSelectedPipelineId] = useState(undefined);
  const [selectedHeaderItem, setSelectedHeaderItem] = useState(PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE);
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

      if (pipelines.length > 0) {
        setSelectedPipelineId(pipelines[0]?._id);
      }
    }
  };

  const getTitleBar = () => {
    return (
      <PipelinesWidgetHeaderTitleBar
        selectedPipelineId={selectedPipelineId}
        setSelectedPipelineId={setSelectedPipelineId}
        pipelines={pipelines}
        dropdownMaxHeight={WIDGET_DROPDOWN_MAX_HEIGHT}
      />
    );
  };

  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        heightSize={WIDGET_HEIGHT_SIZE}
        titleIcon={faDraftingCompass}
        title={getTitleBar()}
        isLoading={isLoading}
      >
        <PipelineWidgetsBody
          selectedHeaderItem={selectedHeaderItem}
          selectedPipelineId={selectedPipelineId}
        />
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

FreeTrialLandingPipelinesWidget.propTypes = {
  className: PropTypes.string,
};
