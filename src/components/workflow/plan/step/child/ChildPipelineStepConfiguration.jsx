import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import ChildPipelineSelectInput
  from "components/workflow/plan/step/child/ChildPipelineSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {
  childPipelineStepMetadata
} from "components/workflow/plan/step/child/childPipelineStep.metadata";

function ChildPipelineStepConfiguration({ stepTool, pipelineId, parentCallback, closeEditorPanel }) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [childStepModel, setChildStepModel] = useState(undefined);
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
      const parsedModel = modelHelpers.parseObjectIntoModel(stepTool?.configuration, childPipelineStepMetadata);
      setChildStepModel(parsedModel);
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
      configuration: {...childStepModel.getPersistData()},
      threshold: {
        ...thresholdModel.getPersistData()
      },
    };
    parentCallback(item);
  };

  if (isLoading || childStepModel == null || thresholdModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={childStepModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div className="mx-1">
        Opsera supports orchestrating a &quot;child pipeline&quot; within a step.
        This allows users to run another pipeline as a step within this pipeline.
        As such the overall success or failure of that pipeline will impact this one.
        In order to use this feature, please ensure that the child pipeline is already configured
        and runs successfully, then add it to this step.
      </div>

      <div className="mt-4 title-text-7" style={{paddingBottom: "0"}}>Settings</div>
      <ChildPipelineSelectInput
        model={childStepModel}
        setModel={setChildStepModel}
        currentPipelineId={pipelineId}
        fieldName={"pipelineId"}
      />
      {/*TODO: Make threshold editor panel component*/}
      <div className="mt-5">
        <div className="ml-2 title-text-7">Threshold</div>
        <BooleanToggleInput
          fieldName={"ensureSuccess"}
          dataObject={thresholdModel}
          setDataObject={setThresholdModel}
          disabled={true}
        />
        <BooleanToggleInput
          fieldName={"completeFirst"}
          dataObject={thresholdModel}
          setDataObject={setThresholdModel}
          disabled={true}
        />
      </div>
    </PipelineStepEditorPanelContainer>
  );
}

ChildPipelineStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  pipelineId: PropTypes.string,
  closeEditorPanel: PropTypes.func
};

export default ChildPipelineStepConfiguration;
