import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {useHistory} from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {
  getTableDateColumn,
  getTableFavoriteColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import StatusFilter from "components/common/filters/status/StatusFilter";
import DashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/DashboardTypeFilter";
import FavoritesFilter from "components/common/filters/dashboards/favorites/FavoritesFilter";
import NewDashboardModal from "components/insights/dashboards/NewDashboardModal";
import FilterContainer from "components/common/table/FilterContainer";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import InlineDashboardTypeFilter from "components/common/filters/dashboards/dashboard_type/InlineDashboardTypeFilter";

function DashboardsTable({data, dashboardFilterDto, setDashboardFilterDto, loadData, isLoading}) {
  const [showCreateDashboardModal, setShowCreateDashboardModal] = useState(false);
  let history = useHistory();
  const fields = dashboardMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
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
    setShowCreateDashboardModal(true);
  };

  const getDropdownFilters = () => {
    return (
      <>
        <StatusFilter filterDto={dashboardFilterDto} setFilterDto={setDashboardFilterDto} className="mb-2" />
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
        className={"no-table-border"}
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
    <div className="px-2 pb-2">
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
      />
      <NewDashboardModal loadData={loadData} setShowModal={setShowCreateDashboardModal} showModal={showCreateDashboardModal}/>
    </div>
  );
}

DashboardsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  dashboardFilterDto: PropTypes.object,
  activeDashboardFilterDto: PropTypes.object,
  setDashboardFilterDto: PropTypes.func,
};

export default DashboardsTable;