import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import PipelineActions from "components/workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTools } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";

function AzureAcrPushToolConfigIdSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [coverityList, setJenkinsList] = useState([]);
  const [isJenkinsSearching, setIsJenkinsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Jenkins Instance");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
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
  }, []);
  

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await fetchJenkinsDetails(cancelSource);
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

  const fetchJenkinsDetails = async (cancelSource) => {
    setIsJenkinsSearching(true);
    try {
      let results = await PipelineActions.getToolsListV2(getAccessToken, cancelSource, "jenkins");
      if (results?.data) {
        let respObj = [];
        let arrOfObj = results.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
          });
        });
        results = respObj;
      }
      const filteredList = results ? results.filter((el) => el.configuration !== undefined) : [];
      if (filteredList) {
        setJenkinsList(filteredList);
      }
    } catch (error) {
      setPlaceholder("No Jenkins Tool Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
        setIsJenkinsSearching(false);
    }
  };

  const setDataFunction=(fieldName,selectedOption)=>{
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName,selectedOption[valueField]);
    newDataObject.setData("toolName",selectedOption['name']);
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("buildType", "docker");
    newDataObject.setData("agentLabels", "");
    setDataObject({...newDataObject});
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={coverityList ? coverityList : []}
        busy={isJenkinsSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isJenkinsSearching || (coverityList == null || coverityList.length === 0)}
      />
      <small className="text-muted ml-3">{getInfoText()}</small>
    </div>
  );
}

AzureAcrPushToolConfigIdSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

AzureAcrPushToolConfigIdSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  fieldName: "toolConfigId",
};

export default AzureAcrPushToolConfigIdSelectInput;
