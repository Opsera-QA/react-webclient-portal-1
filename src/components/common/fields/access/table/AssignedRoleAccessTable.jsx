import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {parseRoleDefinitionsIntoRbacTableRows} from "components/common/helpers/role-helpers";
import roleDefinitionMetadata from "components/common/fields/access/table/role-definition-metadata";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";

function AssignedRoleAccessTable({ roleAccessDefinitions, loadData, isLoading }) {
  const { getAccessRoleData, isSassUser } = useContext(AuthContext);
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
      setAccessRoles([...parseRoleDefinitionsIntoRbacTableRows(roleAccessDefinitions, accessRoleData)]);
    }
  };

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
        loadData={loadData}
      />
    );
  };

  if (isSassUser() === true) {
    return null;
  }

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getRoleDefinitionTable()}
      metadata={roleDefinitionMetadata}
      titleIcon={faHandshake}
      title={"Assigned Role Access"}
      showBorder={false}
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