import React, {useContext, useMemo } from "react";
import PropTypes from "prop-types";
import azureStorageMetadata from "./azure-storage-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import AzureStorageOverlay from "./AzureToolStorageOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function AzureStorageTable({ toolData, azureStorage, loadData, isLoading }) {
  const toastContext = useContext(DialogToastContext);  
  
  let fields = azureStorageMetadata.fields;

  const createAzureStorage = () => {
    toastContext.showOverlayPanel(<AzureStorageOverlay toolData={toolData} loadData={loadData} editMode={false} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "storageName")),
      getTableTextColumn(getField(fields, "storageAccessToken"))      
    ],
    []
  );

  const onRowSelect = async (grid, row) => {    
    toastContext.showOverlayPanel(
      <AzureStorageOverlay 
        toolData={toolData} 
        loadData={loadData} 
        editMode={true} 
        editRowData={row}
      />
    );
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={azureStorage}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
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
      addRecordFunction={toolData?.data?.configuration ? createAzureStorage : undefined}
      body={getTable()}
      showBorder={false}
    />
  );
}

AzureStorageTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  azureStorage: PropTypes.array
};

export default AzureStorageTable;
