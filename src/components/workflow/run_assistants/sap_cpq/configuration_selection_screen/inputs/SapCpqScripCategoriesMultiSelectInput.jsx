import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { sapCpqRunParametersActions } from "../../sapCpqRunParameters.actions";

function SapCpqScripCategoriesMultiSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  setDataFunction,
  className,
  clearDataFunction,
  showLabel,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

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
      await getCategories(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load Categories.");
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getCategories = async (cancelSource = cancelTokenSource) => {
    const response = await sapCpqRunParametersActions.getScriptCategories(
      getAccessToken,
      cancelSource,
    );

    let categories = response?.data?.data;

    if (
      isMounted?.current === true &&
      Array.isArray(categories) &&
      categories.length > 0
    ) {
      setCategories(categories);
    }
  };

  const getPlaceholderText = () => {
    if (errorMessage) {
      return errorMessage;
    }

    return "Select Categories";
  };

  if (field == null) {
    return null;
  }
  return (
    <MultiSelectInputBase
      className={className}
      fieldName={fieldName}
      disabled={disabled || isLoading}
      setDataFunction={setDataFunction}
      setDataObject={setDataObject}
      clearDataFunction={clearDataFunction}
      textField={"name"}
      valueField={"value"}
      value={[...dataObject?.getArrayData(fieldName)]}
      busy={isLoading}
      dataObject={dataObject}
      showLabel={showLabel}
      placeholderText={getPlaceholderText()}
      selectOptions={categories}
    />
  );
}

SapCpqScripCategoriesMultiSelectInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default SapCpqScripCategoriesMultiSelectInput;
