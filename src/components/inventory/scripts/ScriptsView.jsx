import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import ScriptTable from "components/inventory/scripts/ScriptTable";
import ScriptsEditorPanel from "components/inventory/scripts/details/ScriptsEditorPanel";

function ScriptsView({isLoading, loadData, scriptList, scriptMetadata, scriptRoleDefinitions, scriptFilterModel}) {
  const { getAccessToken } = useContext(AuthContext);
  const [scriptData, setScriptData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getTableView = () => {
    return (
      <ScriptTable
        isLoading={isLoading}
        loadData={loadData}
        data={scriptList}
        scriptMetadata={scriptMetadata}
        scriptRoleDefinitions={scriptRoleDefinitions}
        cancelTokenSource={cancelTokenSource}
        isMounted={isMounted}
        scriptFilterModel={scriptFilterModel}
        getAccessToken={getAccessToken}
        setScriptData={setModel}
        scriptData={scriptData}
      />
    );
  };

  const setModel = (newModel) => {
    const newValue = !newModel || newModel?.isDeleted() ? undefined : {...newModel};

    if (newModel) {
      newValue.setSetStateFunction(setScriptData);
    }

    setScriptData(newValue);
  };

  const getEditorPanel = () => {
    return (
      <ScriptsEditorPanel
        isLoading={isLoading}
        loadData={loadData}
        scriptModel={scriptData}
        setScriptModel={setScriptData}
        scriptModelId={scriptData?.getData("_id")}
        scriptRoleDefinitions={scriptRoleDefinitions}
      />
    );
  };

  return (
    <TableAndDetailPanelContainer detailPanel={getEditorPanel()} table={getTableView()} />
  );
}

ScriptsView.propTypes = {
  scriptList: PropTypes.array,
  isLoading: PropTypes.bool,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  scriptMetadata: PropTypes.object,
  scriptRoleDefinitions: PropTypes.object,
  scriptFilterModel: PropTypes.object
};

export default ScriptsView;