import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import PipelineActions from "../../../../../../../../workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AzureDevopsToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [azureDevopsList, setAzureDevopsList] = useState([]);
  const [isAzureDevopsSearching, setIsAzureDevopsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Azure Devops token");
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchAzureDevopsDetails(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
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
    setIsAzureDevopsSearching(true);
    try {
      const results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "azure-devops" );
      const resultsArray = results?.data;
      const filteredList = resultsArray.filter((el) => el.configuration !== undefined);
      
      const newDevOpsToolList = filteredList ? filteredList.map(tool => {
        return {
          accounts: tool.accounts,
          configuration: tool.configuration,
          id: tool._id,
          jobs: tool.jobs,
          name: tool.name,
        };
      }) : undefined; 

      if (newDevOpsToolList) {
        setAzureDevopsList(newDevOpsToolList);
      }
    } catch(error) {
      setPlaceholder("No Azure Devops Tools Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsAzureDevopsSearching(false);
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "toolConfigId") {
      let newDataObject = dataObject;
      newDataObject.setData("toolConfigId", value.id);
      newDataObject.setData("accessToken", value.configuration.accessToken);
      setDataObject({ ...newDataObject });
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
  valueField: "id",
  textField: "name"
};

export default AzureDevopsToolSelectInput;