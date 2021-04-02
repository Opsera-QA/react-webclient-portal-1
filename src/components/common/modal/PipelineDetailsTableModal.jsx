import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { Button, Modal } from "react-bootstrap";

function BuildDetailsTableModal({ header, size, tableMessage, show, setParentVisibility, loadData, columns, noDataMessage, tableFilterDto, setTableFilterDto }) {
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
        <CustomTable
        columns={columns}
        data={tableMessage?.data}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
      />
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
  loadData: PropTypes.func,
  columns: PropTypes.array,
  noDataMessage: PropTypes.string,
  tableFilterDto: PropTypes.object,
  setTableFilterDto: PropTypes.func
};

export default BuildDetailsTableModal;
