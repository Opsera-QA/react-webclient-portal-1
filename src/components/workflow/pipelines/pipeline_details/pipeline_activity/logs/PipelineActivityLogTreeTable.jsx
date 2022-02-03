import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import PipelineActivityLogTree
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTree";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import InlinePipelineStatusFilter from "components/common/filters/pipelines/status/InlinePipelineStatusFilter";
import PipelineActivityLogTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTable";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import axios from "axios";
import pipelineActivityLogsActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineActivityLogs.actions";
import pipelineLogHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipelineLog.helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import CustomTable from "components/common/table/CustomTable";

const refreshInterval = 15000;

// TODO: This is an attempt to move the logic into the table. Not going to finish it now, will finish it as separate enhancement
function PipelineActivityLogTreeTable(
  {
    pipeline,
    pipelineStatus,
    getPipeline,
    pipelineId,
    pipelineRunCount,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [pipelineActivityFilterModel, setPipelineActivityFilterModel] = useState(new PipelineFilterModel());
  const [pipelineActivityMetadata, setPipelineActivityMetadata] = useState(undefined);
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pipelineTree = useRef([]);
  const [refreshTimer, setRefreshTimer] = useState(null);
  let internalRefreshCount = 1;
  const [currentRunNumber, setCurrentRunNumber] = useState(pipelineRunCount);
  const [currentStepName, setCurrentStepName] = useState(undefined);

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    //console.log("Effect  1");
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(pipelineActivityFilterModel, cancelTokenSource).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;

      if (refreshTimer) {
        console.log("clearing refresh timer");
        clearTimeout(refreshTimer);
      }
    };
  }, []);

  const loadData = async (newFilterModel = pipelineActivityFilterModel, cancelSource = cancelTokenSource) => {
    if (isLoading || typeof pipelineRunCount !== "number" || pipelineRunCount <= 0) {
      return;
    }

    try {
      setIsLoading(true);
      setActivityData([]);
      const newPipelineTree = pipelineLogHelpers.constructTopLevelTreeBasedOnRunCount(pipelineRunCount);
      pipelineTree.current = [...newPipelineTree];
      await getSingleRunLogs(newFilterModel, cancelSource);
    } catch (error) {

      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {

      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };


  useEffect(() => {
    if (pipeline) {
      pullLogs(pipelineActivityFilterModel).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });

      evaluatePipelineStatus(pipeline);
    }
  }, [pipeline]);

  const evaluatePipelineStatus = (pipeline) => {
    console.log("evaluating pipeline status function");
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }

    const pipelineStatus = pipeline?.workflow?.last_step?.status;

    if (!pipelineStatus || pipelineStatus === "stopped") {
      console.log("Pipeline stopped, no need to schedule refresh. Status: ", pipelineStatus);
      return;
    }

    if (refreshTimer) {
      clearTimeout(refreshTimer);
    }

    console.log(`Scheduling status check followup for Pipeline: ${pipeline._id}, counter: ${internalRefreshCount}, interval: ${refreshInterval} `);
    const newRefreshTimer = setTimeout(async function() {
      internalRefreshCount++;
      console.log("running pipeline refresh interval");
      await getPipeline();
    }, refreshInterval);

    setRefreshTimer(newRefreshTimer);
  };

  useEffect(() => {
    setActivityData([]);

    if (currentRunNumber) {
      pullLogs().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentRunNumber]);

  useEffect(() => {
    const newTree = pipelineLogHelpers.addRunNumberToPipelineTree(pipelineTree?.current, pipelineRunCount);

    if (newTree) {
      pipelineTree.current = [...newTree];
    }
  }, [pipelineRunCount]);

  const pullLogs = async (newFilterModel = pipelineActivityFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      console.log("pulling pipeline logs");
      if (currentRunNumber === "latest") {
        await getLatestActivityLogs(newFilterModel, cancelSource);
      } else if (currentRunNumber === "secondary") {
        await getSecondaryActivityLogs(newFilterModel, cancelSource);
      } else {
        await getSingleRunLogs(newFilterModel, cancelSource, pipelineTree);
      }

    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getSingleRunLogs = async (newFilterModel = pipelineActivityFilterModel, cancelSource = cancelTokenSource) => {
    const response = await pipelineActivityLogsActions.getPipelineActivityLogsV3(getAccessToken, cancelSource, pipelineId, newFilterModel, currentRunNumber);
    const pipelineActivityData = response?.data?.data;
    const activityLogCount = response?.data?.count;

    if (Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
      setPipelineActivityMetadata(response?.data?.metadata);


      newFilterModel.setData("totalCount", activityLogCount);
      newFilterModel.setData("activeFilters", newFilterModel?.getActiveFilters());
      setPipelineActivityFilterModel({...newFilterModel});

      const newTree = pipelineLogHelpers.updateSelectedRunNumberTree(pipelineTree.current, currentRunNumber, pipelineActivityData);

      if (Array.isArray(newTree) && newTree.length > 0) {
        pipelineTree.current = [...newTree];
      }
    }
  };

  const getLatestActivityLogs = async (filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    const response = await pipelineActivityLogsActions.getLatestPipelineActivityLogsV3(getAccessToken, cancelSource, pipelineId, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
    }
  };

  const getSecondaryActivityLogs = async (filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    const response = await pipelineActivityLogsActions.getSecondaryPipelineActivityLogsV3(getAccessToken, cancelSource, pipelineId, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
    }
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterModel?.getActiveFilters()?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    if (currentRunNumber === "secondary") {
      return ("There are no secondary logs.");
    }

    if (currentRunNumber === "latest") {
      return ("Pipeline activity data has not been generated yet.\n Once this pipeline begins running, it will publish details here.");
    }

    if (currentRunNumber == null) {
      return ("Please select a run to view its logs");
    }

    return (`There are no log associated with run ${currentRunNumber}`);
  };

  const getTable = () => {
    return (
      <PipelineActivityLogTable
        isLoading={isLoading}
        pipeline={pipeline}
        pipelineActivityMetadata={pipelineActivityMetadata}
        pipelineLogData={activityData}
        pipelineActivityFilterDto={pipelineActivityFilterModel}
        currentRunNumber={currentRunNumber}
        currentStepName={currentStepName}
      />
    );
  };

  const getTree = () => {
    return (
      <PipelineActivityLogTree
        pipelineLogTree={pipelineTree?.current}
        setCurrentRunNumber={setCurrentRunNumber}
        setCurrentStepName={setCurrentStepName}
      />
    );
  };

  const getPipelineActivityTable = () => {
    if (pipelineRunCount === 0) {
      return (
        <CustomTable
          isLoading={isLoading}
          data={[]}
          noDataMessage={getNoDataMessage()}
        />
      );
    }

    return (
      <TreeAndTableBase
        data={activityData}
        isLoading={isLoading}
        noDataMessage={getNoDataMessage()}
        tableComponent={getTable()}
        loadData={loadData}
        treeComponent={getTree()}
        treeColumnSize={3}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlinePipelineStatusFilter
        loadData={loadData}
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
        className={"mr-2"}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <PipelineStatusFilter
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
      />
    );
  };

  return (
    <div className={"mr-2"}>
      <FilterContainer
        showBorder={false}
        loadData={loadData}
        filterDto={pipelineActivityFilterModel}
        setFilterDto={setPipelineActivityFilterModel}
        isLoading={isLoading}
        title={"Pipeline Logs"}
        inlineFilters={getInlineFilters()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faClipboardList}
        body={getPipelineActivityTable()}
        supportSearch={true}
        exportButton={
          <ExportPipelineActivityLogButton
            className={"ml-2"}
            isLoading={isLoading}
            activityLogData={activityData}
          />
        }
      />
    </div>
  );
}

PipelineActivityLogTreeTable.propTypes = {
  pipeline: PropTypes.object,
  getPipeline: PropTypes.func,
  pipelineId: PropTypes.string,
  pipelineStatus: PropTypes.string,
  pipelineRunCount: PropTypes.number,
};

export default PipelineActivityLogTreeTable;