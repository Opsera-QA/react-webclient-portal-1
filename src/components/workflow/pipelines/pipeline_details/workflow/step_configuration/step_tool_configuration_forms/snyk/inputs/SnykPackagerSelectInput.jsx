import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import snykStepActions from "../snyk-step-actions";

function SnykPackagerSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  setDataFunction,
  clearDataFunction,
  version,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [snykPackagerList, setSnykPackagerList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Packager or Build Tool");
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setSnykPackagerList([]);

    loadData(source).catch((error) => {
      throw error;
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [version]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSnykPackagers(getAccessToken, cancelSource);
    } catch (error) {
      setPlaceholderText("Packager or build tool not Available");
      setErrorMessage("There was an error pulling available build tools");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSnykPackagers = async (cancelSource = cancelTokenSource) => {
    const response = await snykStepActions.getPackagers(
      getAccessToken,
      cancelSource,
      model.getData("languageLevelId")
    );
    const packagers = response?.data;
    setSnykPackagerList(packagers);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykPackagerList}
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

SnykPackagerSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  version: PropTypes.any,
};

export default SnykPackagerSelectInput;
