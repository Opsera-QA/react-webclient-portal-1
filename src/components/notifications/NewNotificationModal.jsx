import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import notificationsMetadata from "./notifications-metadata";
import NotificationEditorPanel from "./notification_details/NotificationEditorPanel";
import CreateModal from "components/common/modal/CreateModal";
import Model from "core/data_model/model";

function NewNotificationModal({ setShowModal, loadData, showModal } ) {
  const [notificationData, setNotificationData] = useState(undefined);

  useEffect(() => {
    setNotificationData(new Model({...notificationsMetadata.newObjectFields}, notificationsMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Notification Policy"} showModal={showModal} loadData={loadData}>
      <NotificationEditorPanel setNotificationData={setNotificationData} handleClose={handleClose} notificationData={notificationData}/>
    </CreateModal>
  );
}

NewNotificationModal.propTypes = {
  loadData: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default NewNotificationModal;


