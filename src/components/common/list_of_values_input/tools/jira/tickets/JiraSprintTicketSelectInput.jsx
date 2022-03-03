import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";

function JiraSprintTicketSelectInput(
  {
    fieldName,
    jiraToolId,
    jiraSprintId,
    visible,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setTickets([]);
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraSprintId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          setError(error);
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jiraToolId, jiraSprintId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTickets(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTickets = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraSprintTicketsV2(
      getAccessToken,
      cancelSource,
      jiraToolId,
      jiraSprintId,
    );
    const jiraTickets = response?.data?.message;

    if (isMounted?.current === true && Array.isArray(jiraTickets)) {
      setTickets(jiraTickets);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={tickets}
      busy={isLoading}
      valueField={"ticket"}
      textField={"ticket"}
      disabled={disabled}
      visible={visible}
      error={error}
    />
  );
}

JiraSprintTicketSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  jiraToolId: PropTypes.string,
  jiraSprintId: PropTypes.string
};

export default JiraSprintTicketSelectInput;