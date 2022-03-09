import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {faExclamationCircle, faTools} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import ArgoCdApplicationInfoOverlay from "components/common/list_of_values_input/tools/argo_cd/application/ArgoCdApplicationInfoOverlay";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import IconBase from "components/common/icons/IconBase";

function ArgoCdApplicationSelectInput({className, fieldName, model, setModel, disabled, argoToolId, setDataFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const [argoApplications, setArgoApplications] = useState([]);
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
    setArgoApplications([]);
    setError(undefined);

    if (isMongoDbId(argoToolId) === true) {
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
  }, [argoToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadArgoApplications(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadArgoApplications = async (cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoApplicationsV2(getAccessToken, cancelSource, argoToolId);
    const argoApplications = response?.data?.data;

    if (Array.isArray(argoApplications)) {
      setArgoApplications(argoApplications);
    }
  };

  const getErrorMessage = () => {
    if (!isLoading && argoApplications?.length === 0 && isMongoDbId(argoToolId) === true) {
      return (
        <div className="form-text text-muted p-2">
          <IconBase icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No Argo Applications have been found in the Argo instance.
          Please go to this Tool&apos;s
          <Link to={`/inventory/tools/${argoToolId}/details/applications`}>Applications Area</Link> and add an Argo Application in order to
          proceed.
        </div>
      );
    }
  };

  // TODO: This isn't ready without changes to the microservice.
  const getInfoOverlay = () => {
    return (
      <ArgoCdApplicationInfoOverlay
        argoApplications={argoApplications}
        selectedArgoApplicationName={model?.getData(fieldName)}
      />
    );
  };

  const getArgoDetailViewLink = () => {
    if (isMongoDbId(argoToolId) === true) {
      return (`/inventory/tools/details/${argoToolId}/applications`);
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        disabled={disabled || argoToolId == null || argoToolId === ""}
        textField={"name"}
        valueField={"name"}
        busy={isLoading}
        // infoOverlay={getInfoOverlay()}
        className={className}
        selectOptions={argoApplications}
        linkTooltipText={`View Or Create New Argo Applications`}
        linkIcon={faTools}
        detailViewLink={getArgoDetailViewLink()}
        error={error}
        singularTopic={"Argo Application"}
        pluralTopic={"Argo Applications"}
      />
      {getErrorMessage()}
    </>
  );
}

ArgoCdApplicationSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  argoToolId: PropTypes.string,
  setDataFunction: PropTypes.func
};

ArgoCdApplicationSelectInput.defaultProps = {
  fieldName: "applicationName",
};

export default ArgoCdApplicationSelectInput;