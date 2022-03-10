import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import IconBase from "components/common/icons/IconBase";

function ArgoProjectSelectInput(
  {
    argoToolId,
    visible,
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    className,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
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
    setError(undefined);

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
      await loadProjects(cancelSource, argoToolId);
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

  const loadProjects = async (cancelSource = cancelTokenSource, argoToolId) => {
    const response = await argoActions.getArgoProjectsV2(getAccessToken, cancelSource, argoToolId);
    const projects = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(projects)) {
      setProjects(projects);
    }
  };

  const getNoProjectsMessage = () => {
    if (!isLoading && (projects == null || projects.length === 0 && argoToolId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
          No configured Argo Projects have been registered for this tool.
        </div>
      );
    }
  };

  if (visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        selectOptions={projects}
        error={error}
        busy={isLoading}
        valueField={"name"}
        textField={"name"}
        disabled={disabled || isLoading || isMongoDbId(argoToolId) !== true}
      />
      {getNoProjectsMessage()}
    </div>
  );
}

ArgoProjectSelectInput.propTypes = {
  argoToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

export default ArgoProjectSelectInput;