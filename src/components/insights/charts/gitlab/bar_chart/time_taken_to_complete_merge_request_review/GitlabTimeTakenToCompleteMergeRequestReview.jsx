import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./gitlabTimeTakenToCompleteMergeRequestReviewConfig";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, assignStandardColors,
         adjustBarWidth, spaceOutMergeRequestTimeTakenLegend } from '../../../charts-views';
import ChartTooltip from "../../../ChartTooltip";
import { METRIC_CHART_STANDARD_HEIGHT } from "components/common/helpers/metrics/metricTheme.helpers";
import GitlabTimeTakenToCompleteMergeRequestReviewActionableOverlay
  from "./GitlabTimeTakenToCompleteMergeRequestReviewActionableOverlay";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";


function GitlabTimeTakenToCompleteMergeRequestReview({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "gitlabTimeTakenToCompleteMergeRequestReviewChart", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.gitlabTimeTakenToCompleteMergeRequestReviewChart?.data : [];
      assignStandardColors(dataObject, true);
      spaceOutMergeRequestTimeTakenLegend(dataObject);

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

  const onChartClick = () => {
    toastContext.showInfoOverlayPanel(
      <GitlabTimeTakenToCompleteMergeRequestReviewActionableOverlay metrics={metrics}/>
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

  return (
    <div className="new-chart mb-3" style={{height: METRIC_CHART_STANDARD_HEIGHT}}>
          <ResponsiveBar
            data={metrics}
            {...defaultConfig("Reviewer", "Time (Hours)", 
                  true, false, "cutoffString", "wholeNumbers")}
            {...config()}
            {...adjustBarWidth(metrics, false)}
            onClick={onChartClick}
            tooltip={({ indexValue, color, value }) => <ChartTooltip 
                    titles={["Reviewer", "Merge Request Time Taken"]}
                    values={[indexValue, value ]}
                    style={false}
                     />}
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
        header="Time Taken to Complete Merge Request Review"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

GitlabTimeTakenToCompleteMergeRequestReview.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func};

export default GitlabTimeTakenToCompleteMergeRequestReview;
