import React, { useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {faDiceD20} from "@fortawesome/pro-light-svg-icons";
import CustomTable from "components/common/table/CustomTable";
import { Button, Modal } from "react-bootstrap";
import FilterContainer from "components/common/table/FilterContainer";

function PipelineDetailsTableModal({ header, size, tableMessage, show, setParentVisibility, loadData, columns, noDataMessage, tableFilterDto, setTableFilterDto, isLoading }) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(show);
  }, [tableMessage, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility(false);
  };

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData.original._id.id}/${rowData.original.run_count}`);
  };

  const getTable = () => {
    return (
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
    );
  };

  // TODO: Utilize ModalBase when merged in
  return (
    <Modal show={showModal} size={size} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-container content-card-1">
          <div className="new-chart mx-3 mb-3 shaded-panel">
            <FilterContainer
              loadData={loadData}
              title={header}
              body={getTable()}
              isLoading={isLoading}
              titleIcon={faDiceD20}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
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
  setTableFilterDto: PropTypes.func,
  isLoading: PropTypes.bool
};

export default PipelineDetailsTableModal;
