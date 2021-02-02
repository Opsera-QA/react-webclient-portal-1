import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTools} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";

function PipelineToolInput({ toolType, toolFriendlyName, placeholderText, visible, fieldName, dataObject, setDataObject, setDataFunction, disabled, configurationRequired}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (toolType !== "") {
      loadData();
    }
  }, [toolType]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadTools();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async () => {
    const response = await pipelineActions.getToolsList(toolType, getAccessToken);

    if (response && Array.isArray(response)) {
      if (configurationRequired) {
        const filteredTools = response?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0 });
        setTools(filteredTools)
      }
      else {
        setTools(response);
      }
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}>
          <span><FontAwesomeIcon icon={faTools} className="pr-1" />View Or Edit this Tool's Registry settings</span>
        </Link>
      );
    }

    return <span>Select a tool to get started.</span>
  };

  if (!visible) {
    return <></>;
  }

  if (!isLoading && (tools == null || tools.length === 0) && toolFriendlyName) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No {configurationRequired ? "configured " : ""}tools have been registered for <span className="upper-case-first">{toolFriendlyName}</span>.
        Please go to
        <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
        proceed.
      </div>
    )
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={tools}
        busy={isLoading}
        valueField="id"
        textField="name"
        placeholderText={placeholderText}
        disabled={disabled || isLoading}
      />
      <small className="text-muted ml-3">
        {getInfoText()}
      </small>
    </div>
  );
}

PipelineToolInput.propTypes = {
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
};

PipelineToolInput.defaultProps = {
  visible: true,
}

export default PipelineToolInput;