import React, {useContext, useMemo, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import modelHelpers from "components/common/model/modelHelpers";
import CustomTable from "components/common/table/CustomTable";
import {terraformCloudWorkspacesMetadata} from "./terraformCloudWorkspaces.metadata";
import CreateTerraformCloudWorkspaceOverlay from "./CreateTerraformCloudWorkspaceOverlay";
import axios from "axios";
import terraformCloudWorkspacesActions from "./terraformCloudWorkspaces.actions";
import {AuthContext} from "contexts/AuthContext";

function TerraformCloudWorkspacesTable({
    toolId, 
    setTerraformCloudWorkspacesModel,
    organizationName,
    terraformCloudWorkspacesList,
    setTerraformCloudWorkspacesList
  }) {

  console.log({terraformCloudWorkspacesList});

  const fields = terraformCloudWorkspacesMetadata.fields;
  const toastContext = useContext(DialogToastContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

  useEffect (() => {
    if(cancelTokenSource){
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await terraformCloudWorkspacesActions.getTerraformCloudWorkspaces(getAccessToken, cancelSource, toolId, organizationName);
      const workspaces = response?.data?.data;

      console.log({workspaces});

      if(Array.isArray(workspaces)) {        
        setTerraformCloudWorkspacesList(workspaces);        
      }

    } catch (error) {
      if(isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true) {
        setIsLoading(false);
      }      
    }
  };

  const createTerraformCloudWorkspace = () => {
    toastContext.showOverlayPanel(
      <CreateTerraformCloudWorkspaceOverlay 
        toolId={toolId} 
        loadData={loadData} 
        isMounted={isMounted} 
      />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "workspaceName")),
    ],
    []
  );

  const onRowSelect = async (rowData) => {    
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, terraformCloudWorkspacesMetadata);
    setTerraformCloudWorkspacesModel({...parsedModel});
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={terraformCloudWorkspacesList}
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
      addRecordFunction={createTerraformCloudWorkspace}
      body={getTable()}
      isLoading={isLoading}
      metaData={terraformCloudWorkspacesMetadata}
      titleIcon={faBrowser}
      title={"Terraform Cloud Workspaces"}
      type={"Terraform Cloud Workspace"}
    />
  );
}

TerraformCloudWorkspacesTable.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  toolData: PropTypes.object,
  setTerraformCloudWorkspacesModel: PropTypes.func,
  organizationName: PropTypes.string,
  terraformCloudWorkspacesList: PropTypes.array,
  setTerraformCloudWorkspacesList: PropTypes.func,  
};

export default TerraformCloudWorkspacesTable;
