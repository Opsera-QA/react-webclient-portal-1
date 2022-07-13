import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { useHistory } from "react-router-dom";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/pro-light-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function IntermediateEnvironmentsLeadTimeChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
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
    setKpiConfiguration({...kpiConfiguration, kpi_name:"All Environments - Lead Time"});


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
      let dataObject = [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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
  const getIcon = (severity) => {
    switch (severity) {
      case "Red":
        return faArrowCircleUp;
      case "Green":
        return faArrowCircleDown;
      case "Neutral":
        return faMinusCircle;
      default:
        break;
    }
  };
  const getDescription = (severity) => {
    switch (severity) {
      case "Red":
        return "This project's issues are trending upward";
      case "Green":
        return "This project's issues are trending downward";
      case "Neutral":
        return "Neutral: This project's issues have experienced no change";
    }
  };
  const getIconColor = (severity) => {
    switch (severity) {
      case "Red":
        return "red";
      case "Green":
        return "green";
      case "Neutral":
        return "light-gray-text-secondary";
      case "-":
        return "black";
      default:
        break;
    }
  };

  const getMiddleDataBlock = (title, score, last_score) => {
    return (
      <DataBlockBoxContainer showBorder={true} className={'h-100'}>
      <ThreeLineScoreDataBlock
        className={`${getIconColor("Green")} p-2`}
        score={score + " Days"}
        topText={title}
        bottomText={"Previous Result: " + last_score + " Days"}
        icon={getIcon("Green")}
        iconOverlayBody={getDescription("Green")}
      />
      </DataBlockBoxContainer>
    );
  };
 

  const getChartBody = () => {
    // if (!Array.isArray(metrics) || metrics.length === 0) {
    //   return null;
    // }

    return (
      <div
        className="new-chart mb-3"
      >
        <Container>
          <Row className="p-2 gray">
            <Col md={4}>{getMiddleDataBlock("Code commit - E1", 10.2, 5)}</Col>
            <Col md={4}>{getMiddleDataBlock("E1 - E2", 15.2, 4)}</Col>
            <Col md={4}>{getMiddleDataBlock("E2 - E3", 30.2, 15)}</Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <div>
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
      <ModalLogs
        header="Intermediate Environments - Lead Time"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

IntermediateEnvironmentsLeadTimeChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default IntermediateEnvironmentsLeadTimeChart;
