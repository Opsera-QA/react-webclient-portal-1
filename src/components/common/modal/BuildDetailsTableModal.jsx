import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BuildDetails from "components/insights/summary/BuildDetails";
import { Button, Modal } from "react-bootstrap";

function BuildDetailsTableModal({ header, size, tableMessage, show, setParentVisibility, dashboardData, setDashboardData }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // console.log("show: ", show);
    // console.log("DATA", jsonMessage);
    setShowModal(show);
  }, [tableMessage, show]);

  const handleClose = () => {
    // console.log("CLOSING!");
    setShowModal(false);
    setParentVisibility(false);
  };

  return (
    <>
      <Modal show={showModal} size={size} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BuildDetails data={tableMessage} dashboardData={dashboardData}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

BuildDetailsTableModal.propTypes = {
  header: PropTypes.string,
  size: PropTypes.string,
  tableMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataType: PropTypes.string,
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func,
  dashboardData: PropTypes.object,
  setDashboardData: PropTypes.func
};

export default BuildDetailsTableModal;
