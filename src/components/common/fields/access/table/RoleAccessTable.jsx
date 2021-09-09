import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {parseRoleDefinitionsIntoTableRows} from "components/common/helpers/role-helpers";
import roleDefinitionMetadata from "components/common/fields/access/table/role-definition-metadata";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";

function RoleAccessTableBase({ roleAccessDefinitions, loadData, isLoading }) {
  const { getAccessRoleData } = useContext(AuthContext);
  const fields = roleDefinitionMetadata?.fields;
  const [userRoleAccess, setUserRoleAccess] = useState(undefined);
  const [accessRoles, setAccessRoles] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;


    if (roleAccessDefinitions) {
      loadAccessRoleData(roleAccessDefinitions).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [roleAccessDefinitions]);

  const loadAccessRoleData = async (roleAccessDefinitions) => {
    const accessRoleData = await getAccessRoleData();

    if (accessRoleData) {
      setUserRoleAccess(accessRoleData);
      setAccessRoles([...parseRoleDefinitionsIntoTableRows(roleAccessDefinitions, accessRoleData)]);
    }
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "description")),
      getTableBooleanIconColumn(getField(fields, "administrator"), undefined, 130),
      getTableBooleanIconColumn(getField(fields, "owner"), undefined, 60),
      getTableBooleanIconColumn(getField(fields, "manager"), undefined, 75),
      getTableBooleanIconColumn(getField(fields, "power_user"), undefined, 90),
      getTableBooleanIconColumn(getField(fields, "user"), undefined, 45),
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
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getRoleDefinitionTable()}
      metadata={roleDefinitionMetadata}
      titleIcon={faHandshake}
      title={"Role Access"}
      showBorder={false}
    />
  );
}

RoleAccessTableBase.propTypes = {
  roleAccessDefinitions: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  roleAccessMetadata: PropTypes.object,
};

export default RoleAccessTableBase;