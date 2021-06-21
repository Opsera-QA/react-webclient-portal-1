import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { getTableBooleanIconColumn, getTableTextColumn } from "../../../../../../common/table/table-column-helpers";
import octopusApplicationsMetadata from "../octopus-environment-metadata";
import ExistingOctopusApplicationModal from "./OctopusApplicationModal";
import { format } from "date-fns";
import {getField} from "components/common/metadata/metadata-helpers";

// TODO: Revisit this and wire up new overlay
function OctopusApplicationsTable({ toolData, loadData, selectedRow, isLoading }) {
  const [type, setType] = useState(undefined);
  let fields = octopusApplicationsMetadata.fields;
  const [showCreateOctopusModal, setShowCreateOctopusModal] = useState(false);

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "updatedAt",
        desc: true
      }
    ]
  };

  const createOctopusApplication = (newType) => {
    switch (newType) {
      case "environment":
      case "account":
      case "target":
      case "feed":
      case "tomcat":
        setType(newType);
        setShowCreateOctopusModal(true);
        break;
      default:
        setShowCreateOctopusModal(false);
        setType(undefined);
    }    
  };

  // TODO: What is this for?
  let data = [];
  if (toolData?.getArrayData("actions")?.length > 0) {
    toolData.getData("actions").forEach(function (item) {
      data.push({...item.configuration, updatedAt: format(new Date(item.updatedAt), "yyyy-MM-dd', 'hh:mm a")});
    });
  }

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "spaceName")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "updatedAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const getModal = () => {
    if (showCreateOctopusModal) {
      return (
        <ExistingOctopusApplicationModal
          type={type}
          toolData={toolData}
          loadData={loadData}
          setShowModal={setShowCreateOctopusModal}
          showModal={showCreateOctopusModal}
        />
      );
    }
  };

  if (toolData == null) {
    return null;
  }

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
              <Dropdown.Item onClick={() => createOctopusApplication("feed")}>External Feed</Dropdown.Item>
              <Dropdown.Item onClick={() => createOctopusApplication("tomcat")}>Tomcat Manager</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br />
        </div>
      )}
      <CustomTable
        columns={columns}
        data={data}
        onRowSelect={selectedRow}
        isLoading={isLoading}
        initialState={initialState}
      />
      {getModal()}
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
