import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import blueprintsActions from "components/blueprint/blueprints-actions";
import {AuthContext} from "contexts/AuthContext";
import {parseError} from "components/common/helpers/error-helpers";
import StandaloneXmlField from "components/common/fields/code/StandaloneXmlField";

function StandalonePackageXmlField({runNumber, pipelineId, className, setXmlFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [xml, setXml] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setXml("");
    setErrorMessage("");
    if (runNumber > 0 && pipelineId !== "" && pipelineId != null) {
      loadData(pipelineId, runNumber).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [runNumber, pipelineId]);

  const loadData = async (newPipelineId, newRunNumber) => {
    try {
      setIsLoading(true);
      await pullXmlFromRun(newPipelineId, newRunNumber);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setErrorMessage(`Could not pull this run's Package XML: ${parseError(error)}`);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const pullXmlFromRun = async (newPipelineId, newRunNumber) => {
    const response = await blueprintsActions.getBlueprintSearchResultsManual(getAccessToken, cancelTokenSource, newPipelineId, newRunNumber);
    const packageXml = response?.data?.reports?.xml?.xml;

    if (isMounted?.current === true) {
      if (packageXml != null && packageXml !== "") {
        setXml(packageXml);

        if (setXmlFunction) {
          setXmlFunction(packageXml);
        }
      }
      else {
        setErrorMessage(`Could not pull Package XML for Run Number [${runNumber}] of Pipeline [${pipelineId}]`);
      }
    }
  };

  return (
    <StandaloneXmlField
      isLoading={isLoading}
      className={className}
      errorMessage={errorMessage}
      title={`Pipeline Package XML`}
      xml={xml}
    />
  );
}

StandalonePackageXmlField.propTypes = {
  runNumber: PropTypes.number,
  pipelineId: PropTypes.string,
  className: PropTypes.string,
  setXmlFunction: PropTypes.func,
};

export default StandalonePackageXmlField;