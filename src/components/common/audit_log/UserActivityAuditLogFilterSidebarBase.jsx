import PropTypes from "prop-types";
import React from "react";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import InlineAuditLogActionsMutiSelectCheckboxFilter
  from "components/common/audit_log/inputs/InlineAuditLogActionsMutiSelectCheckboxFilter";
import InlineSiteRoleMultiSelectCheckboxFilterInput
  from "components/common/list_of_values_input/ldap/site_roles/InlineSiteRoleMultiSelectCheckboxFilterInput";
import InlineDateTimeRangeFilterInput from "components/common/inputs/date/range/pickers/InlineDateTimeRangeFilterInput";

export default function UserActivityAuditLogFilterSidebarBase(
  {
    isLoading,
    userActivityAuditLogFilterModel,
    setUserActivityAuditLogFilterModel,
    loadDataFunction,
  }) {
  return (
    <div
      className={"h-100 w-100 px-2"}
      style={{overflowX: "hidden"}}
    >
      <InlineDateTimeRangeFilterInput
        model={userActivityAuditLogFilterModel}
        setModel={setUserActivityAuditLogFilterModel}
        loadDataFunction={loadDataFunction}
        stacked={true}
        className={"mb-2"}
      />
      <InlineSiteRoleMultiSelectCheckboxFilterInput
        model={userActivityAuditLogFilterModel}
        setModel={setUserActivityAuditLogFilterModel}
        loadDataFunction={loadDataFunction}
        fieldName={"siteRoles"}
        className={"mb-2"}
      />
      <InlineUserFilterSelectInput
        fieldName={"user"}
        loadDataFunction={loadDataFunction}
        filterModel={userActivityAuditLogFilterModel}
        className={"input-container bold-label"}
        inline={false}
      />
      <InlineAuditLogActionsMutiSelectCheckboxFilter
        model={userActivityAuditLogFilterModel}
        setModel={setUserActivityAuditLogFilterModel}
        loadDataFunction={loadDataFunction}
        fieldName={"actions"}
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