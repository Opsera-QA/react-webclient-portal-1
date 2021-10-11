import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import ExistingOctopusApplicationModal from "./OctopusApplicationModal";
import {getField} from "components/common/metadata/metadata-helpers";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {octopusApplicationsMetadata} from "components/inventory/tools/tool_details/tool_jobs/octopus/octopus-applications-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";

// TODO: Revisit this and wire up new overlay
function OctopusApplicationsTable({ toolData, applications, loadData, selectedRow, isLoading }) {
  const [type, setType] = useState(undefined);
  let fields = octopusApplicationsMetadata.fields;
  const [showCreateOctopusModal, setShowCreateOctopusModal] = useState(false);

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

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "configuration.spaceName")),
      getTableTextColumn(getField(fields, "configuration.type")),
      getTableDateTimeColumn(getField(fields, "updatedAt")),
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

  const getOctopusApplicationsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={applications}
        onRowSelect={selectedRow}
        isLoading={isLoading}
        // initialState={initialState}
      />
    );
  };

  if (toolData == null) {
    return null;
  }

  return (
    <>
      {toolData && toolData.data.configuration && (
        <div className="mt-1 text-right">
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
      <FilterContainer
        loadData={loadData}
        // addRecordFunction={createTag}
        // supportSearch={true}
        showBorder={false}
        isLoading={isLoading}
        body={getOctopusApplicationsTable()}
        metadata={octopusApplicationsMetadata}
        titleIcon={faBrowser}
        title={"Octopus Applications"}
      />
      {getModal()}
    </>
  );
}

OctopusApplicationsTable.propTypes = {
  toolData: PropTypes.object,
  applications: PropTypes.array,
  loadData: PropTypes.func,
  selectedRow: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default OctopusApplicationsTable;
