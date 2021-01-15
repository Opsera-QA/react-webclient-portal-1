import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {faSearchPlus} from "@fortawesome/pro-light-svg-icons";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import {AuthContext} from "contexts/AuthContext";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import ObjectJsonModal from "components/common/modal/ObjectJsonModal";
import {DialogToastContext} from "contexts/DialogToastContext";

function ShowUserDetailsButton({ registeredUserDto }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  const getUserData = async () => {
    try {
      setShowInfoModal(true);
      const response = await RegisteredUserActions.getUserRecord(registeredUserDto.getData("_id"), getAccessToken);
      setModalData(response?.data);
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  return (
    <div>
      <ActionBarButton
        action={() => getUserData()}
        icon={faSearchPlus}
        popoverText={`Show object JSON`}
      />
      <ObjectJsonModal header={`Registered User Data`} size="lg" jsonData={modalData} show={showInfoModal} setParentVisibility={setShowInfoModal}/>
    </div>
  );
}

ShowUserDetailsButton.propTypes = {
  registeredUserDto: PropTypes.object,
};

export default ShowUserDetailsButton;