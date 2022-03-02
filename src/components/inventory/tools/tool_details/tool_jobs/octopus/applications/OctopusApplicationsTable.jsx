import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import {getField} from "components/common/metadata/metadata-helpers";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {octopusApplicationsMetadata} from "components/inventory/tools/tool_details/tool_jobs/octopus/octopus-applications-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewOctopusApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/create_overlay/NewOctopusApplicationOverlay";
import {octopusCustomTableColumnDefinitions} from "components/common/table/column_definitions/tools/octopus/octopus.customTable.columnDefinitions";
import IconBase from "components/common/icons/IconBase";

function OctopusApplicationsTable({ toolData, isMounted, applications, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = octopusApplicationsMetadata.fields;

  // TODO: Remove type after creating splash screen
  const createOctopusApplication = (type) => {
    toastContext.showOverlayPanel(
      <NewOctopusApplicationOverlay
        loadData={loadData}
        isMounted={isMounted}
        type={type}
        toolData={toolData}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "configuration.spaceName")),
      octopusCustomTableColumnDefinitions.getOctopusApplicationTypeColumnDefinition(getField(fields, "configuration.type")),
      getTableDateTimeColumn(getField(fields, "updatedAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const getOctopusApplicationsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={applications}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        // initialState={initialState}
      />
    );
  };

  if (toolData == null) {
    return null;
  }

  // TODO: Remove this create button, replace with standard flow.
  return (
    <>
      <div className="mt-1 text-right">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            <IconBase icon={faPlus} className={"mr-1"}/> Create
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => createOctopusApplication("environment")}>Environment</Dropdown.Item>
            <Dropdown.Item onClick={() => createOctopusApplication("account")}>Account</Dropdown.Item>
            <Dropdown.Item onClick={() => createOctopusApplication("target")}>Target</Dropdown.Item>
            <Dropdown.Item onClick={() => createOctopusApplication("feed")}>External Feed</Dropdown.Item>
            <Dropdown.Item onClick={() => createOctopusApplication("tomcat")}>Tomcat Manager</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br/>
      </div>
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
    </>
  );
}

OctopusApplicationsTable.propTypes = {
  toolData: PropTypes.object,
  applications: PropTypes.array,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
};

export default OctopusApplicationsTable;
