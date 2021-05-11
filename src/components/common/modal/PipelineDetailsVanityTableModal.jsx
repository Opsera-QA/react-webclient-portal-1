import React, { useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {faDiceD20} from "@fortawesome/pro-light-svg-icons";
import { Button, Modal } from "react-bootstrap";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";

function PipelineDetailsVanityTableModal({ header, size, tableMessage, show, setParentVisibility, loadData, columns, noDataMessage, tableFilterDto, setTableFilterDto, isLoading }) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(show);
  }, [tableMessage, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility(false);
  };

  const onRowSelect = (treeGrid, row, column, e) => {
    history.push(`/blueprint/${row._id.id}/${row.run_count}`);
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={tableMessage}
        noDataMessage={noDataMessage}
        paginationModel={tableFilterDto}
        setPaginationModel={setTableFilterDto}
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

PipelineDetailsVanityTableModal.propTypes = {
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

export default PipelineDetailsVanityTableModal;
