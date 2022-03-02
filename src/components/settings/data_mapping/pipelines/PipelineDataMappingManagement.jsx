import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {pipelineDataMappingActions} from "components/settings/data_mapping/pipelines/pipelineDataMapping.actions";
import PipelineDataMappingsTable from "components/settings/data_mapping/pipelines/PipelineDataMappingsTable";

function PipelineDataMappingManagement() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineDataMappingMetadata, setPipelineDataMappingMetadata] = useState(undefined);
  const [pipelineDataMappings, setPipelineDataMappings] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
      await getPipelineDataMappings(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getPipelineDataMappings = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await pipelineDataMappingActions.getPipelineDataMappingsV2(getAccessToken, cancelSource);
      const mappings = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(mappings)) {
        setPipelineDataMappingMetadata({...response?.data?.metadata});
        setPipelineDataMappings(mappings);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  return (
    <div className={"mt-2"}>
      <PipelineDataMappingsTable
        loadData={loadData}
        isLoading={isLoading}
        pipelineDataMappings={pipelineDataMappings}
        isMounted={isMounted}
        pipelineDataMappingMetadata={pipelineDataMappingMetadata}
      />
    </div>
  );
}

export default PipelineDataMappingManagement;
