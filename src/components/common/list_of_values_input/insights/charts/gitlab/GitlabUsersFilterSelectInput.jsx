import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import gitlabAction from "../../../../../insights/charts/gitlab/gitlab.action";

function GitlabUsersFilterSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  model,
  setModel,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    setUsers([]);
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        setError(error);
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadUsers(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadUsers = async (cancelSource = cancelTokenSource) => {
    const response = await gitlabAction.getGitlabUsers(
      getAccessToken,
      cancelSource,
    );
    if (response.data != null) {
      setUsers(response?.data?.data);
    }
  };
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={users}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      placeholderText={placeholderText}
    />
  );
}

GitlabUsersFilterSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  visible: PropTypes.bool,
  project: PropTypes.array,
};

GitlabUsersFilterSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default GitlabUsersFilterSelectInput;
