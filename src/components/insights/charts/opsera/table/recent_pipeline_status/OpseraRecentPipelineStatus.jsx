import React, {useEffect, useContext, useState, useMemo, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "components/common/table/CustomTable";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {getTableDateTimeColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import opseraRecentPipelineStatusMetadata
  from "components/insights/charts/opsera/table/recent_pipeline_status/opsera-recent-pipeline-status-metadata";

function OpseraRecentPipelineStatus({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis}) {
  const fields = opseraRecentPipelineStatusMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "run_count"}), "cell-center no-wrap-inline"),
      getTableTextColumn(fields.find(field => { return field.id === "pipeline_name"})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "timestamp"})),
      getTableTextColumn(fields.find(field => { return field.id === "duration"})),
      {
        Header: "Result",
        accessor: "status",
        Cell: (props) => {
          return props.value ? (
            props.value === "failure" || props.value === "failed" ? (
              <>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div>
                    <FontAwesomeIcon icon={faTimesCircle} className="cell-icon red" />
                  </div>
                  <div className="ml-1">{props.value}</div>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} className="cell-icon green" />
                  </div>
                  <div className="ml-1">{props.value}</div>
                </div>
              </>
            )
          ) : (
            "unknown"
          );
        },
      },
    ],
    []
  );

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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "opseraPipelineInfo", kpiConfiguration);
      let dataObject = response?.data?.data[0]?.opseraPipelineInfo?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={<CustomTable columns={columns} data={metrics} noDataMessage={noDataMessage}/>}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
    </div>
  );
}

OpseraRecentPipelineStatus.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default OpseraRecentPipelineStatus;
