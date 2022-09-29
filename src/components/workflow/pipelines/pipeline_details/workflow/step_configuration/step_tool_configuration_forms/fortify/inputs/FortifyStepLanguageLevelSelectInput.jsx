import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import fortifyStepActions from "../fortify-step-actions";

function FortifyStepLanguageLevelSelectInput({ model, setModel, disabled, technology }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Language Level");
  const [languageLevelList, setLanguageLevelList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setErrorMessage("");

    if (technology) {
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
  }, [technology]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setLanguageLevelList([]);
      await fetchLanguageLevels(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Language Levels");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLanguageLevels = async (cancelSource = cancelTokenSource) => {

    const response = await fortifyStepActions.getLanguageLevel(
      getAccessToken,
      cancelSource,
      technology
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setLanguageLevelList(result);
      setPlaceholderText("Select Language Level");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Language Levels found");
    }
  };

  return (
    <SelectInputBase
      fieldName={"languageLevelId"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={languageLevelList}  
      textField={"name"}
      valueField={"name"}    
      busy={isLoading}
      disabled={disabled}
    />
  );
}

FortifyStepLanguageLevelSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  technology: PropTypes.string,
};

export default FortifyStepLanguageLevelSelectInput;
