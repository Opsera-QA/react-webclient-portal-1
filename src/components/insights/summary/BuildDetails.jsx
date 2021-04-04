import React, {useState, useEffect, useContext, useMemo, useRef} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { getTableDateTimeColumn, getTableTextColumn, getChartPipelineStatusColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import {format} from "date-fns";
import BuildDetailsMetadata from "./build-details-metadata";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";

function BuildDetails({data, dashboardData, setDashboardData}) {
  const history = useHistory();
  const fields = BuildDetailsMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      if (isMounted?.current === true && data) {
        let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
        let projectTags =  [{"type": "project", "value": data?.project}];
        const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryBuildDetails", null, dashboardTags, filterDto, projectTags);
        let dataObject = response?.data ? response?.data?.data[0] : [];
        setMetrics(dataObject[0]?.data);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", data?.executed);
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
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "run_count")),
      getTableTextColumn(getField(fields, "owner")),
      getChartPipelineStatusColumn(getField(fields, "status")),
      getChartPipelineStatusColumn(getField(fields, "security_status")),
      getChartPipelineStatusColumn(getField(fields, "deployment_status")),
      getTableDateTimeColumn(getField(fields, "timestamp")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData.original._id.id}/${rowData.original.run_count}`);
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

BuildDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default BuildDetails;