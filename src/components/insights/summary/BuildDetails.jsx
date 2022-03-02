import React, {useState, useEffect, useContext, useMemo, useRef} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { getTableDateTimeColumn, getTableTextColumn, getChartPipelineStatusColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import {faDraftingCompass, faSpinner} from "@fortawesome/pro-light-svg-icons";
import BuildDetailsMetadata from "./build-details-metadata";
import FilterContainer from "components/common/table/FilterContainer";

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
        let dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
        const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryBuildDetails", null, dashboardTags, filterDto, projectTags, dashboardOrgs);
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

  const getTable = () => {
    return (
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
    );
  };

  const getChartBody = () => {
    return (
      <div className="content-container content-card-1">
        <div className="new-chart mx-3 mb-3 shaded-panel">
          <FilterContainer
            titleIcon={faDraftingCompass}
            body={getTable()}
            isLoading={isLoading}
            title={"Project: " + data?.project}
            loadData={loadData}
          />
        </div>
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