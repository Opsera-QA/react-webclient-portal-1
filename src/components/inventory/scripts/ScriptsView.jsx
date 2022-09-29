import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import ScriptTable from "components/inventory/scripts/ScriptTable";
import ScriptsEditorPanel from "components/inventory/scripts/details/ScriptsEditorPanel";

function ScriptsView(
  {
    isLoading,
    loadData,
    scriptList,
    scriptFilterModel,
    scriptModel,
    setScriptModel,
  }) {
  const getTableView = () => {
    return (
      <ScriptTable
        isLoading={isLoading}
        loadData={loadData}
        data={scriptList}
        scriptFilterModel={scriptFilterModel}
        setScriptModel={setScriptModel}
        scriptModel={scriptModel}
      />
    );
  };

  const getEditorPanel = () => {
    return (
      <ScriptsEditorPanel
        isLoading={isLoading}
        loadData={loadData}
        scriptModel={scriptModel}
        setScriptModel={setScriptModel}
      />
    );
  };

  return (
    <TableAndDetailPanelContainer
      detailPanel={getEditorPanel()}
      table={getTableView()}
    />
  );
}

ScriptsView.propTypes = {
  scriptList: PropTypes.array,
  isLoading: PropTypes.bool,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  scriptFilterModel: PropTypes.object,
  scriptModel: PropTypes.object,
  setScriptModel: PropTypes.func,
};

export default ScriptsView;