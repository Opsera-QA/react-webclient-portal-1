import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import PipelineActions from "../../../../../../../../workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";

function AzureDevopsToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [azureDevopsList, setAzureDevopsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select an Azure Devops token");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchAzureDevopsDetails(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Azure DevOps Tools");
        setErrorMessage(`An Error Occurred Pulling Azure DevOps Tools: ${error}`);
        console.error(error);  
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}>
          <span><FontAwesomeIcon icon={faTools} className="pr-1" />View Or Edit this Tool&apos;s Registry settings</span>
        </Link>
      );
    }
    return <span>Select a tool to get started.</span>;
  };


  const fetchAzureDevopsDetails = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    try {
      const results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "azure-devops");
      const azureToolsArray = results?.data?.filter((el) => el.configuration !== undefined);

      if (azureToolsArray && Array.isArray(azureToolsArray)) {
        setAzureDevopsList(azureToolsArray);
      }

    } catch(error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setDataFunction = async (fieldName, newAzureTool) => {
    let newDataObject = dataObject;
    newDataObject.setData("toolConfigId", newAzureTool?._id);
    newDataObject.setData("organizationName", newAzureTool?.configuration?.organization);
    newDataObject.setData("accessToken", newAzureTool?.configuration?.accessToken);
    setDataObject({ ...newDataObject });
};


  const clearDataFunction = async () => {
    let newDataObject = dataObject;
    newDataObject.setData("toolConfigId", "");
    newDataObject.setData("organizationName", "");
    newDataObject.setData("azurePipelineId", "");
    newDataObject.setData("accessToken", "");
    setDataObject({...newDataObject});
  };

  return (
    <div>
      <SelectInputBase
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={azureDevopsList}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        requireClearDataConfirmation={true}
        placeholderText={placeholderText}
        clearDataFunction={clearDataFunction}
        errorMessage={errorMessage}
        disabled={disabled || isLoading}
      />
      <small className="text-muted ml-3">
        {getInfoText()}
      </small>
      <TextInputBase 
      disabled={true} 
      dataObject={dataObject} 
      setDataObject={setDataObject} 
      fieldName={"organizationName"}/>
    </div>
  );
}

AzureDevopsToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

AzureDevopsToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name"
};

export default AzureDevopsToolSelectInput;