import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheckCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "../../../../../../common/table/table-column-helpers";
import argoApplicationsMetadata from "../argo-metadata";
import NewArgoApplicationModal from "./NewArgoApplicationModal";

function ArgoApplicationsTable({ toolData, loadData, selectedRow, isLoading }) {
  let fields = argoApplicationsMetadata.fields;
  const [showCreateArgoApplicationModal, setShowCreateArgoApplicationModal] = useState(false);

  const createArgoApplication = () => {
    setShowCreateArgoApplicationModal(true);
  }

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  return (
    <>
      <div className="my-1 text-right">
        <Button variant="primary" size="sm"
                onClick={() => createArgoApplication()}>
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> Create Argo Application
        </Button>
        <br/>
      </div>
      <CustomTable
        columns={columns}
        data={toolData.getData("jobs")}
        onRowSelect={selectedRow}
        isLoading={isLoading}
      >
      </CustomTable>
      <NewArgoApplicationModal toolData={toolData} loadData={loadData} setShowModal={setShowCreateArgoApplicationModal} showModal={showCreateArgoApplicationModal} />
    </>
  );
}

ArgoApplicationsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  selectedRow: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ArgoApplicationsTable;