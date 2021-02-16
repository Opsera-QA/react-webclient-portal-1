import React, { useContext, useState, useEffect, useMemo }  from 'react'
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateColumn,
  getTableTextColumn,
  getCheckBoxColumn
} from "components/common/table/table-column-helpers";

function ModifiedFilesTabView({
    loading,
    data,
    loadData,
    paginationDto,
    setPaginationDto,
    handleComponentCheck,
    module
}) {
  const initialState = {
    pageIndex: 0
  };
  
  const fields = [
    {
      label: "Component", 
      id: "componentType"
    },
    {
      label: "File", 
      id: "committedFile"
    },
    {
      label: "Commit Time", 
      id: "committedTime"
    },
    {
      label: "Committed By", 
      id: "committedBy"
    },
    {
      label: "Commit Action", 
      id: "commitAction"
    },
    {
      label: "SFDC File Id", 
      id: "committedFileId"
    }
  ]

  const noDataMessage = "Modified Files Data not available for selected Criteria";

  const columnsWithCheckBoxCell = useMemo(
    () => [      
      getTableTextColumn(fields.find(field => { return field.id === "componentType"})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile"})),
      getTableDateColumn(fields.find(field => { return field.id === "committedTime"})),
      getCheckBoxColumn(handleComponentCheck)  
    ],
    [],
  );

  const sfdcColumnsWithCheckBoxCell = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "committedFileId"})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType"})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile"})),
      getTableDateColumn(fields.find(field => { return field.id === "committedTime"})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy"})),
      getCheckBoxColumn(handleComponentCheck)  
    ],
    [],
  );
  
  const gitColumnsWithCheckBoxCell = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "commitAction"})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType"})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile"})),
      getTableDateColumn(fields.find(field => { return field.id === "committedTime"})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy"})),
      getCheckBoxColumn(handleComponentCheck)  
    ],
    [],
  );

  const columnsWithOutCheckBoxCell = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "componentType"})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile"})),
      getTableDateColumn(fields.find(field => { return field.id === "committedTime"})),
    ],
    [],
  );
  
  return (
    <div>
      {/* upload component goes here */}
      {/* TODO: Check if the component is being called from profiles or sfdc or git and then make csv upload changes */}
      {/* table component goes here */}
      <CustomTable
        className={"table-no-border"}
        columns={module === 'sfdc' ? sfdcColumnsWithCheckBoxCell : module === 'git' ? gitColumnsWithCheckBoxCell : columnsWithOutCheckBoxCell}
        data={data}              
        isLoading={loading}
        loadData={loadData}
        noDataMessage={noDataMessage}
        initialState={initialState}
        paginationDto={paginationDto}
        setPaginationDto={setPaginationDto}        
      />
    </div>
  )
}

ModifiedFilesTabView.propTypes = {
  loading: PropTypes.bool,
  data:PropTypes.object,
  loadData: PropTypes.func,
  paginationDto: PropTypes.object,
  setPaginationDto: PropTypes.func,
  handleComponentCheck: PropTypes.func
};

export default ModifiedFilesTabView
