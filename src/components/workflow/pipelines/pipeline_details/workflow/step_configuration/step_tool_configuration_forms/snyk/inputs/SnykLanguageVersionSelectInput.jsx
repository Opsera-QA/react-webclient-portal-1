import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import snykStepActions from "../snyk-step-actions";

function SnykLanguageVersionSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  setDataFunction,
  clearDataFunction,
  language,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [snykVersionList, setSnykVersionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Language Version");
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setSnykVersionList([]);

    language ? loadData(source).catch((error) => {
      throw error;
    }) : null;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [language]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSnykLanguageVersions(getAccessToken, cancelSource);
    } catch (error) {
      setPlaceholderText("Language Selection not Available");
      setErrorMessage("There was an error pulling Snyk language versions");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSnykLanguageVersions = async (cancelSource = cancelTokenSource) => {
    const response = await snykStepActions.getLanguageVersions(
      getAccessToken,
      cancelSource,
      model.getData("languageLevelId")
    );
    console.log(response);
    const versions = response?.data;
    setSnykVersionList(versions);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykVersionList}
      busy={isLoading}
      valueField={"name"}
      textField={""}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      placeholder={placeholder}
      errorMessage={errorMessage}
    />
  );
}

SnykLanguageVersionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  language: PropTypes.any,
};

export default SnykLanguageVersionSelectInput;
