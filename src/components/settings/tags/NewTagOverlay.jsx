import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import TagEditorPanel from "components/settings/tags/tags_detail_view/TagEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";

function NewTagOverlay({ loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [tagData, setTagData] = useState(new Model({...tagEditorMetadata.newObjectFields}, tagEditorMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={tagEditorMetadata.type}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.SMALL}
    >
      <TagEditorPanel
        setTagData={setTagData}
        handleClose={closePanel}
        tagData={tagData}
      />
    </CreateCenterPanel>
  );
}
 
NewTagOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewTagOverlay;


