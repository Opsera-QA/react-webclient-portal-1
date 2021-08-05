import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import {
  getEditableTextColumn, getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/column_definitions/model-table-column-definitions";
import VanityTable from "components/common/table/VanityTable";
import FilterContainer from "components/common/table/FilterContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";

function RoleAccessTableBase({ roleAccessDefinitions, roleAccessMetadata, loadData, isLoading }) {
  const { getAccessRoleData } = useContext(AuthContext);
  const [columns, setColumns] = useState([]);
  const [userRoleAccess, setUserRoleAccess] = useState(undefined);
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
      loadAccessRoleData().catch((error) => {
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

  const loadAccessRoleData = async () => {
    const accessRoleData = await getAccessRoleData();

    if (accessRoleData) {
      setUserRoleAccess(accessRoleData);
    }
  };

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(roleAccessMetadata);
  }, [JSON.stringify(roleAccessMetadata)]);

  const loadColumnMetadata = (newActivityMetadata) => {
    if (roleAccessMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name"), "no-wrap-inline", 350),
          getEditableTextColumn(getField(fields, "value")),
          getTableBooleanIconColumn(getField(fields, "vaultEnabled"), undefined, 150),
        ]
      );
    }
  };

  const getParameterTable = () => {
    return (
      <VanityTable
        data={roleAccessDefinitions}
        columns={columns}
        isLoading={isLoading || roleAccessMetadata == null}
        loadData={loadData}
        tableHeight={"calc(25vh)"}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getParameterTable()}
      metadata={roleAccessMetadata}
      titleIcon={faHandshake}
      title={"Role Access"}
      className={"px-2 pb-2"}
    />
  );
}

RoleAccessTableBase.propTypes = {
  roleAccessDefinitions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  roleAccessMetadata: PropTypes.object,
};

export default RoleAccessTableBase;