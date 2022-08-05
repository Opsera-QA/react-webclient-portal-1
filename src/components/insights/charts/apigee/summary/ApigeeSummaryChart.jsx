import React, {useState, useEffect, useContext, useRef} from "react";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import apigeeActions from "../apigee.action";
import ApigeeSummaryForTransferChart from "./ApigeeSummaryForTransferChart";
import ApigeeSummaryForDeployChart from "./ApigeeSummaryForDeployChart";

function ApigeeSummaryChart({
                              kpiConfiguration,
                              setKpiConfiguration,
                              dashboardData,
                              index,
                              setKpis,
                              showSettingsToggle}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [metrics, setMetrics] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [deployData, setDeployData] = useState([]);
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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await apigeeActions.getSummaryChartDetails(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
      );
      const metrics1 = response?.data?.data?.data;

      if (isMounted?.current === true && Array.isArray(metrics1)) {
        setMetrics(metrics1);
        if(metrics1.length > 0) {
          metrics1.forEach(item => {
            if(item.type === 'transfer') {
              setTransferData(item);
            } else if(item.type === 'deploy') {
              setDeployData(item);
            }
          });
        } else {
          setTransferData([]);
          setDeployData([]);
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getChartBody = () => {
    return (
      <>
        <div className="new-chart mb-3 mr-3 ml-3 p-0 all-github-actions-data-block">
            <ApigeeSummaryForTransferChart kpiConfiguration={kpiConfiguration} transferData={transferData} isLoading={isLoading}/>
            <ApigeeSummaryForDeployChart kpiConfiguration={kpiConfiguration} deployData={deployData} isLoading={isLoading}/>
        </div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        dashboardData={dashboardData}
        index={index}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
      />
      <ModalLogs
        header="APIGEE Summary"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

ApigeeSummaryChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default ApigeeSummaryChart;