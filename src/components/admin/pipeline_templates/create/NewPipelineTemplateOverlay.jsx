import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import templateEditorMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import PipelineTemplateEditorPanel from "components/admin/pipeline_templates/details/PipelineTemplateEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Remove after wizard is done
function NewPipelineTemplateOverlay({ loadData} ) {
  const toastContext = useContext(DialogToastContext);
  const { isMounted } = useComponentStateReference();
  const [templateModel, setTemplateModel] = useState(new Model({...templateEditorMetadata.newObjectFields}, templateEditorMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={templateEditorMetadata.type} loadData={loadData}>
      <PipelineTemplateEditorPanel
        setTemplateModel={setTemplateModel}
        handleClose={closePanel}
        templateModel={templateModel}
      />
    </CreateCenterPanel>
  );
}

NewPipelineTemplateOverlay.propTypes = {
  loadData: PropTypes.func,
};
 
export default NewPipelineTemplateOverlay;


