import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import PipelineActions from "../../../../../../../pipeline-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AzureDevopsPipelineSelectInput({ fieldName, dataObject, setDataObject, disabled, organization, projectName, textField, valueField,}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [azureDevopsList, setAzureDevopsList] = useState([]);
  const [isAzureDevopsSearching, setIsAzureDevopsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Azure Devops Pipeline");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
      });
    

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [organization, projectName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchAzureDevopsDetails(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(!fieldName)) {
      return (
          <span><FontAwesomeIcon icon={faTools} className="pr-1" />Pipeline unavailable</span>
      );
    }
    return <span>Select an Azure DevOps Pipeline.</span>;
  };


  const fetchAzureDevopsDetails = async (cancelSource) => {
    setIsAzureDevopsSearching(true);
    try {
      const vaultAccessToken = await dataObject.getData("accessToken");
      const vaultResults = await PipelineActions.getAzurePersonalAccessToken(vaultAccessToken.vaultKey, getAccessToken, cancelTokenSource);
      const user = await getUserRecord();

      const postBody = {
        stepConfiguration: {
          "organizationName": organization,
          "azurePipelineId": await dataObject.getData("azurePipelineId"),
          "projectName": projectName
        },
        secureKey: vaultResults?.data,
        userId: user._id
        };

      if (!organization || !projectName ){
        setPlaceholder("No Azure Devops Pipelines Available");
        return;
      }

      let results = await PipelineActions.getAzurePipelines(getAccessToken, cancelSource, postBody);
      let azurePipelinesArray = await results?.data?.message?.message?.value;
    
      const filteredList = azurePipelinesArray.filter((pipeline) => pipeline.name !== undefined);  
  
      if (filteredList) {
        setAzureDevopsList(filteredList);
      }
    } catch(error) {
      setPlaceholder("No Azure Devops Pipelines Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsAzureDevopsSearching(false);
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "azurePipelineId") {
      let newDataObject = dataObject;
      newDataObject.setData("azurePipelineId", value.id);
      setDataObject({ ...newDataObject });
      return;
    }
  };


  return (
    <div>
      <SelectInputBase
        setDataFunction={handleDTOChange}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={azureDevopsList ? azureDevopsList : []}
        busy={isAzureDevopsSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (azureDevopsList == null || azureDevopsList.length === 0))}
      />
      <small className="text-muted ml-3">
        {getInfoText()}
      </small>
    </div>
  );
}

AzureDevopsPipelineSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  getFromVault: PropTypes.func,
  organization: PropTypes.string,
  projectName: PropTypes.string
};

AzureDevopsPipelineSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default AzureDevopsPipelineSelectInput;