import React, {useState, useEffect, useContext, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import connectedAssetsActions from "../../connectedAssets.actions";
import connectedAssetsMetadata from "../../connectedAssets-metadata";
import FilterContainer from "../../../../common/table/FilterContainer";
import CustomTable from "../../../../common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { CONNECTED_ASSETS_CONSTANTS as constants } from "../../connecetdAssets.constants";
import {useHistory} from "react-router-dom";
import {parseError} from "../../../../common/helpers/error-helpers";

function ConnectedAssetsTasksRecentTable({ dashboardData }) {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...connectedAssetsMetadata.newObjectFields },
      connectedAssetsMetadata,
      false
    )
  );
  const history = useHistory();
  const noDataMessage = 'No tasks found.';
  const fields = connectedAssetsMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "task_name"), "task_name"),
      getTableDateTimeColumn(getField(fields, "task_created_at"), "task_created_at"),
      getTableDateTimeColumn(getField(fields, "task_last_run"), "task_last_run"),
      getTableTextColumn(getField(fields, "task_owner_name"), "task_owner_name"),
      getTableTextColumn(getField(fields, "task_run_count"), "task_run_count")
    ],
    []
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

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadRecentPipelineData();
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

  const loadRecentPipelineData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    setIsLoading(true);
    let dateRange = dashboardData?.getData("date");
    const response = await connectedAssetsActions.getTasksInfo(
      getAccessToken,
      cancelSource,
      constants.TASKS_LIST.RECENT_TASKS,
      dateRange?.startDate,
      dateRange?.endDate,
      filterDto,
    );
    let dataObject = response?.data?.data?.taskInfo?.data?.[0];
    let dataCount = dataObject?.count?.[0]?.count ? dataObject?.count?.[0]?.count : 0;
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", dataCount);
    setFilterModel({ ...newFilterDto });
    if (isMounted?.current === true && dataObject && Array.isArray(dataObject?.data)) {
      setMetrics(dataObject?.data);
    }
  };

  const onRowSelect = (rowData) => {
    history.push(`/task/details/${(rowData.original?._id)}`);
  };

  const getTable = () => {
    if (error) {
      return (
        <div className="mx-2" >
          <div className="max-content-width p-5 mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className={"-5"}>There was an error loading the data: {parseError(error?.message)}. Please check logs for more details.</span>
          </div>
        </div>
      );
    }

    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <div className={"p-2"}>
      <FilterContainer
        isLoading={isLoading}
        title={'List Of Recent Tasks'}
        titleIcon={faListCheck}
        body={getTable()}
        className={"px-2 pb-2"}
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        showRefreshButton={false}
        supportSearch={true}
      />
    </div>
  );
}
ConnectedAssetsTasksRecentTable.propTypes = {
  dashboardData: PropTypes.object,
};
export default ConnectedAssetsTasksRecentTable;
