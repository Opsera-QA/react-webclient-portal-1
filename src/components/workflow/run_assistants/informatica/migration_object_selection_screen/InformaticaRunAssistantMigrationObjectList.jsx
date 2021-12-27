import React from 'react';
import PropTypes from "prop-types";
import ListInputBase from "components/common/inputs/list/ListInputBase";

const InformaticaRunAssistantMigrationObjectList = (
  { 
    informaticaRunParametersModel, 
    setInformaticaRunParametersModel, 
    loadDataFunction,
    migrationObjects, 
    isLoading, 
    migrationObjectPullCompleted,
  }) => {
  const noDataFilesPulledMessage = "The Migration Objects pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Migration Objects list has not been received from Informatica yet. Please click the refresh button to resume polling for the files.";

  return (
    <div>
      <ListInputBase
        customTitle={"Migration Objects"}
        fieldName={"selectedMigrationObjects"}
        selectOptions={migrationObjects}
        dataObject={informaticaRunParametersModel}
        setDataObject={setInformaticaRunParametersModel}
        isLoading={isLoading}
        loadDataFunction={loadDataFunction}
        noDataMessage={migrationObjectPullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}
      />
    </div>
  );

};

InformaticaRunAssistantMigrationObjectList.propTypes = {
  isLoading: PropTypes.bool,
  migrationObjects: PropTypes.arrayOf(PropTypes.object),
  loadDataFunction: PropTypes.func,
  informaticaRunParametersModel: PropTypes.object,
  setInformaticaRunParametersModel: PropTypes.func,
  migrationObjectPullCompleted: PropTypes.bool
};

export default InformaticaRunAssistantMigrationObjectList;