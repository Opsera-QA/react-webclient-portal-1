import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./gitCustodianTopSecretsChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { defaultConfig, getColorByData, adjustBarWidth} from "../../../../charts/charts-views";
import {METRIC_THEME_CHART_PALETTE_COLORS} from "../../../../../common/helpers/metrics/metricTheme.helpers";

function GitCustodianTopSecretsCharts({ gitCustodianData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [topSecretsData, setTopSecretsData] = useState([
  {
    "count": 21,
    "commitHash": "645d799933b8c8f6989ce33044831156bcf1d596",
    "commitDate": "2022-04-19T15:09:51.000Z"
  },
  {
    "count": 11,
    "commitHash": "4972737d39781d2d09414ca3a9e258a9a2eaae70",
    "commitDate": "2022-01-21T08:27:25.000Z"
  },
  {
    "count": 11,
    "commitHash": "869e6b455667def686d8d4e216e66aac4ccd2ac0",
    "commitDate": "2021-01-05T13:34:09.000Z"
  },
  {
    "count": 10,
    "commitHash": "4447db4ddb95b00a13701614b179f9f3a71edef3",
    "commitDate": "2021-12-21T15:34:57.000Z"
  },
  {
    "count": 7,
    "commitHash": "f3bf293aca437376eacf3f57081211d97e312508",
    "commitDate": "2022-03-21T17:21:12.000Z"
  }
]);
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
    if (!Array.isArray(topSecretsData) || topSecretsData.length === 0) {
      return null;
    }

    return (
      <div className="new-chart p-0" style={{ height: "200px" }}>
        <ResponsiveBar
          data={topSecretsData}
          cutoffLength={5}
          {...defaultConfig("Count", "Commit Hash",
            true, false, "values", "cutoffString", true)}
          {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
          {...adjustBarWidth(topSecretsData)}
        />
      </div>
    );
  };

  return getBody();
}

GitCustodianTopSecretsCharts.propTypes = {
  gitCustodianData: PropTypes.object
};

export default GitCustodianTopSecretsCharts;
