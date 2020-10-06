import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { getTableBooleanIconColumn, getTableTextColumn } from "../../../../../../common/table/table-column-helpers";
import argoApplicationsMetadata from "../argo-application-metadata";
import ExistingArgoApplicationModal from "./ArgoApplicationModal"

function ArgoApplicationsTable({ toolData, loadData, selectedRow, isLoading }) {
  let fields = argoApplicationsMetadata.fields;
  let data = [];
  if (toolData.getData("actions")) {
    toolData.getData("actions").forEach(function (item) {
      data.push(item.configuration);
    });
  }
  const [showCreateArgoApplicationModal, setShowCreateArgoApplicationModal] = useState(false);

  const createArgoApplication = () => {
    setShowCreateArgoApplicationModal(true);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "applicationName";
        })
      ),
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "cluster";
        })
      ),
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "gitPath";
        })
      ),
      getTableBooleanIconColumn(
        fields.find((field) => {
          return field.id === "active";
        })
      ),
    ],
    []
  );

  return (
    <>
      {toolData && toolData.data.configuration && (
        <div className="my-1 text-right">
          <Button variant="primary" size="sm" onClick={() => createArgoApplication()}>
            <FontAwesomeIcon icon={faPlus} className="mr-1" /> Create Argo Application
          </Button>
          <br />
        </div>
      )}
      <CustomTable columns={columns} data={data} onRowSelect={selectedRow} isLoading={isLoading}></CustomTable>
      <ExistingArgoApplicationModal
        toolData={toolData}
        loadData={loadData}
        setShowModal={setShowCreateArgoApplicationModal}
        showModal={showCreateArgoApplicationModal}
      />
    </>
  );
}

ArgoApplicationsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  selectedRow: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ArgoApplicationsTable;
