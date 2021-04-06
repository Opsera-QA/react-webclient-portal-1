import React, {useState, useEffect, useContext, useMemo, useRef} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import PipelineDetailsTableModal from "components/common/modal/PipelineDetailsTableModal";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import BuildDetailsMetadata from "components/insights/summary/build-details-metadata";
import { getTableDateTimeColumn, getTableTextColumn, getChartPipelineStatusColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";

function PipelineFailedSecurity({dashboardData}) {
  const fields = BuildDetailsMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryPipelinesFailedSecurity", null, dashboardTags, filterDto, null, dashboardOrgs);
      let dataObject = response?.data ? response?.data?.data[0] : [{data: [], count: [{count: 0}]}];
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataObject[0]?.count[0]?.count);
      setTableFilterDto({ ...newFilterDto });

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setModalData(dataObject[0]?.data);
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

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "run_count")),
      getChartPipelineStatusColumn(getField(fields, "status")),
      getTableDateTimeColumn(getField(fields, "timestamp")),
    ],
    []
  );

  const onSelect = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const getChartBody = () => {
    return (
    <div>
            <div className="metric-box p-1 text-center">
              <div className="box-metric pointer" onClick={() => {onSelect(metrics[0]?.data);}}>
              <div className="red">{!isLoading && metrics[0]?.count[0] ? metrics[0]?.count[0]?.count : <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>}</div>
              </div>
              <div className="w-100 text-muted mb-1">Pipelines Failing Security Step</div>
              </div> 
      <PipelineDetailsTableModal
        header="Pipelines Failing Security Step"
        size="lg"
        tableMessage={modalData}
        show={showModal}
        setParentVisibility={setShowModal}
        loadData={loadData}
        columns={columns}
        tableFilterDto={tableFilterDto}
        setTableFilterDto={setTableFilterDto}
        noDataMessage={noDataMessage}
        isLoading={isLoading}
      />
      </div>
    );
  };

//   if (isLoading) {
//     return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading</span>);
//   }

  return (
    getChartBody()
  );
}

PipelineFailedSecurity.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default PipelineFailedSecurity;