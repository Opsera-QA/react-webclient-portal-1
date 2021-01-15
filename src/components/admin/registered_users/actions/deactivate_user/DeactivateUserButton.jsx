import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import DeactivateUserModal from "components/admin/registered_users/actions/deactivate_user/DeactivateUserModal";

function DeactivateUserButton({ userId, loadData }) {
  const [showDeactivateUserModal, setShowDeactivateUserModal] = useState(false);

  const showDeactivationConfirmation = async () => {
    setShowDeactivateUserModal(true);
  }

  const closeModal = async () => {
    await loadData();
    setShowDeactivateUserModal(false);
  };

  return (
    <div>
      <Button variant="danger" className="w-100" size="sm" onClick={() => { showDeactivationConfirmation(); }}>Deactivate User</Button>
      <DeactivateUserModal currentUserId={userId} showModal={showDeactivateUserModal} closeModal={closeModal} />
    </div>
  );
}

DeactivateUserButton.propTypes = {
  userId: PropTypes.string,
  loadData: PropTypes.func
};

export default DeactivateUserButton;