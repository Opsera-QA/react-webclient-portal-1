import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  getScriptLanguageColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import NewScriptOverlay from "components/inventory/scripts/NewScriptOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import {AuthContext} from "contexts/AuthContext";


function ScriptTable({ data, scriptMetadata, setScriptData, scriptData, loadData, isLoading, getNewModel, isMounted, getAccessToken, cancelTokenSource, scriptRoleDefinitions }) {
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
        scriptRoleDefinitions={scriptRoleDefinitions}
      />
    );
  };

  const getScriptTable = () => {
    return (
      <VanitySelectionTable
        className="table-no-border"
        noDataMessage={"No Scripts have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading || scriptMetadata == null}
        loadData={loadData}
        getNewModel={getNewModel}
        setParentModel={setScriptData}
        tableHeight={"calc(25vh)"}
        parentModel={scriptData}
      />
    );
  };

  const getAddRecordFunction = () => {
    const addAllowed = workflowAuthorizedActions.isActionAllowed(userRoleAccess, "create_script", undefined, undefined, scriptRoleDefinitions);

    if (addAllowed === true) {
      return createScript;
    }
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={getAddRecordFunction()}
      showBorder={false}
      isLoading={isLoading}
      body={getScriptTable()}
      metadata={scriptMetadata}
      type={"Script"}
      titleIcon={faFileCode}
      title={"Scripts"}
      className={"px-2 pb-2"}
    />
  );
}

ScriptTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  scriptMetadata: PropTypes.object,
  getNewModel: PropTypes.func,
  setScriptData: PropTypes.func,
  isMounted: PropTypes.object,
  getAccessToken: PropTypes.func,
  cancelTokenSource: PropTypes.object,
  scriptRoleDefinitions: PropTypes.object,
  scriptData: PropTypes.object
};

export default ScriptTable;