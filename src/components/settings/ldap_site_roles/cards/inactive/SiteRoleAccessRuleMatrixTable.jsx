import React, {useMemo} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import siteRoleAccessMatrixMetadata from "@opsera/definitions/constants/site_roles/siteRoleAccessMatrix.metadata";
import CustomTable from "components/common/table/CustomTable";
import FilterContainer from "components/common/table/FilterContainer";
import {faShieldCross} from "@fortawesome/pro-light-svg-icons";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import securityManagerSiteRoleAccessMatrix
  from "@opsera/know-your-role/roles/site_roles/securityManagerSiteRole.accessMatrix";
import auditorSiteRoleAccessMatrix from "@opsera/know-your-role/roles/site_roles/auditorSiteRole.accessMatrix";

export default function SiteRoleAccessRuleMatrixTable({ siteRole }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const fields = siteRoleAccessMatrixMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "description")),
      getTableBooleanIconColumn(getField(fields, "read")),
      getTableBooleanIconColumn(getField(fields, "write")),
      getTableBooleanIconColumn(getField(fields, "execute")),
    ],
    []
  );

  const getData = () => {
    switch (siteRole) {
      case SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER:
        return securityManagerSiteRoleAccessMatrix;
      case SiteRoleHelper.SITE_ROLES.AUDITOR:
        return auditorSiteRoleAccessMatrix;
    }
  };

  const getTable = () => {
    return (
      <CustomTable
        data={getData()}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      body={getTable()}
      metadata={siteRoleAccessMatrixMetadata}
      titleIcon={faShieldCross}
      title={"Access Role Matrix"}
    />
  );
}

SiteRoleAccessRuleMatrixTable.propTypes = {
  siteRole: PropTypes.string
};
