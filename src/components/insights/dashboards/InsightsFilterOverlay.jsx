import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import KpiIdentifierFilter from "components/common/filters/admin/kpis/kpi_identifier/KpiIdentifierFilter";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function InsightsFilterOverlay(
  {
    loadDataFunction,
    dashboardFilterModel,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);
  const { areAnalyticsToolsEnabled } = useComponentStateReference();

  useEffect(() => {
    setFilterModel(dashboardFilterModel?.clone());
  }, [dashboardFilterModel]);

  if (filterModel == null || setFilterModel == null || loadDataFunction == null || areAnalyticsToolsEnabled !== true) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={filterModel}
      loadDataFunction={loadDataFunction}
    >
      <OwnerFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
        visible={dashboardFilterModel?.getData("type") !== "owner"}
      />
      {/*<KpiIdentifierFilter*/}
      {/*  filterModel={filterModel}*/}
      {/*  setFilterModel={setFilterModel}*/}
      {/*  status={"active"}*/}
      {/*/>*/}
      <ActiveFilter
        filterDto={filterModel}
        setFilterDto={setFilterModel}
        className={"mb-2"}
      />
    </FilterSelectionOverlayContainer>
  );
}

InsightsFilterOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  dashboardFilterModel: PropTypes.object,
};