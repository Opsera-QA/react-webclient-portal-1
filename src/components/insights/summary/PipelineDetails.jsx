import React, {useState, useEffect, useContext, useMemo, useRef} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import CardGroup from "react-bootstrap/CardGroup";
import BuildDetailsMetadata from "components/insights/summary/build-details-metadata";
import { getTableDateTimeColumn, getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import TotalPipelinesExecuted from "components/insights/summary/TotalPipelinesExecuted";
import PipelinesPassedWithQualityAndSecurity from "components/insights/summary/PipelinesPassedWithQualityAndSecurity";
import PipelinesFailedSecurity from "components/insights/summary/PipelinesFailedSecurity";
import PipelinesFailedQuality from "components/insights/summary/PipelinesFailedQuality";
import PipelinesFailedDeployment from "components/insights/summary/PipelinesFailedDeployment";
import DataBoxWrapper from "components/common/data_boxes/DataBoxWrapper";

function PipelineDetails({dashboardData}) {
  const fields = BuildDetailsMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getChartBody = () => {
    return (
      <DataBoxWrapper>
        <TotalPipelinesExecuted dashboardData={dashboardData}/>
        <PipelinesPassedWithQualityAndSecurity dashboardData={dashboardData}/>
        <PipelinesFailedSecurity dashboardData={dashboardData}/>
        <PipelinesFailedQuality dashboardData={dashboardData}/>
        <PipelinesFailedDeployment dashboardData={dashboardData}/>
      </DataBoxWrapper>
    );
  };

//   if (isLoading) {
//     return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading</span>);
//   }

  return (
    getChartBody()
  );
}

PipelineDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default PipelineDetails;