import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ParameterTable from "components/inventory/parameters/ParameterTable";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";

function ParametersView({isLoading, loadData, parameterList, parameterMetadata, parameterRoleDefinitions}) {
  const { getAccessToken } = useContext(AuthContext);
  const [parameterData, setParameterData] = useState(undefined);
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
      <ParameterTable
        isLoading={isLoading}
        loadData={loadData}
        data={parameterList}
        parameterMetadata={parameterMetadata}
        parameterRoleDefinitions={parameterRoleDefinitions}
        cancelTokenSource={cancelTokenSource}
        isMounted={isMounted}
        getAccessToken={getAccessToken}
        setParameterData={setModel}
        parameterData={parameterData}
      />
    );
  };

  const setModel = (newModel) => {
    const newValue = !newModel || newModel?.isDeleted() ? undefined : {...newModel};

    if (newModel) {
      newValue.setSetStateFunction(setParameterData);
    }

    setParameterData(newValue);
  };

  const getEditorPanel = () => {
    return (
      <ParametersEditorPanel
        isLoading={isLoading}
        loadData={loadData}
        parameterModelId={parameterData?.getData("_id")}
        parameterModel={parameterData}
        setParameterModel={setParameterData}
        parameterRoleDefinitions={parameterRoleDefinitions}
      />
    );
  };

  return (
    <TableAndDetailPanelContainer detailPanel={getEditorPanel()} table={getTableView()} />
  );
}

ParametersView.propTypes = {
  parameterList: PropTypes.array,
  isLoading: PropTypes.bool,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  parameterMetadata: PropTypes.object,
  setParameterList: PropTypes.func,
  parameterRoleDefinitions: PropTypes.object
};

export default ParametersView;