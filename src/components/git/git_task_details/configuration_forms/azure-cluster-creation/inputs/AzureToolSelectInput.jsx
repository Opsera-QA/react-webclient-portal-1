import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import PipelineActions from "components/workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTools } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";

function AzureToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField , setAzureConfig}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Azure Account");
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
  }, [dataObject.getData('')]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchAzureDetails(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}>
          <span>
            <FontAwesomeIcon icon={faTools} className="pr-1" />
            View Or Edit this Tool&apos;s Registry settings
          </span>
        </Link>
      );
    }
    return "Select a tool to continue";
  };

  const fetchAzureDetails = async (cancelSource) => {
    setIsSearching(true);
    try {
      let results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "azure");
      if (results?.data) {
        let respObj = [];
        let arrOfObj = results.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            owner: item.owner,
            applications: item.applications
          });
        });
        results = respObj;
      }
      const filteredList = results ? results.filter((el) => el.configuration !== undefined) : [];
      if (filteredList) {
        setList(filteredList);
        if(!dataObject.isNew() && dataObject.getData("azureToolConfigId")){
          setAzureConfig(filteredList.find(el=>el.id == dataObject.getData("azureToolConfigId")));
        }
      }
    } catch (error) {
      setPlaceholder("No Azure Tool Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
        setIsSearching(false);
    }
  };
  
  const handleChange=(fieldName,selectedOption)=>{
    setAzureConfig(list.find(el=>el.id == selectedOption.id));
    let newDataObject = {...dataObject};    
    newDataObject.setData(fieldName, selectedOption.id);
    setDataObject({...newDataObject});
  };

  const clearDataFunction=()=>{
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("azureCredentialId", "");
    setAzureConfig(null);  
    setDataObject({...newDataObject});
  };

  

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={handleChange}
        clearDataFunction={clearDataFunction}
        selectOptions={list ? list : []}
        busy={isSearching ||  isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading ||  isSearching || (list == null || list.length === 0)}
      />
      <small className="text-muted ml-3">{getInfoText()}</small>
    </div>
  );
}

AzureToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  setAzureToolConfigObj: PropTypes.func,
  setAzureConfig:PropTypes.func,
};

AzureToolSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  fieldName: "azureToolConfigId",
  
};

export default AzureToolSelectInput;
