import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faServer} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {
  parseRoleDefinitionsIntoSiteRoleTableRows
} from "components/common/helpers/role-helpers";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";
import {siteRoleDefinitionMetadata} from "components/common/fields/access/table/siteRoleDefinition.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function SiteRoleAccessTable({ roleAccessDefinitions, loadData, isLoading }) {
  const fields = siteRoleDefinitionMetadata?.fields;
  const {
    isSaasUser,
  } = useComponentStateReference();
  const tableRows = DataParsingHelper.parseArray(parseRoleDefinitionsIntoSiteRoleTableRows(roleAccessDefinitions), []);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "description")),
      getTableBooleanIconColumn(getField(fields, "administrator"), undefined, 130),
      getTableBooleanIconColumn(getField(fields, "power_user"), undefined, 90),
      getTableBooleanIconColumn(getField(fields, "user"), undefined, 45),
      getTableBooleanIconColumn(getField(fields, "no_access_rules"), undefined, 165),
    ],
    [fields]
  );

  const getRoleDefinitionTable = () => {
    return (
      <CustomTable
        data={tableRows}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getRoleDefinitionTable()}
      metadata={siteRoleDefinitionMetadata}
      titleIcon={faServer}
      title={"Site Role Access"}
      showBorder={false}
    />
  );
}

SiteRoleAccessTable.propTypes = {
  roleAccessDefinitions: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  roleAccessMetadata: PropTypes.object,
};

export default SiteRoleAccessTable;