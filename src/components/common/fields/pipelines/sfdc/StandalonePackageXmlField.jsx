import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {parseError} from "components/common/helpers/error-helpers";
import StandaloneXmlField from "components/common/fields/code/StandaloneXmlField";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

function StandalonePackageXmlField({pipelineWizardModel, runNumber, className, setXmlFunction}) {
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
    if (runNumber != null && runNumber > 0) {
      loadData(source, runNumber).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [runNumber]);

  const loadData = async (cancelSource = cancelTokenSource,  newRunNumber) => {
    try {
      setIsLoading(true);
      await pullXmlFromRun(cancelSource, newRunNumber);
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

  const pullXmlFromRun = async (cancelSource = cancelTokenSource, newRunNumber) => {
    const pipelineId = pipelineWizardModel?.getData("pipelineId");
    const stepId = pipelineWizardModel?.getData("stepId");

    const packageXml = await sfdcPipelineActions.getPackageXmlFromRun(getAccessToken, cancelSource, pipelineId, stepId, newRunNumber);

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
  pipelineWizardModel: PropTypes.object,
  className: PropTypes.string,
  setXmlFunction: PropTypes.func,
};

export default StandalonePackageXmlField;