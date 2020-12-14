import React from 'react'
import {Button, Modal} from "react-bootstrap";
import PropTypes from 'prop-types';
import TooltipWrapper from "../../common/tooltip/tooltipWrapper";
import {unsavedChanges} from "../../common/tooltip/popover-text";
import Marketplace from '../kpi_marketplace/Marketplace';

function DashboardKPIModal({dashboardData, setShowModal, showModal }) {
  
  if (dashboardData == null) {
    return <></>;
  }

  return (
    <Modal size="lg" show={showModal} onHide={setShowModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>KPI Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-block-shaded m-3 h-75">
          <div className="p-3">
            <Marketplace dashboardData={dashboardData}/>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <TooltipWrapper innerText={unsavedChanges}>
          <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </TooltipWrapper>
      </Modal.Footer>
    </Modal>
  )
}

DashboardKPIModal.propTypes = {
  dashboardData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
};

export default DashboardKPIModal;