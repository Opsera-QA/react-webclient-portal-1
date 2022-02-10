import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ParameterTable from "components/inventory/parameters/ParameterTable";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";

function ParametersView({isLoading, loadData, parameterList, parameterMetadata, parameterRoleDefinitions, parameterFilterModel}) {
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
        parameterFilterModel={parameterFilterModel}
        cancelTokenSource={cancelTokenSource}
        isMounted={isMounted}
        getAccessToken={getAccessToken}
        setParameterData={setParameterData}
        parameterData={parameterData}
      />
    );
  };

  const getEditorPanel = () => {
    return (
      <ParametersEditorPanel
        isLoading={isLoading}
        loadData={loadData}
        parameterModelId={parameterData?.getData("_id")}
        parameterModel={parameterData}
        setParameterModel={setParameterData}
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
  loadData: PropTypes.func,
  parameterMetadata: PropTypes.object,
  parameterFilterModel: PropTypes.object,
  parameterRoleDefinitions: PropTypes.object
};

export default ParametersView;