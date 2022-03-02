import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import NewScriptOverlay from "components/inventory/scripts/NewScriptOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";
import {AuthContext} from "contexts/AuthContext";
import {
  getOwnerNameField,
  getScriptLanguageColumn,
  getTableTextColumn
} from "components/common/table/column_definitions/model-table-column-definitions";
import VanityDataContainer from "components/common/containers/VanityDataContainer";
import {isActionAllowed} from "components/common/helpers/role-helpers";


function ScriptTable(
  {
    data,
    scriptMetadata,
    setScriptData,
    scriptData,
    loadData,
    isLoading,
    isMounted,
    getAccessToken,
    cancelTokenSource,
    scriptRoleDefinitions,
    scriptFilterModel
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessRoleData } = useContext(AuthContext);
  const [userRoleAccess, setUserRoleAccess] = useState(undefined);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (scriptRoleDefinitions) {
      loadAccessRoleData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [scriptRoleDefinitions]);

  const loadAccessRoleData = async () => {
    const accessRoleData = await getAccessRoleData();

    if (accessRoleData) {
      setUserRoleAccess(accessRoleData);
    }
  };

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(scriptMetadata);
  }, [JSON.stringify(scriptMetadata)]);

  const loadColumnMetadata = (newActivityMetadata) => {
    if (isMounted?.current === true && newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
          getScriptLanguageColumn(getField(fields, "type"), "no-wrap-inline"),
          getOwnerNameField(),
        ]
      );
    }
  };

  const createScript = () => {
    toastContext.showOverlayPanel(
      <NewScriptOverlay
        scriptMetadata={scriptMetadata}
        loadData={loadData}
        isMounted={isMounted}
        getAccessToken={getAccessToken}
        cancelTokenSource={cancelTokenSource}
      />
    );
  };

  const getScriptTable = () => {
    return (
      <VanitySelectionTable
        noDataMessage={"No Scripts have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading || scriptMetadata == null}
        loadData={loadData}
        paginationModel={scriptFilterModel}
        setParentModel={setScriptData}
        tableHeight={"calc(25vh)"}
        parentModel={scriptData}
      />
    );
  };

  const getAddRecordFunction = () => {
    const addAllowed = isActionAllowed(userRoleAccess, "create_script", undefined, undefined, scriptRoleDefinitions);

    if (addAllowed === true) {
      return createScript;
    }
  };

  return (
    <VanityDataContainer
      loadData={loadData}
      addRecordFunction={getAddRecordFunction()}
      paginationModel={scriptFilterModel}
      isLoading={isLoading}
      body={getScriptTable()}
      metadata={scriptMetadata}
      titleIcon={faFileCode}
      title={"Scripts"}
      type={"Script"}
      className={"px-2 pb-2"}
    />
  );
}

ScriptTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  scriptMetadata: PropTypes.object,
  setScriptData: PropTypes.func,
  isMounted: PropTypes.object,
  getAccessToken: PropTypes.func,
  cancelTokenSource: PropTypes.object,
  scriptRoleDefinitions: PropTypes.object,
  scriptFilterModel: PropTypes.object,
  scriptData: PropTypes.object
};

export default ScriptTable;