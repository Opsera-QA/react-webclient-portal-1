import React, { useState, useEffect, useMemo} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { Button, Modal } from "react-bootstrap";

function PipelineDetailsTableModal({ header, size, tableMessage, show, setParentVisibility, loadData, columns, noDataMessage, tableFilterDto, setTableFilterDto }) {
  const history = useHistory();
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

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData.original._id.id}/${rowData.original.run_count}`);
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
        data={tableMessage}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
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

PipelineDetailsTableModal.propTypes = {
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

export default PipelineDetailsTableModal;
