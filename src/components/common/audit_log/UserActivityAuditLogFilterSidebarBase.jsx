import PropTypes from "prop-types";
import React from "react";
import InlineUserFilterSelectInput from "components/common/filters/ldap/owner/InlineUserFilterSelectInput";
import InlineAuditLogActionsMutiSelectCheckboxFilter
  from "components/common/audit_log/inputs/InlineAuditLogActionsMutiSelectCheckboxFilter";

export default function UserActivityAuditLogFilterSidebarBase(
  {
    isLoading,
    userActivityAuditLogFilterModel,
    setUserActivityAuditLogFilterModel,
    loadDataFunction,
  }) {
  return (
    <div className={"h-100 w-100 p-2"}>
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
    </div>
  );
}

UserActivityAuditLogFilterSidebarBase.propTypes = {
  isLoading: PropTypes.bool,
  userActivityAuditLogFilterModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  setUserActivityAuditLogFilterModel: PropTypes.func,
};