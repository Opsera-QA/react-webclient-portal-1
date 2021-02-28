import React from 'react'
import {Button, Modal} from "react-bootstrap";
import PropTypes from 'prop-types'
import KpiInfoView from "components/insights/marketplace/KpiInfoView";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {unsavedChanges} from "components/common/tooltip/popover-text";

function KpiInfoModal({kpiItem, dashboardData, setShowModal, showModal }) {
  if (kpiItem == null) {
    return <></>;
  }

  return (
    <Modal size="lg" show={showModal} onHide={setShowModal} backdrop="static" centered className={"modal-overflow"}>
      <Modal.Header closeButton>
        <Modal.Title>KPI Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-block-shaded m-3 p-3">
            <KpiInfoView data={kpiItem} dashboardData={dashboardData} setShowModal={setShowModal} />
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

KpiInfoModal.propTypes = {
  kpiItem: PropTypes.object,
  dashboardData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
};

export default KpiInfoModal;