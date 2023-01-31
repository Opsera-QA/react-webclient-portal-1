import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import NewProjectDataMappingOverlay from "components/settings/data_mapping/projects/NewProjectDataMappingOverlay";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";
import InLineToolTypeFilter from "../../../common/filters/data_mapping/InLineToolTypeFilter";
import ToolTypeFilter from "../../../common/filters/data_mapping/ToolTypeFilter";
import ProjectDataMappingActiveFilter from "../../../common/filters/status/ProjectDataMappingActiveFilter";
import projectDataMappingMetadata
  from "@opsera/definitions/constants/settings/data_mapping/project/projectDataMapping.metadata";
import {
  analyticsProjectDataMappingHelper
} from "components/settings/data_mapping/projects/analyticsProjectDataMapping.helper";

function ProjectDataMappingsTable(
  {
    projectDataMappings,
    loadData,
    isLoading,
    isMounted,
    toolFilterDto,
    setToolFilterDto
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = projectDataMappingMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "tool_identifier")),
      getTableTextColumn(getField(fields, "key")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData) => {
    history.push(analyticsProjectDataMappingHelper.getDetailViewLink(rowData?.original?._id));
  };

  const noDataMessage = "No Project Data Mapping Tags have been configured";

  const createProjectTag = () => {
    toastContext.showOverlayPanel(
      <NewProjectDataMappingOverlay
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <>
        <ToolTypeFilter
          filterModel={toolFilterDto}
          setFilterModel={setToolFilterDto}
          className={"mb-2"}
        />
        <ProjectDataMappingActiveFilter
          filterDto={toolFilterDto}
          setFilterDto={setToolFilterDto}
        />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <InLineToolTypeFilter
        filterModel={toolFilterDto}
        setFilterModel={setToolFilterDto}
        loadData={loadData}
        className={"mr-2"}
      />
    );
  };

  const getProjectTagsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={projectDataMappings}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        onRowSelect={selectedRow}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={toolFilterDto}
      setFilterDto={setToolFilterDto}
      addRecordFunction={createProjectTag}
      supportSearch={true}
      isLoading={isLoading}
      showBorder={false}
      body={getProjectTagsTable()}
      inlineFilters={getInlineFilters()}
      dropdownFilters={getDropdownFilters()}
      titleIcon={faTags}
      title={"Project Data Mapping Tags"}
      type={"Project Data Mapping Tags"}
      className={"pb-2"}
    />
  );
}

ProjectDataMappingsTable.propTypes = {
  projectDataMappings: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
};

export default ProjectDataMappingsTable;