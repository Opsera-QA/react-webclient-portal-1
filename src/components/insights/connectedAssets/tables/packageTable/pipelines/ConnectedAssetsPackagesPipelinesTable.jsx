import React, {useState, useEffect, useContext, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import {faCircleInfo, faBox} from "@fortawesome/pro-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import connectedAssetsActions from "../../../connectedAssets.actions";
import connectedAssetsMetadata from "../../../connectedAssets-metadata";
import FilterContainer from "../../../../../common/table/FilterContainer";
import CustomTable from "../../../../../common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { CONNECTED_ASSETS_CONSTANTS as constants } from "../../../connecetdAssets.constants";
import {useHistory} from "react-router-dom";
import IconBase from "../../../../../common/icons/IconBase";
import {parseError} from "../../../../../common/helpers/error-helpers";

function ConnectedAssetsPackagesPipelinesTable({ pipeline, dashboardData }) {
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
  const noDataMessage = 'No relevant data found.';
  const fields = connectedAssetsMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "artifactName"), "artifactName"),
      getTableTextColumn(getField(fields, "pipeline_name"), "pipeline_name"),
      getTableTextColumn(getField(fields, "run_count"), "run_count"),
      getTableDateTimeColumn(getField(fields, "createdAt"), "createdAt"),
      getTableTextColumn(getField(fields, "owner_name"), "owner_name")
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
  }, [pipeline]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      if(pipeline) {
        await loadOpenData();
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

  const loadOpenData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    setIsLoading(true);
    let dateRange = dashboardData?.getData("date");
    let pipelines = {
      _id: pipeline?._id
    };
    const response = await connectedAssetsActions.getPackagesInfo(
      getAccessToken,
      cancelSource,
      constants.PACKAGES_LIST.SELECTED_PIPELINE_INFO,
      dateRange?.startDate,
      dateRange?.endDate,
      filterDto,
      pipelines
    );
    let dataObject = response?.data?.data?.packageInfo?.data?.[0];
    let dataCount = dataObject?.count?.[0]?.count ? dataObject?.count?.[0]?.count : 0;
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", dataCount);
    setFilterModel({ ...newFilterDto });
    if (isMounted?.current === true && dataObject && Array.isArray(dataObject?.data)) {
      setMetrics(dataObject?.data);
    }
  };

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${(rowData.original?._id)}/summary`);
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
      <div className={"px-2 pb-2"} style={{textAlign: 'end'}}><IconBase icon={faCircleInfo} className={'m-1'}/>On click of each row you will be redirected to the respective pipeline.</div>
      <FilterContainer
        isLoading={isLoading}
        title={'List Of Packages'}
        titleIcon={faBox}
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
ConnectedAssetsPackagesPipelinesTable.propTypes = {
  pipeline: PropTypes.object,
  dashboardData: PropTypes.object,
};
export default ConnectedAssetsPackagesPipelinesTable;
