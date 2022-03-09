import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import modelHelpers from "components/common/model/modelHelpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import {parallelProcessorStepMetadata}
  from "components/workflow/plan/step/parallel_processor/parallelProcessorStep.metadata";
import PipelineMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/PipelineMultiSelectInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";

function ParallelProcessPipelineStepConfiguration({ stepTool, pipelineId, parentCallback, closeEditorPanel }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [parallelPipelineStepModel, setParallelPipelineStepModel] = useState(undefined);
  const [thresholdModel, setThresholdModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const parsedModel = modelHelpers.parseObjectIntoModel(stepTool?.configuration, parallelProcessorStepMetadata);
      setParallelPipelineStepModel(parsedModel);
      const thresholdModel = modelHelpers.parseObjectIntoModel(stepTool?.threshold, thresholdMetadata);
      setThresholdModel(thresholdModel);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const callbackFunction = async () => {
    const item = {
      configuration: {...parallelPipelineStepModel.getPersistData()},
      threshold: {
        ...thresholdModel.getPersistData()
      },
    };
    parentCallback(item);
  };

  if (isLoading || parallelPipelineStepModel == null || thresholdModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={parallelPipelineStepModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div className="mx-1">
        Opsera supports orchestrating multiple &quot;child pipelines&quot; within a
        &quot;Parallel Processor&quot; step.
        This allows users to include one or more pipeline executions inside this a single
        step in this pipeline.
        As such the overall success or failure of those pipelines will impact this one.
        In order to use this feature,
        please ensure that all children pipeline are configured and ready to run.
      </div>

      <div className="mt-4 title-text-7" style={{paddingBottom: "0"}}>Settings</div>
      <div className={"my-4"}>
        <PipelineMultiSelectInput
          fieldName={"pipelines"}
          currentPipelineId={pipelineId}
          model={parallelPipelineStepModel}
          setModel={setParallelPipelineStepModel}
        />
      </div>
      {/*TODO: Make threshold editor panel component*/}
      <div className="mt-5">
        <div className="title-text-7">Threshold</div>
        <BooleanToggleInput disabled={true} dataObject={thresholdModel} setDataObject={setThresholdModel} fieldName={"ensureSuccess"}/>
        <BooleanToggleInput disabled={true} dataObject={thresholdModel} setDataObject={setThresholdModel} fieldName={"completeFirst"}/>
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

ParallelProcessPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ParallelProcessPipelineStepConfiguration;
