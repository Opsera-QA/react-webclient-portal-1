import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {argoCdActions} from "components/common/list_of_values_input/tools/argo_cd/argocd.actions";

function ArgoRepositorySelectInput(
  {
    fieldName,
    model,
    setModel,
    argoToolId,
    visible,
    setDataFunction,
    clearDataFunction,
    disabled,
    className,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
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

    if (isMongoDbId(argoToolId) === true) {
      loadData(argoToolId, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoToolId]);

  const loadData = async (argoToolId, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await loadRepositories(argoToolId, cancelSource);
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

  const loadRepositories = async (argoToolId, cancelSource = cancelTokenSource) => {
    const response = await argoCdActions.getArgoRepositoriesV2(getAccessToken, cancelSource, argoToolId);
    const repositories = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(repositories)) {
      setRepositories(repositories);
    }
  };

  const getNoRepositoriesMessage = () => {
    if (!isLoading && (repositories == null || repositories.length === 0 && argoToolId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          No configured Argo repositories available for this tool.
        </div>
      );
    }
  };

  const formatText = (item) => {
    const name = item?.username !== "" ? item?.username : "No Repository Name";
    const serverUrl = item?.repo;

    return (`${name}: ${serverUrl}`);
  };

  return (
    <div className={className}>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        selectOptions={repositories}
        busy={isLoading}
        valueField={"repo"}
        textField={formatText}
        clearDataFunction={clearDataFunction}
        disabled={disabled}
        error={error}
        visible={visible}
      />
      {getNoRepositoriesMessage()}
    </div>
  );
}

ArgoRepositorySelectInput.propTypes = {
  argoToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
  clearDataFunction: PropTypes.func,
};

export default ArgoRepositorySelectInput;