import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import DataBlockBoxContainer from "../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import chartsActions from "../../../../charts-actions";
import LoadingIcon from "../../../../../../common/icons/LoadingIcon";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";

function SuccessPercentActionableInsights({ kpiConfiguration, dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [responseData, setResponseData] = useState([]);

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

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardFilters =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "amexFilters")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "actionsSuccessFailureCancelledSkipped",
        kpiConfiguration,
        dashboardTags,
        null,
        dashboardFilters,
        dashboardOrgs
      );
      const data = response?.data?.data?.[0];
      setResponseData(data);
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

  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
    }
    return (
      <>
        {getDateRange()}
        {getDataBlocks()}
      </>
    );
  };

  const getDataBlocks = () => {
    return (
      <Row className="pb-3 px-2">
        <Col lg={3} md={3} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.successPercentage}
              subtitle={'Success%'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={3} md={3} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.failurePercentage}
              subtitle={'Failed'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={3} md={3} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.cancelledPercentage}
              subtitle={'Cancelled'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={3} md={3} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.skippedPercentage == null ? 'N/A' : responseData?.skippedPercentage}
              subtitle={'Skipped'}
            />
          </DataBlockBoxContainer>
        </Col>
      </Row>
    );
  };

  return <>{getBody()}</>;
}

SuccessPercentActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SuccessPercentActionableInsights;
