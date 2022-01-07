import React from 'react';
import PropTypes from "prop-types";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {getInformaticaIntelligentCloudServiceTypeLabel} from "components/common/list_of_values_input/tools/informatica/iics_types/informaticaIntelligentCloudService.types";

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

  const customTemplate = (item) => {
    const type = hasStringValue(item["type"]) === true ? getInformaticaIntelligentCloudServiceTypeLabel(item["type"]) : "";
    const path = item["path"] !== "" ? item["path"] : "";
    const description = item["description"] !== "" ? item["description"] : "";
    const updatedBy = item["updatedBy"] !== "" ? item["updatedBy"] : "";
    const updateTime = item["updateTime"] !== "" ? item["updateTime"] : "";

    return (`
      <div>
        <div class="d-flex justify-content-between mb-2">
            <div>${path}</div>
            <div>${type}</div>
        </div>
        <div>${description}</div>
        <div class="d-flex justify-content-between mt-2">
            <div>${updatedBy}</div>
            <div>${updateTime}</div>
        </div>
      </div>
    `);
  };


  return (
    <div>
      <ListInputBase
        customTitle={"Migration Objects"}
        fieldName={"selectedMigrationObjects"}
        valueField={"_id"}
        selectOptions={migrationObjects}
        showSelectAllButton={true}
        dataObject={informaticaRunParametersModel}
        setDataObject={setInformaticaRunParametersModel}
        customTemplate={customTemplate}
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