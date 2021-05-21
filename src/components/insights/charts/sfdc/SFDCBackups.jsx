import PropTypes from "prop-types";
import React, {useState, useEffect, useContext, useRef} from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import DataBlockWrapper from "components/common/data_boxes/DataBlockWrapper";
import DataBlock from "components/common/data_boxes/DataBlock";
import Model from "core/data_model/model";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import SFDCPipelinesInsightsTableMetadata from "components/insights/charts/sfdc/sfdc-pipelines-actionable-metadata.js";
import {Row, Col, Container} from "react-bootstrap";
function SfdcBackups({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [rollbacks, setRollbacks] = useState([]);
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sfdcBackupsAndRollbacks", kpiConfiguration, dashboardTags);
      const dataObject = response?.data && response?.data?.data[0]?.sfdcBackups?.status === 200 ? response?.data?.data[0]?.sfdcBackups?.data : [];
      const rollbacksDataObject = response?.data && response?.data?.data[0]?.sfdcRollbacks?.status === 200 ? response?.data?.data[0]?.sfdcRollbacks?.data : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setRollbacks(rollbacksDataObject);
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

  const onRowSelect = (kpiName) => {
    const chartModel = new Model({...SFDCPipelinesInsightsTableMetadata.newObjectFields}, SFDCPipelinesInsightsTableMetadata, false);
    toastContext.showOverlayPanel(
    <ChartDetailsOverlay
      dashboardData={dashboardData} 
      kpiConfiguration={kpiConfiguration} 
      chartModel={chartModel} 
      kpiIdentifier={kpiName} />);
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{height: "300px", display:"flex"}}>
      <Container>
      <Col>
      <Row>
      <DataBlockWrapper>
      <DataBlock 
        title={metrics[0].success.toString()}
        subTitle="No. of Pipelines with Successful Backups"
        toolTipText="Total number of pipelines with successful backups"
        // clickAction={() => onRowSelect("sfdc-backups-successful")}
      />
      <DataBlock 
        title={metrics[0].failure.toString()}
        subTitle="No. of Pipelines with Failed Backups"
        toolTipText="Total number of pipelines with failed backups"
        // clickAction={() => onRowSelect("sfdc-backups-failure")}
      />
      </DataBlockWrapper>
      </Row>
      <Row>
      <DataBlockWrapper>
      <DataBlock 
        title={rollbacks && rollbacks.length > 0 ? rollbacks[0].success.toString() : 0}
        subTitle="No. of Pipelines with Successful Rollbacks"
        toolTipText="Total number of pipelines with successful rollbacks"
        // clickAction={() => onRowSelect("sfdc-rollbacks-successful")}
      />
      <DataBlock 
        title={rollbacks && rollbacks.length > 0 ? rollbacks[0].failure.toString() : 0}
        subTitle="No. of Pipelines with Failed Rollbacks"
        toolTipText="Total number of pipelines with failed rollbacks"
        // clickAction={() => onRowSelect("sfdc-rollbacks-failure")}
      />
      </DataBlockWrapper>
      </Row>
      </Col>
      </Container>
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
      />
    </>
  );
}
SfdcBackups.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  nodes: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any
};

export default SfdcBackups;
