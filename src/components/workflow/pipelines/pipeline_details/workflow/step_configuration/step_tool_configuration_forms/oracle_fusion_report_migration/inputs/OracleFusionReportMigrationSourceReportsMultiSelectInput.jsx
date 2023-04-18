import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import OracleFusionReportMigrationStepActions from "../oracleFusion-reportMigration-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";

function OracleFusionReportMigrationSourceReportsMultiSelectInput({ model, setModel, disabled, sourceToolId, sourceFolder }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Source Reports");
  const [sourceReports, setSourceReports] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setError("");

    if (hasStringValue(sourceToolId) === true) {
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
  }, [sourceToolId, sourceFolder]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setSourceReports([]);
      await fetchSourceInstanceReports(cancelSource);
    } catch (error) {      
      if (isMounted?.current === true) {
        setError(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSourceInstanceReports = async (cancelSource = cancelTokenSource) => {

    const response = await OracleFusionReportMigrationStepActions.getSourceInstanceReports(
      getAccessToken,
      cancelSource,
      sourceToolId,
      sourceFolder,
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {      
      setSourceReports(result);
      setPlaceholderText("Select Source Instance Reports");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Source Instance Reports found");
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("sourceInstanceReports", selectedOption);
    setModel({...newModel});
  };

  return (
    <MultiSelectInputBase
      fieldName={"sourceInstanceReports"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={sourceReports}
      textField={"displayName"}
      valueField={"fileName"}
      busy={isLoading}
      disabled={disabled || !sourceToolId}
      setDataFunction={setDataFunction}
      error={error}
    />
  );
}

OracleFusionReportMigrationSourceReportsMultiSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  sourceToolId: PropTypes.string,
  sourceFolder: PropTypes.string,
};

export default OracleFusionReportMigrationSourceReportsMultiSelectInput;
