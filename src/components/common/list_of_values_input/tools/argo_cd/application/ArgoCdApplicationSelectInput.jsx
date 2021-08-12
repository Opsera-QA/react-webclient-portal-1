import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTools} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import ArgoCdApplicationInfoOverlay, {getArgoCdApplicationInfoOverlay} from "components/common/list_of_values_input/tools/argo_cd/application/ArgoCdApplicationInfoOverlay";

function ArgoCdApplicationSelectInput({className, fieldName, model, setModel, disabled, argoToolId, setDataFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoApplications, setArgoApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");

    if (argoToolId != null && argoToolId !== "") {
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
        setErrorMessage(`
          There was an error pulling Argo Applications. Please check browser logs for more details.
        `);
        console.error(error);
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

      if (argoApplications.length === 0) {
        const errorMessage = "No Argo Applications Found! Please validate credentials and configured applications.";
        toastContext.showErrorDialog(errorMessage);
      }
    } else {
      const errorMessage =
        "Error fetching Argo Applications! Please validate credentials and configured repositories.";
      setErrorMessage(errorMessage);
    }
  };

  const getErrorMessage = () => {
    if (!isLoading && argoApplications?.length === 0 && argoToolId) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
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

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        placeholderText={"Select Argo Application"}
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
        errorMessage={errorMessage}
        linkTooltipText={`Load Tool Registry`}
        linkIcon={faTools}
        detailViewLink={`/inventory/tools/details/${argoToolId}/applications`}
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