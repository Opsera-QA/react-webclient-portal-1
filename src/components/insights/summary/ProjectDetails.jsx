import React, {useState, useEffect, useContext, useMemo, useRef} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import BuildDetailsTableModal from "components/common/modal/BuildDetailsTableModal";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { getLimitedTableTextColumn, getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import ProjectDetailsMetadata from "./project-details-metadata";

function ProjectDetails({dashboardData, setDashboardData}) {
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryProjectDetails", null, dashboardTags, filterDto);
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

  const noDataMessage = "No Data is available for this chart at this time";
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

  const getChartBody = () => {

    return (
        <div>
        <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
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

//   if (isLoading) {
//     return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading</span>);
//   }

  return (
    getChartBody()
  );
}

ProjectDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default ProjectDetails;