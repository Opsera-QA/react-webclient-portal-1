import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import snykStepActions from "../snyk-step-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
  const [error, setError] = useState("");
  const isMounted = useRef(false);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    if (hasStringValue(language) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [language]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setSnykVersionList([]);
      await loadSnykLanguageVersions(cancelSource);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSnykLanguageVersions = async (cancelSource = cancelTokenSource) => {
    const response = await snykStepActions.getLanguageVersions(
      getAccessToken,
      cancelSource,
      language,
    );
    const versions = DataParsingHelper.parseArray(response?.data, []);
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
      textField={"name"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      singularTopic={"Language Version"}
      pluralTopic={"Language Versions"}
      error={error}
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
