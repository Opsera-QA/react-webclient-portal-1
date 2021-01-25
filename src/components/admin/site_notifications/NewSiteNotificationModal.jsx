import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import siteNotificationMetadata from "components/admin/site_notifications/siteNotificationMetadata";
import SiteNotificationEditorPanel
  from "components/admin/site_notifications/site_notification_detail_view/SiteNotificationEditorPanel";
import CreateModal from "components/common/modal/CreateModal";

function NewSiteNotificationModal({ setShowModal, showModal, loadData }) {
  const [siteNotificationData, setSiteNotificationData] = useState(undefined);

  useEffect(() => {
    setSiteNotificationData(new Model({...siteNotificationMetadata.newObjectFields}, siteNotificationMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Site Notification"} showModal={showModal} loadData={loadData} >
      {siteNotificationData && <SiteNotificationEditorPanel setSiteNotificationData={setSiteNotificationData} handleClose={handleClose} siteNotificationData={siteNotificationData} />}
    </CreateModal>
  );
}

NewSiteNotificationModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewSiteNotificationModal;


