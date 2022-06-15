import React from "react";
import PropTypes from "prop-types";
import ListInputBase from "components/common/inputs/list/ListInputBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

const SapCpqRunAssistantMigrationObjectList = ({
  sapCpqRunParametersModel,
  setSapCpqRunParametersModel,
  loadDataFunction,
  migrationObjects,
  isLoading,
  migrationObjectPullCompleted,
}) => {
  const noDataFilesPulledMessage =
    "The Migration Objects pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage =
    "The Migration Objects list has not been received from SAP yet. Please click the refresh button to resume polling for the files.";

  const customTemplate = (item) => {
    const type = hasStringValue(item["type"]) === true ? item["type"] : "";
    const name = item["name"] !== "" ? item["name"] : "";
    const scriptCategoryName =
      item["scriptCategoryName"] !== "" ? item["scriptCategoryName"] : "";
    const commitId = item["commitId"] !== "" ? item["commitId"] : "";
    const action = item["action"] !== "" ? item["action"] : "";

    return `
      <div>
        <div class="d-flex justify-content-between mb-2">
            <div>${name}</div>
            <div>${type}</div>
        </div>
        <div>${scriptCategoryName}</div>
        <div class="d-flex justify-content-between mt-2">
            <div>Commit ID: ${commitId}</div>
            <div>${action}</div>
        </div>
      </div>
    `;
  };

  const searchFunction = (item, searchTerm) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const getSelectedModifiedValues = (selectedIndexes, modifiedFilesList) => {
    let res = [];
    res = modifiedFilesList.filter((el) => {
      return selectedIndexes.some((obj) => {
        return el.id.toString() === obj.toString();
      });
    });
    return res;
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let finalList = getSelectedModifiedValues(selectedOption, migrationObjects);
    const dataObj = { ...sapCpqRunParametersModel };
    dataObj.setData("selectedFiles", finalList);
    dataObj.setData("selectedMigrationObjects", selectedOption);
    setSapCpqRunParametersModel({ ...dataObj });
  };

  const clearDataFunction = (fieldName, selectedOption) => {
    const dataObj = { ...sapCpqRunParametersModel };
    dataObj.setData("selectedFiles", []);
    dataObj.setData("selectedMigrationObjects", []);
    setSapCpqRunParametersModel({ ...dataObj });
  };

  return (
    <div>
      <ListInputBase
        customTitle={"Modified Files"}
        fieldName={"selectedMigrationObjects"}
        valueField={"id"}
        selectOptions={migrationObjects}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        searchFunction={searchFunction}
        showSelectAllButton={true}
        dataObject={sapCpqRunParametersModel}
        setDataObject={setSapCpqRunParametersModel}
        customTemplate={customTemplate}
        isLoading={isLoading}
        loadDataFunction={loadDataFunction}
        noDataMessage={
          migrationObjectPullCompleted
            ? noDataFilesPulledMessage
            : noDataFilesNotPulledMessage
        }
      />
    </div>
  );
};

SapCpqRunAssistantMigrationObjectList.propTypes = {
  isLoading: PropTypes.bool,
  migrationObjects: PropTypes.arrayOf(PropTypes.object),
  loadDataFunction: PropTypes.func,
  sapCpqRunParametersModel: PropTypes.object,
  setSapCpqRunParametersModel: PropTypes.func,
  migrationObjectPullCompleted: PropTypes.bool,
};

export default SapCpqRunAssistantMigrationObjectList;
