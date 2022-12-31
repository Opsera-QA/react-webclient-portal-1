import React, {useState, useEffect, useContext, useRef, Fragment} from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./opseraMeanTimeToRestoreConfigs.js";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { line } from "d3-shape";
import {
  defaultConfig, getColorByData, assignStandardColors, adjustBarWidth,
  accentColor, mainPurple, neutralColor, mainColor,
} from "../../../charts-views";
import ChartTooltip from '../../../ChartTooltip';
import DeploymentFrequencyInsightsTableMetadata
  from "components/insights/charts/opsera/OpseraDeploymentFreqStats/deployment-frequency-actionable-metadata";
import Model from "../../../../../../core/data_model/model";
import ChartDetailsOverlay from "../../../detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import MeanTimeToDeployHelpDocumentation
  from "../../../../../common/help/documentation/insights/charts/MeanTimeToDeployHelpDocumentation";
import { faMinus , faSquare} from "@fortawesome/pro-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";


function OpseraMeanTimeToRestoreBarChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis}) {
  const {getAccessToken} = useContext(AuthContext);
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "opseraMeanTimeToRestore", kpiConfiguration, dashboardTags);
      let dataObject = response?.data?.data[0]?.opseraMeanTimeToRestore?.data[0].data;
      assignStandardColors(dataObject, true);
      dataObject.forEach(data => data.Count = data.count);

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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    const getMaxValue = (data) => {
      let countsMax = Math.max.apply(Math,data.map(function(o){return o.count;}));
      let mttrMax = Math.max.apply(Math,data.map(function(o){return o.mttr;}));
      let max = Math.ceil(Math.max(countsMax, mttrMax));
      return max;
    };

    let mead = metrics[0].mean;
    // TODO: Do these need to be passed as object props?
    const MeanLineLayer = ({ bars, xScale, yScale }) => {
      const lineColor = neutralColor;
      const lineGenerator = line()
        .x(d => xScale(d.data.data._id))
        .y(d => yScale(d.data.data.mean));
      const mean = metrics[0]?.mean;
      return (
        <Fragment>
          <path
            d={lineGenerator(bars)}
            fill="none"
            stroke={lineColor}
            strokeWidth="3"
            style={{ pointerEvents: "none" }}
          />

          {/*{bars.map(bar => {*/}
          {/*    return <circle*/}
          {/*      key={bar.key}*/}
          {/*      cx={xScale(bar.data.data._id)}*/}
          {/*      cy={yScale(bar.data.data.mttr)}*/}
          {/*      r={4}*/}
          {/*      fill={lineColor}*/}
          {/*      stroke={lineColor}*/}
          {/*      style={{ pointerEvents: "none" }}*/}
          {/*    />;*/}
          {/*  }*/}
          {/*)}*/}
        </Fragment>
      );
    };

    const onRowSelect = (data) => {
      const chartModel = new Model({...DeploymentFrequencyInsightsTableMetadata.newObjectFields}, DeploymentFrequencyInsightsTableMetadata, false);
      toastContext.showOverlayPanel(
        <ChartDetailsOverlay
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          chartModel={chartModel}
          kpiIdentifier={"mean-time-to-restore"}
          currentDate={data.data._id}
        />);
    };

    return (
      <div className="new-chart mb-3 pointer" style={{height: "300px"}}>
        <div style={{float: "right", fontSize: "10px"}}>
          # - Total Number of Deployments <br></br>
          <IconBase icon={faMinus} iconColor={neutralColor} iconSize={"lg"}/> Average MTTD <b>({mead} minutes)</b> <br></br>
          <IconBase icon={faSquare} iconColor={mainColor} iconSize={"lg"}/> MTTD <br></br>
        </div>
        <ResponsiveBar
          data={metrics}
          {...defaultConfig("Mean Time to Deploy (in minutes)", "Date",
            false, false, "wholeNumbers", "monthDate2")}
          {...config(getColorByData, getMaxValue(metrics), MeanLineLayer)}
          {...adjustBarWidth(metrics)}
          onClick={(data) => onRowSelect(data)}
          tooltip={({ indexValue, value, data, color }) => <ChartTooltip
            titles={["Date", "Mean Time to Deploy", "Number of Deployments"]}
            values={[new Date(indexValue).toDateString(), `${value} minutes`, data.count ]}
            style={false}
            color={color} />}
        />
      </div>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => (
          <MeanTimeToDeployHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
      <ModalLogs
        header="Mean Time to Restore"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

OpseraMeanTimeToRestoreBarChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  bars: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any
};

export default OpseraMeanTimeToRestoreBarChart;
