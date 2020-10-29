import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import pipelineActions from "../../../../workflow/pipeline-actions";
import {AuthContext} from "../../../../../contexts/AuthContext";
import DtoSelectInput from "../../../input/dto_input/dto-select-input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function PipelineToolInput({ toolType, toolFriendlyName, placeholderText, visible, fieldName, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

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
    setTools(response);
  };

  if (!visible) {
    return <></>;
  }

  if (!isLoading && (tools == null || tools.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No tools have been registered for <span className="upper-case-first">{toolFriendlyName}</span>.
        Please go to
        <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
        proceed.
      </div>
    )
  }

  return (
    <DtoSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={tools}
      busy={isLoading}
      valueField="id"
      textField="name"
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
   />
  );
}

PipelineToolInput.propTypes = {
  toolType: PropTypes.string,
  toolFriendlyName: PropTypes.string,
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

PipelineToolInput.defaultProps = {
  visible: true,
}

export default PipelineToolInput;