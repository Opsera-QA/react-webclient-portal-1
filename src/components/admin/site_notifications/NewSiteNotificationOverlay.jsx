import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotification.metadata";
import SiteNotificationEditorPanel
  from "components/admin/site_notifications/details/SiteNotificationEditorPanel";
  import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";

function NewSiteNotificationOverlay({ loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const [siteNotificationData, setSiteNotificationData] = useState(new Model({...siteNotificationMetadata.newObjectFields}, siteNotificationMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={siteNotificationMetadata.type} loadData={loadData} >
      <SiteNotificationEditorPanel setSiteNotificationData={setSiteNotificationData} handleClose={closePanel} siteNotificationData={siteNotificationData} />
    </CreateCenterPanel>
  );
}

NewSiteNotificationOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewSiteNotificationOverlay;


