import React from 'react';
import PropTypes from "prop-types";
import ListInputBase from "components/common/inputs/list/ListInputBase";

const ApigeeRunAssistantMigrationObjectList = (
  { 
    apigeeRunParametersModel, 
    setApigeeRunParametersModel, 
    loadDataFunction,
    migrationObjects, 
    isLoading, 
    migrationObjectPullCompleted,
  }) => {
  const noDataFilesPulledMessage = "The Migration Objects pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Migration Objects list has not been received from Apigee yet. Please click the refresh button to resume polling for the files.";

  const customTemplate = (item) => {
    const type = item["type"] !== "" ? item["type"] : "";
    const name = item["name"] !== "" ? item["name"] : "";

    return (`
      <div>
        <div class="d-flex justify-content-between mb-2">
            <div>Name: ${name}</div>
            <div>Type: ${type}</div>
        </div>        
      </div>
    `);
  };

  const searchFunction = (item, searchTerm) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const setDataFunction = (fieldName, selectedOption) => {
    const dataObj = {...apigeeRunParametersModel};    
    const selectedId = selectedOption.pop();
    const selectedObject = migrationObjects.find(obj => obj.id === selectedId);
    selectedOption.push(selectedObject);
    dataObj.setData("selectedMigrationObjects", selectedOption);
    setApigeeRunParametersModel({...dataObj});
  };

  return (
    <div>
      <ListInputBase
        customTitle={"Migration Objects"}
        fieldName={"selectedMigrationObjects"}
        valueField={"id"}
        selectOptions={migrationObjects}
        searchFunction={searchFunction}
        showSelectAllButton={false}
        dataObject={apigeeRunParametersModel}
        setDataObject={setApigeeRunParametersModel}
        setDataFunction={setDataFunction}
        customTemplate={customTemplate}
        isLoading={isLoading}
        loadDataFunction={loadDataFunction}
        noDataMessage={migrationObjectPullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}
      />
    </div>
  );

};

ApigeeRunAssistantMigrationObjectList.propTypes = {
  isLoading: PropTypes.bool,
  migrationObjects: PropTypes.arrayOf(PropTypes.object),
  loadDataFunction: PropTypes.func,
  apigeeRunParametersModel: PropTypes.object,
  setApigeeRunParametersModel: PropTypes.func,
  migrationObjectPullCompleted: PropTypes.bool
};

export default ApigeeRunAssistantMigrationObjectList;