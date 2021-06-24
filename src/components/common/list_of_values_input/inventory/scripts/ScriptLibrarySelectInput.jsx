import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faFileCode} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import ScriptOverlay from "components/common/list_of_values_input/inventory/scripts/ScriptOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

function ScriptLibrarySelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, className, fields, setDataFunction}) {
  let toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [scripts, setScripts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      await loadScripts(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage("Could Not Load Scripts");
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadScripts = async (cancelSource = cancelTokenSource) => {
    const response = await scriptsActions.getScripts(getAccessToken, cancelSource, undefined, fields);
    const scriptList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(scriptList)) {
      setScripts(scriptList);
    }
  };

  const toggleScriptOverlay = () => {
    toastContext.showOverlayPanel(<ScriptOverlay scriptId={dataObject.getData(fieldName)} />);
  };

  // TODO: Add script overlay toggle when finished
  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <div className="text-muted d-flex pointer" onClick={() => {toggleScriptOverlay();}}>
            <span><FontAwesomeIcon icon={faFileCode} className="pr-1" />View this Script</span>
        </div>
      );
    }
  };

  if (!isLoading && (scripts == null || scripts.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No scripts have been registered.
        Please go to
        <Link to="/inventory/scripts"> Tool Registry</Link> and add an entry for this repository in order to
        proceed.
      </div>
    );
  }

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={scripts}
        busy={isLoading}
        errorMessage={errorMessage}
        valueField={valueField}
        textField={textField}
        className={className}
        placeholderText={"Select a Script"}
        disabled={disabled || isLoading}
      />
      {getInfoText()}
    </>
  );
}

ScriptLibrarySelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  className: PropTypes.string,
  fields: PropTypes.array,
  setDataFunction: PropTypes.func
};

ScriptLibrarySelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fields: ["name", "_id"]
};

export default ScriptLibrarySelectInput;