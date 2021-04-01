import React, { useMemo }  from 'react';
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn,
  getCheckBoxColumn
} from "components/common/table/table-column-helpers";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import InlineBooleanFilter from "components/common/filters/boolean/InlineBooleanFilter";
import "../../workflowWizard.css";


// TODO: This should further be broken down into two components. I will do it soon, hopefully - Noah
const SfdcProfileSelectionView = ({
  destLoadData,
  destFilterDto,
  setDestFilterDto,
  destLoading,
  destData,
  loadData,
  filterDto,
  setFilterDto,
  loading,
  data,
  handleComponentCheck,
  handleCheckAllClickComponentTypes,
}) => {
  const fields = sfdcTableConstants.fields;

  const columnsWithOutCheckBoxCell = useMemo(
    () => [      
      {...getTableTextColumn(fields.find(field => { return field.id === "committedFile";})), class: "force-text-wrap"},
      // getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime"})),
    ],
    [],
  );

  const sfdcColumnsWithCheckBoxCell = useMemo(
    () => [
      {...getTableTextColumn(fields.find(field => { return field.id === "committedFile";})), class: "force-text-wrap"},
      // getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime"})),
      getCheckBoxColumn(handleComponentCheck)  
    ],
    [],
  );

  const getDestSfdcModifiedFilesView = () => {
    return (        
      <CustomTable
        className={"table-no-border"}
        columns={columnsWithOutCheckBoxCell}
        data={destData}              
        isLoading={destLoading}
        loadData={destLoadData}
        noDataMessage={sfdcTableConstants.noDataMessage}
        initialState={sfdcTableConstants.initialState}
        paginationDto={destFilterDto}
        setPaginationDto={setDestFilterDto}        
      />
    );
  };

  const getSfdcModifiedFilesView = () => {
    return (  
        <CustomTable
          className={"table-no-border"}
          columns={sfdcColumnsWithCheckBoxCell}
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

  const getSfdcInlineFilters = () => {    
    return (
      <div className="px-2 d-flex small">
        <div className="pr-4">
          <InlineBooleanFilter
            toolTipText={"This will select all the items on this page only."}
            loadData={handleCheckAllClickComponentTypes}
            filterDto={filterDto}
            setFilterDto={setFilterDto}
            fieldName={"checkAll"}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="destSfdcTableContainer mt-2">
        <div className="pr-2">
            <FilterContainer
                loadData={loadData}
                filterDto={filterDto}
                setFilterDto={setFilterDto}
                isLoading={loading}
                title={"SFDC Files"}
                titleIcon={faSalesforce}
                body={getSfdcModifiedFilesView()}
                supportSearch={true}
                inlineFilters={getSfdcInlineFilters()}
            />
        </div>
        <div>
            <FilterContainer
                loadData={destLoadData}
                filterDto={destFilterDto}
                setFilterDto={setDestFilterDto}
                isLoading={destLoading}
                title={"Destination SFDC Files"}
                titleIcon={faCode}
                body={getDestSfdcModifiedFilesView()}              
                supportSearch={true}
            />
        </div>
    </div>
  );

};

SfdcProfileSelectionView.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  handleComponentCheck: PropTypes.func,
  handleCheckAllClickComponentTypes: PropTypes.func  ,
  destLoadData: PropTypes.func,
  destFilterDto: PropTypes.object,
  setDestFilterDto: PropTypes.func,
  destLoading: PropTypes.bool,
  destData: PropTypes.object
};

export default SfdcProfileSelectionView;