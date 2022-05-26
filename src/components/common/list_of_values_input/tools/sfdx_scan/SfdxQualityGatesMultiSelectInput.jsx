import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import toolsActions from "../../../../inventory/tools/tools-actions";
import MultiSelectInputBase from "../../../inputs/multi_select/MultiSelectInputBase";

function SfdxQualityGatesMultiSelectInput({
  fieldName,
  model,
  setModel,
  toolId,
  disabled,
  setDataFunction,
  clearDataFunction,
  valueField,
  textField,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [qualityGates, setQualityGates] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState(
    "Select Quality Gate",
  );
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setErrorMessage("");
    setQualityGates([]);

    if (isMongoDbId(toolId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadQualityGates(cancelSource);
    } catch (error) {
      setPlaceholderText("No Quality gates Available!");
      setErrorMessage("There was an error pulling Quality Gates");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadQualityGates = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(
      getAccessToken,
      cancelSource,
      toolId,
    );
    const qualityGates = response?.data?.data?.actions;

    if (isMounted?.current === true && Array.isArray(qualityGates)) {
      setPlaceholderText("Select Quality Gates");
      setQualityGates([...qualityGates]);

      const existingRepository = model?.getData(fieldName);

      if (hasStringValue(existingRepository) === true) {
        const existingExists = qualityGates.find(
          (qualityGate) => qualityGate[valueField] === existingRepository,
        );

        if (existingExists == null) {
          setErrorMessage(
            "Previously saved Quality Gate is no longer available. It may have been deleted. Please select another Quality Gate from the list.",
          );
        }
      }
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={qualityGates}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}

SfdxQualityGatesMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

SfdxQualityGatesMultiSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default SfdxQualityGatesMultiSelectInput;
