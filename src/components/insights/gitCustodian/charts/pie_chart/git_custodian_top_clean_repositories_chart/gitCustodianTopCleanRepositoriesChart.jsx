import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "./gitCustodianTopCleanRepositoriesChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import { defaultConfig, getColorByData } from '../../../../charts/charts-views';
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineIconDataBlockBase from "../../../../../common/metrics/icon/ThreeLineIconDataBlockBase";
import TwoLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/TwoLineDataBlockBase";

function GitCustodianTopCleanRepositoriesChart({ dashboardData, data }) {
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
  }, [JSON.stringify(dashboardData)]);

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

  const getChartBody = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="new-chart p-0" style={{height: "200px"}} >
          <div className={'p-2'}>No data found.</div>
        </div>
      );
    }

    const totalRepo = data?.[0]?.totalRepos ? data?.[0]?.totalRepos : 0;
    const totalCleanRepo = data?.[0]?.cleanRepos ? data?.[0]?.cleanRepos : 0;
    const totalUncleanRepo = totalRepo - totalCleanRepo;

    const chartData = [{
        "totalRepos": totalRepo,
        "value": totalCleanRepo,
        "id": "Clean Repositories"
      },
      {
        "totalRepos": totalRepo,
        "value": totalUncleanRepo,
        "id": "Unclean Repositories"
      }
    ];

    return (
      <div className="new-chart p-0" style={{ height: "200px", position: "relative" }}>
        <div className={"mx-2"}>
          <Row className={"mx-0 p-2 justify-content-between"}>
            <Col md={6} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true} className={'h-100'}>
                <TwoLineDataBlockBase
                  className={"p-2"}
                  title={totalCleanRepo === 0 ? '0' : totalCleanRepo}
                  subtitle={"Clean Repositories"}
                ></TwoLineDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
            <Col md={6} className={"my-2"}>
              <DataBlockBoxContainer showBorder={true}>
                <TwoLineDataBlockBase
                  className={"p-2"}
                  subtitle={'Unclean Repositories'}
                  title={totalUncleanRepo === 0 ? '0' : totalUncleanRepo}
                ></TwoLineDataBlockBase>
              </DataBlockBoxContainer>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return getChartBody();
}

GitCustodianTopCleanRepositoriesChart.propTypes = {
  dashboardData: PropTypes.object,
  dataWithArc: PropTypes.any,
  centerX: PropTypes.any,
  centerY: PropTypes.any,
  data: PropTypes.array
};

export default GitCustodianTopCleanRepositoriesChart;
