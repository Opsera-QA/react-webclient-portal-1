import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import axios from "axios";
import LoadingIcon from "components/common/icons/LoadingIcon";
import {jiraActions} from "components/common/list_of_values_input/tools/jira/jira.actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";

function JiraBoardNameField(
  {
    model,
    jiraToolId,
    fieldName,
    jiraProjectKey,
    jiraBoardId,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const {getAccessToken} = useContext(AuthContext);
  const [boardName, setBoardName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    setBoardName("");
    setError(undefined);

    if (isMongoDbId(jiraToolId) === true && hasStringValue(jiraProjectKey) === true && hasStringValue(jiraBoardId)) {
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
  }, [jiraToolId, jiraProjectKey, jiraBoardId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadBoards(cancelSource);
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

  const loadBoards = async (cancelSource = cancelTokenSource) => {
    const response = await jiraActions.getJiraBoardsWithProjectKeyV2(
      getAccessToken,
      cancelSource,
      jiraToolId,
      jiraProjectKey,
    );
    const jiraBoards = response?.data?.data;

    if (Array.isArray(jiraBoards)) {
      const jiraBoard = jiraBoards.find((board) => board.id === jiraBoardId);
      const boardName = jiraBoard?.name;

      if (isMounted?.current === true && hasStringValue(boardName) === true) {
        setBoardName(boardName);
      }
    }
  };

  const getBoardName = () => {
    if (jiraBoardId == null) {
      return "";
    }

    if (isLoading) {
      return <span><LoadingIcon className={"mr-1"}/>{model?.getData(fieldName)}</span>;
    }

    if (boardName) {
      return boardName;
    }

    return `Board name could not be found with Key: [${model?.getData(fieldName)}]`;
  };

  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{getBoardName()}</span>
    </FieldContainer>
  );
}

JiraBoardNameField.propTypes = {
  model: PropTypes.object,
  jiraToolId: PropTypes.string,
  jiraProjectKey: PropTypes.string,
  fieldName: PropTypes.string,
  jiraBoardId: PropTypes.string,
};

export default JiraBoardNameField;