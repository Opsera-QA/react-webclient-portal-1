import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import projectTagsMetadata from "./tagging-project-metadata";
import { useHistory } from "react-router-dom";
import NewProjectMappingModal from "./NewProjectMappingModal";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";

function ProjectsTagTable({ data, loadData, isLoading }) {
  const [showCreateProjectTagModal, setShowCreateProjectTagModal] = useState(false);
  const history = useHistory();
  let fields = projectTagsMetadata.fields;

  const columns = useMemo(() => [
      getTableTextColumn(fields.find((field) => {return field.id === "tool_identifier";})),
      getTableTextColumn(fields.find((field) => {return field.id === "key";})),
      // getTableTextColumn(fields.find(field => { return field.id === "tool_id"})),
      getTableBooleanIconColumn(fields.find((field) => {return field.id === "active";})),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData) => {
    history.push(`/settings/data_mapping/projects/details/${rowData.original._id}`);
  };

  const noDataMessage = "No Project Mappings have been configured";

  const createProjectTag = () => {
    setShowCreateProjectTagModal(true);
  };

  return (
    <>
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        onRowSelect={selectedRow}
        isLoading={isLoading}
        tableTitle={"Project Mapping"}
        type={"Project Mapping"}
        createNewRecord={createProjectTag}
      />
      <NewProjectMappingModal
        setShowModal={setShowCreateProjectTagModal}
        showModal={showCreateProjectTagModal}
        loadData={loadData}
      />
    </>
  );
}

ProjectsTagTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ProjectsTagTable;
