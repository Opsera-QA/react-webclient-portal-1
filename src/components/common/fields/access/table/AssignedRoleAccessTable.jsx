import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {parseRoleDefinitionsIntoRbacTableRows} from "components/common/helpers/role-helpers";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";
import {accessRoleDefinitionMetadata} from "components/common/fields/access/table/accessRoleDefinition.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AssignedRoleAccessTable({ roleAccessDefinitions, isLoading }) {
  const [accessRoles, setAccessRoles] = useState([]);
  const fields = accessRoleDefinitionMetadata?.fields;
  const {
    accessRoleData,
    isSaasUser,
  } = useComponentStateReference();

  useEffect(() => {
    setAccessRoles([]);
    if (isSaasUser === false && roleAccessDefinitions && accessRoleData) {
      const tableRows = DataParsingHelper.parseArray(parseRoleDefinitionsIntoRbacTableRows(roleAccessDefinitions, accessRoleData), []);
      setAccessRoles([...tableRows]);
    }
  }, [roleAccessDefinitions]);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "description")),
      getTableBooleanIconColumn(getField(fields, "administrator"), undefined, 130),
      getTableBooleanIconColumn(getField(fields, "owner"), undefined, 60),
      getTableBooleanIconColumn(getField(fields, "manager"), undefined, 75),
      getTableBooleanIconColumn(getField(fields, "user"), undefined, 45),
      getTableBooleanIconColumn(getField(fields, "guest"), undefined, 45),
      getTableBooleanIconColumn(getField(fields, "no_access_rules"), undefined, 165),
    ],
    []
  );

  const getRoleDefinitionTable = () => {
    return (
      <CustomTable
        data={accessRoles}
        columns={columns}
        isLoading={isLoading}
      />
    );
  };

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <FilterContainer
      isLoading={isLoading}
      body={getRoleDefinitionTable()}
      metadata={accessRoleDefinitionMetadata}
      titleIcon={faHandshake}
      title={"Assigned Role Access"}
    />
  );
}

AssignedRoleAccessTable.propTypes = {
  roleAccessDefinitions: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  roleAccessMetadata: PropTypes.object,
};

export default AssignedRoleAccessTable;