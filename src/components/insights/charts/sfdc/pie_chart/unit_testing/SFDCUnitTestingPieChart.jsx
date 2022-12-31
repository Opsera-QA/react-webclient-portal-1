import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "components/insights/charts/qa_metrics/manualQaTestPieChartConfig";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import axios from "axios";
import Model from "core/data_model/model";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig, getColorByData, getColor, assignStandardColors,
  shortenPieChartLegend, mainColor, getColorById,
} from "../../../charts-views";
import SFDCPipelinesInsightsTableMetadata from "components/insights/charts/sfdc/sfdc-pipelines-actionable-metadata.js";

function SFDCUnitTestingPieChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sfdcUnitTesting", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.sfdcUnitTesting?.data : [];
      assignStandardColors(dataObject[0]?.pairs);
      shortenPieChartLegend(dataObject[0]?.pairs);


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

  const onRowSelect = (data) => {
    let kpiName = "";
    if (data.label === "Successful") {kpiName = "sfdc-unit-testing-successful";}
    if (data.label === "Failure") {kpiName = "sfdc-unit-testing-failure";}
    const chartModel = new Model({...SFDCPipelinesInsightsTableMetadata.newObjectFields}, SFDCPipelinesInsightsTableMetadata, false);
    toastContext.showOverlayPanel(
    <ChartDetailsOverlay
      dashboardData={dashboardData} 
      kpiConfiguration={kpiConfiguration} 
      chartModel={chartModel} 
      kpiIdentifier={kpiName} />);
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics[0]?.pairs) || metrics[0]?.pairs.length === 0) {
      return null;
    }

    return (

      <div className="new-chart mb-3" style={{height: "300px", display: "flex"}}>
        <ResponsivePie
          data={metrics[0]?.pairs}
          {...defaultConfig()}
          sortByValue={true}
          innerRadius={.5}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor={"#ffffff"}
          colors={["#ABA4CC", "#696969", "#B1AeA7"]}
          // onClick={(data) => onRowSelect(data)}
        />
      </div>
    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
      <ModalLogs
        header="Unit Test Data Stats"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SFDCUnitTestingPieChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func};

export default SFDCUnitTestingPieChart;