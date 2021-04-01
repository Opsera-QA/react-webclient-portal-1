import React, { useMemo }  from 'react';
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
  getCheckBoxColumn
} from "components/common/table/table-column-helpers";

import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InlineBooleanFilter from "components/common/filters/boolean/InlineBooleanFilter";
import SfdcComponentFilter from "components/common/filters/sfdc/sfdc_component/SfdcComponentFilter";

const GitModifiedFilesTabView = ({
  loadData,
  filterDto,
  setFilterDto,
  loading,
  componentType,
  data,
  handleComponentCheck,
  handleCheckAllClickComponentTypes
}) => {

  const fields = sfdcTableConstants.fields;

  const gitColumnsWithCheckBoxCell = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "commitAction";})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType";})),
      // getTableTextColumn(fields.find(field => { return field.id === "committedFile"})),
      {...getTableTextColumn(fields.find(field => { return field.id === "committedFile";})), class: "force-text-wrap"},
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy";})),
      getCheckBoxColumn(handleComponentCheck)  
    ],
    [],
  );

  const getGitModifiedFilesView = () => {
    return (  
      <div>
        {/* upload component goes here */}
        {/* TODO: Check if the component is being called from profiles or sfdc or git and then make csv upload changes */}
        {/* table component goes here */}
        <CustomTable
          className={"table-no-border"}
          columns={gitColumnsWithCheckBoxCell}
          data={data}              
          isLoading={loading}
          loadData={loadData}
          noDataMessage={sfdcTableConstants.noDataMessage}
          initialState={sfdcTableConstants.initialState}
          paginationDto={filterDto}
          setPaginationDto={setFilterDto}        
        />
      </div>
    );
  };

  const getGitInlineFilters = () => {
    return (
      <div className="px-2 d-flex small">
        <div className="pr-4">
          <TooltipWrapper innerText={"This will select all the items on this page only."}>
            <InlineBooleanFilter loadData={handleCheckAllClickComponentTypes} filterDto={filterDto} setFilterDto={setFilterDto} fieldName={"checkAll"} />
          </TooltipWrapper>
        </div>        
        <div><SfdcComponentFilter componentType={componentType} filterDto={filterDto} setFilterDto={setFilterDto} inline={true} /></div>
      </div>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={filterDto}
      setFilterDto={setFilterDto}
      isLoading={loading}
      title={"GIT Files"}
      titleIcon={faCode}
      body={getGitModifiedFilesView()}              
      supportSearch={true}
      inlineFilters={getGitInlineFilters()}
    />
  );
};

GitModifiedFilesTabView.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  componentType: PropTypes.arrayOf(PropTypes.object),
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  handleComponentCheck: PropTypes.func,
  handleCheckAllClickComponentTypes: PropTypes.func  
};

export default GitModifiedFilesTabView;