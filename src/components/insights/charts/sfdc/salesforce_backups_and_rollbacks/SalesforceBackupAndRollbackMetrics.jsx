import PropTypes from "prop-types";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import Model from "core/data_model/model";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";

import { Row, Col } from "react-bootstrap";
import SfdcBackupSuccessDataBlock from "./data_block/success/SfdcBackupSuccessDataBlock";
import SfdcBackupFailureDataBlock from "./data_block/failure/SfdcBackupFailureDataBlock";
import SfdcPipelinesInsightsTableMetadata from "../sfdc-pipelines-actionable-metadata";

function SalesforceBackupAndRollbackMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [rollbacks, setRollbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sfdcBackupsAndRollbacks",
        kpiConfiguration,
        dashboardTags
      );
      const dataObject =
        response?.data && response?.data?.data[0]?.sfdcBackups?.status === 200
          ? response?.data?.data[0]?.sfdcBackups?.data
          : [];
      const rollbacksDataObject =
        response?.data && response?.data?.data[0]?.sfdcRollbacks?.status === 200
          ? response?.data?.data[0]?.sfdcRollbacks?.data
          : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setRollbacks(rollbacksDataObject);
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

  

  const onRowSelect = (kpiName) => {
    const chartModel = new Model(
      { ...SfdcPipelinesInsightsTableMetadata.newObjectFields },
      SfdcPipelinesInsightsTableMetadata,
      false
    );
    toastContext.showOverlayPanel(
      <ChartDetailsOverlay
        dashboardData={dashboardData}
        kpiConfiguration={kpiConfiguration}
        chartModel={chartModel}
        kpiIdentifier={kpiName}
      />
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <Row className="px-4 justify-content-between">
        <Col xl={6} lg={6} sm={6} className={"my-3"}>
          <SfdcBackupSuccessDataBlock
            score={metrics[0].success.toString()}
            subtitle="Successful Backups"
            onClickFunction={() => onRowSelect("sfdc-backups-successful")}
          />
        </Col>
        <Col xl={6} lg={6} sm={6} className={"my-3"}>
          <SfdcBackupFailureDataBlock
            score={metrics[0].failure.toString()}
            subtitle="Failed Backups"
            onClickFunction={() => onRowSelect("sfdc-backups-failure")}
          />
        </Col>
        <Col xl={6} lg={6} sm={6} className={"my-3"}>
          <SfdcBackupSuccessDataBlock
            score={rollbacks && rollbacks.length > 0 ? rollbacks[0].success.toString() : "0"}
            subtitle="Successful Rollbacks"
            onClickFunction={() => onRowSelect("sfdc-rollbacks-successful")}
          />
        </Col>
        <Col xl={6} lg={6} sm={6} className={"my-3"}>
          <SfdcBackupFailureDataBlock
            score={rollbacks && rollbacks.length > 0 ? rollbacks[0].failure.toString() : "0"}
            subtitle="Failed Backups"
            onClickFunction={() => onRowSelect("sfdc-rollbacks-failure")}
          />
        </Col>
      </Row>
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
      />
    </>
  );
}
SalesforceBackupAndRollbackMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  nodes: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any,
};

export default SalesforceBackupAndRollbackMetrics;
