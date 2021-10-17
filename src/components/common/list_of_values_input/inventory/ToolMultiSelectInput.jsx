import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTools} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import axios from "axios";

function ToolMultiSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
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
      await loadTools(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage("Could Not Load Tools");
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getToolLovsV2(getAccessToken, cancelSource);

    if (isMounted?.current === true && response?.data) {
      setTools(response?.data?.data);
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <small className="text-muted">
          <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}>
            <span><FontAwesomeIcon icon={faTools} className="pr-1" />View Or Edit this Tool's Registry settings</span>
          </Link>
        </small>
      );
    }
  };

  if (!isLoading && (tools == null || tools.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No tools have been registered.
        Please go to
        <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
        proceed.
      </div>
    );
  }

  return (
    <>
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={tools}
        busy={isLoading}
        valueField={valueField}
        errorMessage={errorMessage}
        textField={textField}
        placeholderText={"Select a tool to get started."}
        disabled={disabled || isLoading}
      />
      {getInfoText()}
    </>
  );
}

ToolMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ToolMultiSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name"
};

export default ToolMultiSelectInput;