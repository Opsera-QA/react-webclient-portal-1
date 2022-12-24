import PropTypes from "prop-types";
import React from "react";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import InlineAuditLogActionsMutiSelectCheckboxFilter
  from "components/common/audit_log/inputs/InlineAuditLogActionsMutiSelectCheckboxFilter";
import NewInlineDateRangeFilter from "components/common/inputs/date/range/NewInlineDateRangeFilter";
import InlineSiteRoleMultiSelectCheckboxFilterInput
  from "components/common/list_of_values_input/ldap/site_roles/InlineSiteRoleMultiSelectCheckboxFilterInput";

export default function UserActivityAuditLogFilterSidebarBase(
  {
    isLoading,
    userActivityAuditLogFilterModel,
    setUserActivityAuditLogFilterModel,
    loadDataFunction,
  }) {
  return (
    <div
      className={"h-100 w-100 p-2"}
      style={{overflowX: "hidden"}}
    >
      <InlineSiteRoleMultiSelectCheckboxFilterInput
        model={userActivityAuditLogFilterModel}
        setModel={setUserActivityAuditLogFilterModel}
        loadDataFunction={loadDataFunction}
        fieldName={"siteRoles"}
      />
      <InlineUserFilterSelectInput
        fieldName={"user"}
        loadDataFunction={loadDataFunction}
        filterModel={userActivityAuditLogFilterModel}
      />
      <InlineAuditLogActionsMutiSelectCheckboxFilter
        model={userActivityAuditLogFilterModel}
        setModel={setUserActivityAuditLogFilterModel}
        loadDataFunction={loadDataFunction}
        fieldName={"actions"}
      />
      <NewInlineDateRangeFilter
        model={userActivityAuditLogFilterModel}
        setModel={setUserActivityAuditLogFilterModel}
        loadDataFunction={loadDataFunction}
        fieldName={"dateRange"}
      />
    </div>
  );
}

UserActivityAuditLogFilterSidebarBase.propTypes = {
  isLoading: PropTypes.bool,
  userActivityAuditLogFilterModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  setUserActivityAuditLogFilterModel: PropTypes.func,
};