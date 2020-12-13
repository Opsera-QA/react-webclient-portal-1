import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateColumn, getTableFavoriteColumn,
  getTableTextColumn
} from "../common/table/table-column-helpers";
import dashboardMetadata from "./dashboard-metadata";
import {useHistory} from "react-router-dom";
import {getField} from "../common/metadata/metadata-helpers";
import SearchFilter from "../common/filters/search/SearchFilter";
import FilterBar from "../common/filters/FilterBar";
import StatusFilter from "../common/filters/status/StatusFilter";
import DashboardTypeFilter from "../common/filters/dashboards/DashboardTypeFilter";
import FavoritesFilter from "../common/filters/dashboards/FavoritesFilter";
import NewDashboardModal from "./NewDashboardModal";
import {AuthContext} from "../../contexts/AuthContext";

function DashboardsTable({data, dashboardFilterDto, setDashboardFilterDto, loadData, isLoading}) {
  const {getAccessToken} = useContext(AuthContext);
  const [showCreateDashboardModal, setShowCreateDashboardModal] = useState(false);
  let history = useHistory();
  const fields = dashboardMetadata.fields;
  const tableInitialState = {
    pageIndex: 0,
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
      {...getTableTextColumn(getField(fields, "type")), class: "upper-case-first"},
      getTableDateColumn(getField(fields, "createdAt")),
      getTableFavoriteColumn(getField(fields, "isFavorite"), getAccessToken),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/insights/dashboards/${rowData.original._id}/viewer`);
  };

  const createNewDashboard = () => {
    setShowCreateDashboardModal(true);
  };

  const getFilterBar = () => {
    if (dashboardFilterDto == null) {
      return null;
    }

    return (
      <FilterBar
        loadData={loadData}
        filterDto={dashboardFilterDto}
        setFilterDto={setDashboardFilterDto}
        filters={["status", "type", "search", "isFavorite"]}
        addRecordFunction={createNewDashboard}
      >
        <StatusFilter filterDto={dashboardFilterDto} setFilterDto={setDashboardFilterDto}/>
        <DashboardTypeFilter filterDto={dashboardFilterDto} setFilterDto={setDashboardFilterDto}/>
        <SearchFilter filterDto={dashboardFilterDto} setFilterDto={setDashboardFilterDto}/>
        <FavoritesFilter filterDto={dashboardFilterDto} setFilterDto={setDashboardFilterDto}/>
      </FilterBar>
    );
  };

  return (
    <div className="p-2">
      <CustomTable
        data={data}
        columns={columns}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        tableTitle={"Dashboards"}
        tableFilterBar={getFilterBar()}
        paginationDto={dashboardFilterDto}
        setPaginationDto={setDashboardFilterDto}
        initialState={tableInitialState}
        loadData={loadData}
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