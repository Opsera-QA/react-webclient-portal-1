import React, {useState, useEffect, useContext, useMemo, useRef} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import BuildDetailsTableModal from "components/common/modal/BuildDetailsTableModal";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import {faProjectDiagram} from "@fortawesome/pro-light-svg-icons";
import ProjectDetailsMetadata from "components/insights/summary/project-details-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {ANALYTICS_TEXT_CONSTANTS} from "components/common/constants/text/analytics/analytics.text.constants";

function PipelinesByProjectTable({dashboardData, setDashboardData}) {
  const fields = ProjectDetailsMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const [modalData, setModalData] = useState(undefined);
  
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryProjectDetails", null, dashboardTags, filterDto, null, dashboardOrgs);
      let dataObject = response?.data ? response?.data?.data[0] : [];
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject[0]?.data);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", dataObject[0]?.count[0]?.count);
        setTableFilterDto({ ...newFilterDto });
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

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project")),
      getTableTextColumn(getField(fields, "executed")),
      getTableTextColumn(getField(fields, "passed")),
      getTableTextColumn(getField(fields, "failed")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    setModalData(rowData.original);
    setShowModal(true);
  };

  const getProjectsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={ANALYTICS_TEXT_CONSTANTS.NO_CHART_DATA_MESSAGE}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };

  const getChartBody = () => {

    return (
      <div className="w-100 px-4">
        <FilterContainer
          loadData={loadData}
          isLoading={isLoading}
          body={getProjectsTable()}
          titleIcon={faProjectDiagram}
          supportSearch={false}
          metaData={ProjectDetailsMetadata}
          title={"Pipelines By Project"}
        />
        <BuildDetailsTableModal
          header="Build Details"
          size="lg"
          tableMessage={modalData}
          show={showModal}
          setParentVisibility={setShowModal}
          dashboardData={dashboardData}
        />
      </div>
    );
  };

  return (
    getChartBody()
  );
}

PipelinesByProjectTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default PipelinesByProjectTable;