import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import snykStepActions from "../snyk-step-actions";

function SnykProductsMultiSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  setDataFunction,
  clearDataFunction,
  toolConfigId,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [snykProductsList, setSnykProductsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select Snyk Products");
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setSnykProductsList([]);

    loadData(source).catch((error) => {
      throw error;
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolConfigId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSnykProducts(getAccessToken, cancelSource);
    } catch (error) {
      setPlaceholderText("No Snyk Products Available");
      setErrorMessage("There was an error pulling Snyk products");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSnykProducts = async (cancelSource = cancelTokenSource) => {
    const response = await snykStepActions.getProducts(
      getAccessToken,
      cancelSource,
    );
    const snykProducts = response?.data;
    setSnykProductsList(snykProducts);
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykProductsList}
      busy={isLoading}
      valueField={"name"}
      textField={"name"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      errorMessage={errorMessage}
      placeholder={placeholder}
    />
  );
}

SnykProductsMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  toolConfigId: PropTypes.any,
};

export default SnykProductsMultiSelectInput;
