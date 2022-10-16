import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import LiquibaseStepActions from "../liquibase-step-actions";

function LiquibaseTagSelectInput({ model, setModel, disabled, toolConfigId, database, schema }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select Liquibase Tag");
  const [environmentsList, setEnvironmentsList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");
    let newModel = {...model};
    setModel({...newModel});

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolConfigId, database, schema]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setEnvironmentsList([]);
      await fetchLiquibaseTags(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setPlaceholderText("Could not pull Liquibase Tags");
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLiquibaseTags = async (cancelSource = cancelTokenSource, acrStep, azureTool) => {

    const response = await LiquibaseStepActions.getTags(
      getAccessToken,
      cancelSource,
      toolConfigId,
      database, 
      schema
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {      
      setEnvironmentsList(result);
      setPlaceholderText("Select Liquibase Tag");
    }

    if (result?.length === 0) {
      setPlaceholderText("No Liquibase Tags found");      
    }
  };

  return (
    <SelectInputBase
      fieldName={"tag"}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={placeholderText}
      selectOptions={environmentsList}
      textField={"name"}
      valueField={"name"}
      busy={isLoading}
      disabled={disabled}
      error={errorMessage}
    />
  );
}

LiquibaseTagSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolConfigId: PropTypes.string,
  database: PropTypes.string,
  schema: PropTypes.string,
};

export default LiquibaseTagSelectInput;
