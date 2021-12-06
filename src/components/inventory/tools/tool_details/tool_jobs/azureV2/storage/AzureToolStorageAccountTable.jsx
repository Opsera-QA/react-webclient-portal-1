import React, {useContext, useMemo } from "react";
import PropTypes from "prop-types";
import azureStorageMetadata from "./azure-storage-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateAzureStorageOverlay from "./CreateAzureToolStorageAccountOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function AzureStorageTable({ toolId, azureStorageAccountsList, loadData, isLoading, isMounted, toolData}) { 
  
  const fields = azureStorageMetadata.fields;
  const toastContext = useContext(DialogToastContext);

  const createAzureStorage = () => {
    toastContext.showOverlayPanel(
      <CreateAzureStorageOverlay 
        toolId={toolId} 
        loadData={loadData} 
        isMounted={isMounted} 
        toolData={toolData}
      />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "storageAccountName")),
      getTableTextColumn(getField(fields, "azureStorageAccountToken"))      
    ],
    []
  );

  const onRowSelect = async (grid, row) => {    
    toastContext.showOverlayPanel(
      <CreateAzureStorageOverlay 
        toolId={toolId} 
        loadData={loadData} 
        editMode={true} 
        editRowData={row}
        toolData={toolData}
      />
    );
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={azureStorageAccountsList}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Azure Storage Accounts"}
      type={"Azure Storage Accounts"}
      titleIcon={faBrowser}
      addRecordFunction={createAzureStorage}
      body={getTable()}
      showBorder={false}
    />
  );
}

AzureStorageTable.propTypes = {
  toolId: PropTypes.string,
  azureStorageAccountsList: PropTypes.array,
  setAzureStorageAccountsList: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  toolData: PropTypes.object
};

export default AzureStorageTable;
