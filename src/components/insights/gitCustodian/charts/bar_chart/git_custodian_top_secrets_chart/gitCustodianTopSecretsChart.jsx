import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./gitCustodianTopSecretsChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { defaultConfig, getColorByData, adjustBarWidth} from "../../../../charts/charts-views";
import {METRIC_THEME_CHART_PALETTE_COLORS} from "../../../../../common/helpers/metrics/metricTheme.helpers";

function GitCustodianTopSecretsCharts({ gitCustodianData, data }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) cancelTokenSource.cancel();

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) throw error;
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(gitCustodianData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) setIsLoading(false);
    }
  };

  const getBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="new-chart p-0" style={{height: "200px"}}/>
      );
    }

    return (
      <div className="new-chart p-0" style={{ height: "200px" }}>
        <ResponsiveBar
          data={data}
          cutoffLength={5}
          {...defaultConfig("Count", "Commit Hash",
            true, false, "values", "cutoffString", true)}
          {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
          {...adjustBarWidth(data)}
        />
      </div>
    );
  };

  return getBody();
}

GitCustodianTopSecretsCharts.propTypes = {
  gitCustodianData: PropTypes.object,
  data: PropTypes.object
};

export default GitCustodianTopSecretsCharts;
