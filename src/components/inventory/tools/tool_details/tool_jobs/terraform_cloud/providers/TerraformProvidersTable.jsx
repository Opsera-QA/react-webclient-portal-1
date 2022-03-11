import React, {useContext, useMemo, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";
import {terraformProvidersMetadata} from "./terraformProviders.metadata";
import CreateTerraformProviderOverlay from "./CreateTerraformProviderOverlay";
import axios from "axios";
import terraformProvidersActions from "./terraformProviders.actions";
import {AuthContext} from "contexts/AuthContext";

function TerraformProvidersTable({
    toolId,
    organizationName,
    terraformProvidersList,
    setTerraformProvidersList,
    handleRowSelect
  }) {

  const fields = terraformProvidersMetadata.fields;
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
  }, [toolId, organizationName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await terraformProvidersActions.getTerraformVcsProviders(getAccessToken, cancelSource, toolId, organizationName);
      const providers = response?.data?.data;

      if(Array.isArray(providers)) {        
        setTerraformProvidersList(providers);        
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

  const createTerraformProvider = () => {
    toastContext.showOverlayPanel(
      <CreateTerraformProviderOverlay 
        toolId={toolId} 
        loadData={loadData} 
        isMounted={isMounted} 
      />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "vcsProviderName")),
      getTableTextColumn(getField(fields, "id")),
      getTableTextColumn(getField(fields, "serviceProviderDisplayName")),
      getTableTextColumn(getField(fields, "callbackUrl")),
      getTableTextColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const onRowSelect = async (rowData) => {    
    handleRowSelect(rowData?.original);
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={terraformProvidersList}
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
      addRecordFunction={createTerraformProvider}
      body={getTable()}
      isLoading={isLoading}
      metaData={terraformProvidersMetadata}
      titleIcon={faBrowser}
      title={"Terraform VCS Providers"}
      type={"Terraform VCS Provider"}
    />
  );
}

TerraformProvidersTable.propTypes = {
  toolId: PropTypes.string,
  organizationName: PropTypes.string,
  terraformProvidersList: PropTypes.array,
  setTerraformProvidersList: PropTypes.func,
  handleRowSelect: PropTypes.func,
};

export default TerraformProvidersTable;
