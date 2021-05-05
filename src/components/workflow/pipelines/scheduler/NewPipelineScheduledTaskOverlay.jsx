import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import PipelineScheduledTaskEditorPanel from "components/workflow/pipelines/scheduler/PipelineScheduledTaskEditorPanel";
import pipelineSchedulerMetadata from "components/workflow/pipelines/scheduler/pipeline-scheduler-metadata";

// TODO: This will probably be inline rather than in another overlay, but for now keeping the mechanism the same
function NewPipelineScheduledTaskOverlay({ loadData, isMounted, pipelineId }) {
  const toastContext = useContext(DialogToastContext);
  const [scheduledTaskData, setScheduledTaskData] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    initializeModel();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const initializeModel = () => {
    let newModel = new Model({...pipelineSchedulerMetadata.newObjectFields}, pipelineSchedulerMetadata, true);
    newModel.setData("task", { taskType: "RUN", pipelineId: pipelineId});
    setScheduledTaskData({...newModel});
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (scheduledTaskData == null) {
    return null;
  }

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={pipelineSchedulerMetadata.type} loadData={loadData}>
      <PipelineScheduledTaskEditorPanel handleClose={closePanel} scheduledTaskData={scheduledTaskData}/>
    </CreateCenterPanel>
  );
}

NewPipelineScheduledTaskOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  pipelineId: PropTypes.string
};

export default NewPipelineScheduledTaskOverlay;


