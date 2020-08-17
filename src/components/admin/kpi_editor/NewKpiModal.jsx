import React, { useState, useContext } from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import KpiEditorPanel from "./kpi_detail_view/KpiEditorPanel";

const INITIAL_DATA = {
  "name": "",
  "description": "",
  "tool_identifier": [],
  "type": "",
  "active": true,
  "persona": ["manager","developer", "executive"]
};



function NewKpiModal( { onModalClose, showModal } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [kpiData, setKpiData] = useState(INITIAL_DATA);

  const handleClose = () => {
    onModalClose(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        All unsaved changes will be lost
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New KPI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <KpiEditorPanel setKpiData={setKpiData} newTag={true} handleClose={handleClose} kpiData={kpiData} /> 
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewKpiModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewKpiModal;


