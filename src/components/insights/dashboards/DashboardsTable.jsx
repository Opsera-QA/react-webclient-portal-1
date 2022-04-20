import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {
  getLimitedTableTextColumn,
  getTableDateColumn,
  getTableFavoriteColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import FavoritesFilter from "components/common/filters/dashboards/favorites/FavoritesFilter";
import NewDashboardModal from "components/insights/dashboards/NewDashboardModal";
import FilterContainer from "components/common/table/FilterContainer";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import InlineDashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/InlineDashboardTypeFilter";

function DashboardsTable({data, dashboardFilterDto, setDashboardFilterDto, loadData, isLoading, isMounted}) {
  const toastContext = useContext(DialogToastContext);
  let history = useHistory();
  const fields = dashboardMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "owner_name")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      {...getTableTextColumn(getField(fields, "type")), class: "upper-case-first"},
      getTableDateColumn(getField(fields, "createdAt")),
      getTableFavoriteColumn(getField(fields, "isFavorite")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/insights/dashboards/${rowData.original._id}/viewer`);
  };

  const createNewDashboard = () => {
    toastContext.showOverlayPanel(<NewDashboardModal loadData={loadData} isMounted={isMounted} />);
  };

  const getDropdownFilters = () => {
    return (
      <>
        <ActiveFilter filterDto={dashboardFilterDto} setFilterDto={setDashboardFilterDto} className="mb-2" />
        <FavoritesFilter filterModel={dashboardFilterDto} setFilterModel={setDashboardFilterDto}/>
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineDashboardTypeFilter filterModel={dashboardFilterDto} setFilterModel={setDashboardFilterDto} loadData={loadData} className="mr-2" />
    );
  };

  const getDashboardsTable = () => {
    return (
      <CustomTable
        data={data}
        columns={columns}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        paginationDto={dashboardFilterDto}
        setPaginationDto={setDashboardFilterDto}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createNewDashboard}
      isLoading={isLoading}
      body={getDashboardsTable()}
      titleIcon={faChartNetwork}
      metadata={dashboardMetadata}
      supportSearch={true}
      title={"My Dashboards"}
      filterDto={dashboardFilterDto}
      setFilterDto={setDashboardFilterDto}
      dropdownFilters={getDropdownFilters()}
      inlineFilters={getInlineFilters()}
      className={"px-2 pb-2"}
    />
  );
}

DashboardsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  dashboardFilterDto: PropTypes.object,
  activeDashboardFilterDto: PropTypes.object,
  setDashboardFilterDto: PropTypes.func,
};

export default DashboardsTable;
