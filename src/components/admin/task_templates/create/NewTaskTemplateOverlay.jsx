import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useComponentStateReference from "hooks/useComponentStateReference";
import { taskTemplateMetadata } from "components/admin/task_templates/taskTemplate.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TaskTemplateEditorPanel from "components/admin/task_templates/details/TaskTemplateEditorPanel";

// TODO: Make helper to create template out of existing task like pipelines supports
export default function NewTaskTemplateOverlay({ loadData} ) {
  const toastContext = useContext(DialogToastContext);
  const { isMounted } = useComponentStateReference();
  const [templateModel, setTemplateModel] = useState({...modelHelpers.getNewModelForMetadata(taskTemplateMetadata)});

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (templateModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={taskTemplateMetadata.type}
      loadData={loadData}
    >
      <TaskTemplateEditorPanel
        templateModel={templateModel}
        setTemplateModel={setTemplateModel}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewTaskTemplateOverlay.propTypes = {
  loadData: PropTypes.func,
};

