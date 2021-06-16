import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import ScriptTable from "components/inventory/scripts/ScriptTable";
import ScriptsEditorPanel from "components/inventory/scripts/details/ScriptsEditorPanel";
import ScriptModel from "components/inventory/scripts/script.model";

function ScriptsView({isLoading, loadData, scriptList, setScriptList, scriptMetadata, scriptRoleDefinitions}) {
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
        getAccessToken={getAccessToken}
        getNewModel={getNewModel}
        setScriptData={setModel}
        scriptData={scriptData}
      />
    );
  };

  const setModel = (newModel) => {
    const selectedRecordIndex = scriptList.findIndex((parameter) => { return parameter._id === newModel.getData("_id"); });

    if (selectedRecordIndex !== -1) {
      if (newModel?.isDeleted() === true) {
        scriptList.splice(selectedRecordIndex, 1);
        setScriptList([...scriptList]);
      }
      else {
        scriptList[selectedRecordIndex] = newModel.getPersistData();
        setScriptList([...scriptList]);
      }
    }

    if (!newModel || newModel?.isDeleted()) {
      setScriptData(undefined);
    } else {
      setScriptData({...newModel});
    }
  };

  const getNewModel = (newRowData) => {
    let newModel = {...new ScriptModel({...newRowData}, scriptMetadata, false, setModel, getAccessToken, cancelTokenSource, loadData)};
    setScriptData({...newModel});
    return newModel;
  };

  const getEditorPanel = () => {
    return (
      <ScriptsEditorPanel
        isLoading={isLoading}
        loadData={loadData}
        scriptModel={scriptData}
        scriptMetadata={scriptMetadata}
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
  setScriptList: PropTypes.func,
  scriptRoleDefinitions: PropTypes.object
};

export default ScriptsView;