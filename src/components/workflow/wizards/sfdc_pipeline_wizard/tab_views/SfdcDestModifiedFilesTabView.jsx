import React, { useMemo }  from 'react';
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import SfdcComponentFilter from "components/common/filters/sfdc/sfdc_component/SfdcComponentFilter";

const SfdcDestModifiedFilesTabView = ({
  loadData,
  filterDto,
  setFilterDto,
  loading,
  componentType,
  data
}) => {
  const fields = sfdcTableConstants.fields;

  const columnsWithOutCheckBoxCell = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "componentType";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
    ],
    [],
  );

  const getDestSfdcModifiedFilesView = () => {
    return (        
      <CustomTable
        className={"table-no-border"}
        columns={columnsWithOutCheckBoxCell}
        data={data}              
        isLoading={loading}
        loadData={loadData}
        noDataMessage={sfdcTableConstants.noDataMessage}
        initialState={sfdcTableConstants.initialState}
        paginationDto={filterDto}
        setPaginationDto={setFilterDto}        
      />
    );
  };

  const getSfdcDestInlineFilters = () => {
    return (
      <div className="px-2 d-flex small">        
        <div>
          <SfdcComponentFilter componentType={componentType} filterDto={filterDto} setFilterDto={setFilterDto} inline={true} />
        </div>
      </div>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={filterDto}
      setFilterDto={setFilterDto}
      isLoading={loading}
      title={"Destination SFDC Files"}
      titleIcon={faCode}
      body={getDestSfdcModifiedFilesView()}              
      supportSearch={true}
      inlineFilters={getSfdcDestInlineFilters()}
    />
  );

};

SfdcDestModifiedFilesTabView.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  componentType: PropTypes.arrayOf(PropTypes.object),
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  handleComponentCheck: PropTypes.func,
  handleCheckAllClickComponentTypes: PropTypes.func  
};

export default SfdcDestModifiedFilesTabView;