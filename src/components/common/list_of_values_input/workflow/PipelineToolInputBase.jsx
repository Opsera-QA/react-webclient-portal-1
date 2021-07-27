import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import axios from "axios";

function PipelineToolInputBase({ toolType, toolFriendlyName, placeholderText, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, configurationRequired, className}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;


    setTools([]);
    if (toolType !== "") {
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
  }, [toolType]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTools(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getToolsListV2(getAccessToken, cancelSource, toolType);
    const tools = response?.data;

    if (Array.isArray(tools)) {
      if (configurationRequired) {
        const filteredTools = tools?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0; });
        setTools(filteredTools);
      }
      else {
        setTools(tools);
      }
    }
  };

  const getDetailViewToolUrl = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (`/inventory/tools/details/${dataObject?.getData(fieldName)}`);
    }
  };

  const getErrorMessage = () => {
    if (!isLoading && (!Array.isArray(tools) || tools.length === 0) && toolFriendlyName && toolType) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No {configurationRequired ? "configured " : ""}tools have been registered for <span className="upper-case-first">{toolFriendlyName}</span>.
          Please go to
          <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
          proceed.
        </div>
      );
    }
  };

  if (visible === false) {
    return null;
  }

  return (
    <>
      <SelectInputBase
        className={className}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={tools}
        busy={isLoading}
        valueField="_id"
        textField="name"
        placeholderText={placeholderText}
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading}
        detailViewLink={getDetailViewToolUrl()}
        linkTooltipText={`View Or Edit this Tool's Registry settings`}
      />
      {getErrorMessage()}
    </>
  );
}

PipelineToolInputBase.propTypes = {
  toolType: PropTypes.string,
  toolFriendlyName: PropTypes.string,
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  configurationRequired: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  className: PropTypes.string,
};

export default PipelineToolInputBase;