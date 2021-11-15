import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import templateEditorMetadata from "components/admin/template_editor/pipelineTemplate.metadata";
import TemplateEditorPanel from "components/admin/template_editor/details/TemplateEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

function NewTemplateOverlay({ loadData, isMounted } ) {
  const toastContext = useContext(DialogToastContext);
  const [templateData, setTemplateData] = useState(new Model({...templateEditorMetadata.newObjectFields}, templateEditorMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={templateEditorMetadata.type} loadData={loadData}>
      <TemplateEditorPanel setTemplateData={setTemplateData} handleClose={closePanel} templateData={templateData}/>
    </CreateCenterPanel>
  );
}

NewTemplateOverlay.propTypes = {
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
};
 
export default NewTemplateOverlay;


