import React, {useContext, useMemo } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import modelHelpers from "components/common/model/modelHelpers";
import CustomTable from "components/common/table/CustomTable";
import {terraformCloudOrganizationsMetadata} from "./terraformCloudOrganizations.metadata";
import CreateTerraformCloudOrganizationOverlay from "./CreateTerraformCloudOrganizationOverlay";

function TerraformCloudOrganizationsTable({ 
    terraformCloudOrganizationsList,
    toolId,  
    loadData, 
    isLoading, 
    isMounted, 
    setTerraformCloudOrganizationsModel,
  }) { 

  const fields = terraformCloudOrganizationsMetadata.fields;
  const toastContext = useContext(DialogToastContext);

  const createTerraformCloudOrganization = () => {
    toastContext.showOverlayPanel(
      <CreateTerraformCloudOrganizationOverlay 
        toolId={toolId} 
        loadData={loadData} 
        isMounted={isMounted} 
      />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "storageAccountName")),
    ],
    []
  );

  const onRowSelect = async (rowData) => {    
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, terraformCloudOrganizationsMetadata);
    setTerraformCloudOrganizationsModel({...parsedModel});
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={terraformCloudOrganizationsList}
        loadData={loadData}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      addRecordFunction={createTerraformCloudOrganization}
      body={getTable()}
      isLoading={isLoading}
      metaData={terraformCloudOrganizationsMetadata}
      titleIcon={faBrowser}
      title={"Terraform Cloud Organizations"}
      type={"terraformCloud"}
    />
  );
}

TerraformCloudOrganizationsTable.propTypes = {
  toolId: PropTypes.string,
  terraformCloudOrganizationsList: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  toolData: PropTypes.object,
  setTerraformCloudOrganizationsModel: PropTypes.func
};
export default TerraformCloudOrganizationsTable;