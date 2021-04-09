import React, { useState, useMemo }  from 'react';
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
  getCheckBoxColumn
} from "components/common/table/table-column-helpers";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import InlineBooleanFilter from "components/common/filters/boolean/InlineBooleanFilter";
import SfdcComponentFilter from "components/common/filters/sfdc/sfdc_component/SfdcComponentFilter";
import CSVFileUploadComponent from '../csv_file_upload/CSVFileUploadComponent';

const SfdcModifiedFilesTabView = ({
  loadData,
  filterDto,
  setFilterDto,
  loading,
  componentType,
  data,
  handleComponentCheck,
  handleCheckAllClickComponentTypes,
  fileUploadFlag,
  recordId,
  updateAttribute,
  callbackFunc,
  fromGit,
  fromSFDC,
  fromDestinationSFDC,
  fromProfileComponents,
  allSFDCComponentType,
  allGitComponentType,
  allDestSfdcComponentType,
  allProfileComponentType,
  gitTaskData
}) => {
  const [files, setFiles] = useState([]);

  const fields = sfdcTableConstants.fields;

  const sfdcColumnsWithCheckBoxCell = useMemo(
    () => [      
      getTableTextColumn(fields.find(field => { return field.id === "committedFileId";})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType";})),
      // getTableTextColumn(fields.find(field => { return field.id === "committedFile"})),
      {...getTableTextColumn(fields.find(field => { return field.id === "committedFile";})), class: "force-text-wrap"},
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy";})),
      getCheckBoxColumn(handleComponentCheck)  
    ],
    [],
  );

  const getSfdcModifiedFilesView = () => {
    return (  
      <div>
        {/* upload component goes here */}
        {fileUploadFlag && 
          <CSVFileUploadComponent
            recordId={recordId}
            updateAttribute={updateAttribute}
            callbackFunc={callbackFunc}
            fromGit={fromGit}
            fromSFDC={fromSFDC}
            fromDestinationSFDC={fromDestinationSFDC}
            fromProfileComponents={fromProfileComponents}
            allSFDCComponentType={allSFDCComponentType}
            allGitComponentType={allGitComponentType}
            allDestSfdcComponentType={allDestSfdcComponentType}
            allProfileComponentType={allProfileComponentType}
            setFiles={setFiles}
            gitTaskData={gitTaskData}
          />
        }
        
        {/* table component goes here */}
        <CustomTable
          className={"table-no-border" + (files.length > 0 ? " opacity-half" : " ") }
          columns={sfdcColumnsWithCheckBoxCell}
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
      title={"SFDC Files"}
      titleIcon={faSalesforce}
      body={getSfdcModifiedFilesView()}              
      supportSearch={true}
      inlineFilters={getSfdcInlineFilters()}
    />
  );
};

SfdcModifiedFilesTabView.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  componentType: PropTypes.arrayOf(PropTypes.object),
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  handleComponentCheck: PropTypes.func,
  handleCheckAllClickComponentTypes: PropTypes.func,
  fileUploadFlag:  PropTypes.bool,
  recordId: PropTypes.string,
  updateAttribute: PropTypes.string,
  callbackFunc: PropTypes.func,
  fromGit: PropTypes.bool,
  fromSFDC: PropTypes.bool,
  fromDestinationSFDC: PropTypes.bool,
  fromProfileComponents: PropTypes.bool,
  allSFDCComponentType: PropTypes.array,
  allGitComponentType: PropTypes.array,
  allDestSfdcComponentType: PropTypes.array,
  allProfileComponentType: PropTypes.array,
  gitTaskData: PropTypes.object
};

export default SfdcModifiedFilesTabView;