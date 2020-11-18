import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { getTableBooleanIconColumn, getTableTextColumn } from "../../../../../../common/table/table-column-helpers";
import octopusApplicationsMetadata from "../octopus-environment-metadata";
import ExistingOctopusApplicationModal from "./OctopusApplicationModal";

function OctopusApplicationsTable({ toolData, loadData, selectedRow, isLoading }) {
  const [type, setType] = useState(false);
  let fields = octopusApplicationsMetadata.fields;
  let data = [];
  if (toolData.getData("actions")) {
    toolData.getData("actions").forEach(function (item) {
      data.push(item.configuration);
    });
  }

  const [showCreateOctopusModal, setShowCreateOctopusModal] = useState(false);

  const createOctopusApplication = (type) => {
    if (type === "environment") {
      setShowCreateOctopusModal(true);
      setType("environment");
      return;
    }
    if (type === "account") {
      setShowCreateOctopusModal(true);
      setType("account");
      return;
    }
    if (type === "target") {
      setShowCreateOctopusModal(true);
      setType("target");
      return;
    }
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "name";
        })
      ),
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "spaceName";
        })
      ),
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "type";
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
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> Create
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => createOctopusApplication("environment")}>Environment</Dropdown.Item>
              <Dropdown.Item onClick={() => createOctopusApplication("account")}>Account</Dropdown.Item>
              <Dropdown.Item onClick={() => createOctopusApplication("target")}>Target</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br />
        </div>
      )}
      <CustomTable columns={columns} data={data} onRowSelect={selectedRow} isLoading={isLoading}></CustomTable>
      {type && (
        <ExistingOctopusApplicationModal
          type={type}
          toolData={toolData}
          loadData={loadData}
          setShowModal={setShowCreateOctopusModal}
          showModal={showCreateOctopusModal}
        />
      )}
    </>
  );
}

OctopusApplicationsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  selectedRow: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default OctopusApplicationsTable;
