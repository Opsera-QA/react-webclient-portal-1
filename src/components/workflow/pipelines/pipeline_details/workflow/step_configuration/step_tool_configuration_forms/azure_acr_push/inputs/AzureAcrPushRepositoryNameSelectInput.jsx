import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import azurePipelineActions from "../azure-pipeline-actions";
import { DialogToastContext } from "contexts/DialogToastContext";

function AzureAcrPushRepositoryNameSelectInput({ dataObject, setDataObject ,disabled, azureRegistryName, azureConfig, applicationData}) {
    const { getAccessToken } = useContext(AuthContext);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [placeholderText, setPlaceholderText] = useState("Select option");
    const [repoList,setRepoList] = useState([]);


    useEffect(() => {
        if (cancelTokenSource) {
          cancelTokenSource.cancel();
        }    
        const source = axios.CancelToken.source();
        setCancelTokenSource(source);
        isMounted.current = true;
    
        setErrorMessage("");
        // if(azureConfig && applicationData && azureRegistryName && azureRegistryName!==null && azureRegistryName!="") {
        if(azureConfig && azureRegistryName && azureRegistryName!==null && azureRegistryName!="") {
          loadData(source).catch((error) => {
            if (isMounted?.current === true) {
              throw error;
            }
          });
        }
    
        return () => {
          source.cancel();
          isMounted.current = false;
        };
      }, [azureRegistryName, azureConfig, applicationData]);

      
    
      const loadData = async (cancelSource = cancelTokenSource) => {
        try {
          setIsLoading(true);
          if(azureRegistryName && azureRegistryName!==null && azureRegistryName!=""){
            await fetchAzureRepositoryList(cancelSource);
          }
        }
        catch (error) {
          if (isMounted?.current === true) {
            setPlaceholderText("Could not pull Azure Repository List");
            setErrorMessage(`An Error Occurred Pulling Repository List: ${error}`);
            console.error(error);  
          }
        }
        finally {
          setIsLoading(false);
        }
      };

      const fetchAzureRepositoryList = async (cancelSource = cancelTokenSource) => {
        
        const response = await azurePipelineActions.getAzureRepositories(getAccessToken, cancelSource, dataObject, azureConfig );
        const result = response?.data?.data;
    
        if (Array.isArray(result) && result.length > 0) {
          setErrorMessage("");
          setRepoList(result);
        }
    
        if (result?.length === 0){
          setPlaceholderText("No projects found with this configuration");
          setErrorMessage("No Azure Projects have been found associated with this Azure Tool Registry Account");
        }
      };

      const setDataFunction=(fieldName,selectedOption)=>{
        let newDataObject = {...dataObject};
        newDataObject.setData("azureRepoName", selectedOption);           
        setDataObject({...newDataObject});
      };

  return (
    <SelectInputBase
      fieldName={"azureRepoName"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={repoList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      errorMessage={errorMessage}
      placeholderText={placeholderText}
      disabled={disabled || isLoading || (repoList == null || repoList.length === 0)}
    />
  );
}

AzureAcrPushRepositoryNameSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  azureRegistryName: PropTypes.string,
  azureConfig: PropTypes.object,
  applicationData: PropTypes.object,
};

AzureAcrPushRepositoryNameSelectInput.defaultProps = {
    disabled:false
  };

export default AzureAcrPushRepositoryNameSelectInput;
