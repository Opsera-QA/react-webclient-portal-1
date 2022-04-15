import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import NewParameterOverlay from "components/inventory/parameters/NewParameterOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";
import {AuthContext} from "contexts/AuthContext";
import {
  getColumnHeader, getColumnId,
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/column_definitions/model-table-column-definitions";
import VanityDataContainer from "components/common/containers/VanityDataContainer";
import {isActionAllowed} from "components/common/helpers/role-helpers";

export const getParameterValueColumn = (field, className, width) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    width: width,
    template: function (text, row) {
      if (row?.getData("vaultEnabled") === true) {
        return "[Encrypted Value]";
      }

      return (row?.getData("value"));
    },
    class: className,
  };
};

function ParameterTable(
  {
    data,
    parameterMetadata,
    setParameterData,
    parameterData,
    loadData,
    isLoading,
    isMounted,
    getAccessToken,
    cancelTokenSource,
    parameterRoleDefinitions,
    parameterFilterModel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessRoleData } = useContext(AuthContext);
  const [userRoleAccess, setUserRoleAccess] = useState(undefined);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (parameterRoleDefinitions) {
      loadAccessRoleData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [parameterRoleDefinitions]);

  const loadAccessRoleData = async () => {
    const accessRoleData = await getAccessRoleData();

    if (accessRoleData) {
      setUserRoleAccess(accessRoleData);
    }
  };

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(parameterMetadata);
  }, [JSON.stringify(parameterMetadata)]);

  const loadColumnMetadata = (newActivityMetadata) => {
    if (isMounted?.current === true && newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name"), "no-wrap-inline", 350),
          getParameterValueColumn(getField(fields, "value")),
          getTableBooleanIconColumn(getField(fields, "vaultEnabled"), undefined, 150),
        ]
      );
    }
  };

  const createParameter = () => {
    toastContext.showOverlayPanel(
      <NewParameterOverlay
        parameterMetadata={parameterMetadata}
        loadData={loadData}
        isMounted={isMounted}
        getAccessToken={getAccessToken}
        cancelTokenSource={cancelTokenSource}
      />
    );
  };

  const getParameterTable = () => {
    return (
      <VanitySelectionTable
        className={"table-no-border"}
        noDataMessage={"No Parameters have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading || parameterMetadata == null}
        loadData={loadData}
        setParentModel={setParameterData}
        paginationModel={parameterFilterModel}
        tableHeight={"calc(25vh)"}
        parentModel={parameterData}
      />
    );
  };

  const getAddRecordFunction = () => {
    const addAllowed = isActionAllowed(userRoleAccess, "create_parameter", undefined, undefined, parameterRoleDefinitions);

    if (addAllowed === true) {
      return createParameter;
    }
  };

  return (
    <VanityDataContainer
      loadData={loadData}
      addRecordFunction={getAddRecordFunction()}
      isLoading={isLoading}
      body={getParameterTable()}
      paginationModel={parameterFilterModel}
      metadata={parameterMetadata}
      titleIcon={faHandshake}
      title={"Parameters"}
      className={"px-2 pb-2"}
    />
  );
}

ParameterTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  parameterMetadata: PropTypes.object,
  setParameterData: PropTypes.func,
  isMounted: PropTypes.object,
  getAccessToken: PropTypes.func,
  cancelTokenSource: PropTypes.object,
  parameterRoleDefinitions: PropTypes.object,
  parameterFilterModel: PropTypes.object,
  parameterData: PropTypes.object
};

export default ParameterTable;