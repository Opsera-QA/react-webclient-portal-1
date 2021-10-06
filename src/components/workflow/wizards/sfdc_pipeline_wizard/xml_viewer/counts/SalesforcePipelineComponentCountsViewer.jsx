import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import SalesforcePipelineWizardComponentCountTable
  from "components/workflow/wizards/sfdc_pipeline_wizard/xml_viewer/counts/SalesforcePipelineWizardComponentCountTable";

const SalesforcePipelineComponentCountsViewer = ({pipelineWizardModel, setPipelineWizardModel}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [componentCounts, setComponentCounts] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadComponentCounts(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error Pulling Component Counts");
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadComponentCounts = async (cancelSource = cancelTokenSource) => {
    const response = await sfdcPipelineActions.getComponentNameCountListV2(getAccessToken, cancelSource, pipelineWizardModel);

    const componentNameCountArray = response?.data?.data;

    if (!Array.isArray(componentNameCountArray)) {
      toastContext.showInlineErrorMessage("Error Pulling Component Counts");
    }

    setComponentCounts(componentNameCountArray);
    pipelineWizardModel.setData("componentNameCounts", componentNameCountArray);
    setPipelineWizardModel({...pipelineWizardModel});
  };

  return (
    <SalesforcePipelineWizardComponentCountTable
      loadData={loadData}
      isLoading={isLoading}
      componentCounts={componentCounts}
    />
  );
};

SalesforcePipelineComponentCountsViewer.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default SalesforcePipelineComponentCountsViewer;