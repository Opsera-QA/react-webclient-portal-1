import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import notificationsMetadata from "./notifications-metadata";
import NotificationEditorPanel from "./notification_details/NotificationEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";


function NewNotificationOverlay({ loadData, isMounted } ) {
  const toastContext = useContext(DialogToastContext);
  const [notificationData, setNotificationData] = useState(new Model ({...notificationsMetadata.newObjectFields}, notificationsMetadata, true));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={notificationsMetadata.type} loadData={loadData}>
      <NotificationEditorPanel setNotificationData={setNotificationData} handleClose={closePanel} notificationData={notificationData}/>
    </CreateCenterPanel>
  );
}

NewNotificationOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
};

export default NewNotificationOverlay;


