import React, { useState, useEffect, useContext, useRef } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import PipelineDataMappingsTable from "components/settings/data_mapping/pipelines/PipelineDataMappingsTable";
import useAnalyticsPipelineDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/pipelines/useAnalyticsPipelineDataMappingActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function PipelineDataMappingManagement() {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineDataMappings, setPipelineDataMappings] = useState([]);
  const isMounted = useRef(false);
  const analyticsPipelineDataMappingActions = useAnalyticsPipelineDataMappingActions();

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getPipelineDataMappings();
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

  const getPipelineDataMappings = async () => {
    const response = await analyticsPipelineDataMappingActions.getPipelineDataMappings();
    const mappings = DataParsingHelper.parseNestedArray(response, "data.data");

    if (isMounted?.current === true && Array.isArray(mappings)) {
      setPipelineDataMappings(mappings);
    }
  };

  return (
    <div className={"mt-2"}>
      <PipelineDataMappingsTable
        loadData={loadData}
        isLoading={isLoading}
        pipelineDataMappings={pipelineDataMappings}
        isMounted={isMounted}
      />
    </div>
  );
}

export default PipelineDataMappingManagement;
