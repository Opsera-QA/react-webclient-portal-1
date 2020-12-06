import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import SiteNotificationEditorPanel from "./site_notification_detail_view/SiteNotificationEditorPanel";
import CreateModal from "../../common/modal/CreateModal";
import Model from "../../../core/data_model/model";
import siteNotificationMetadata from "./siteNotificationMetadata";

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
    <>
      <CreateModal handleCancelModal={handleClose} objectType={"Site Notification"} showModal={showModal} loadData={loadData} >
        {siteNotificationData && <SiteNotificationEditorPanel setSiteNotificationData={setSiteNotificationData} handleClose={handleClose} siteNotificationData={siteNotificationData} />}
      </CreateModal>
    </>
  );
}

NewSiteNotificationModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  loadData: PropTypes.func,
};

export default NewSiteNotificationModal;


