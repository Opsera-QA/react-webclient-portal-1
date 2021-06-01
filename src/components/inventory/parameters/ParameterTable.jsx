import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
  getEditableTextColumn,
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import NewParameterOverlay from "components/inventory/parameters/NewParameterOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";

function ParameterTable({ data, parameterMetadata, setParameterData, loadData, isLoading, getNewModel, isMounted, getAccessToken, cancelTokenSource }) {
  const toastContext = useContext(DialogToastContext);
  const [columns, setColumns] = useState([]);

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
          getEditableTextColumn(getField(fields, "value")),
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
        className="table-no-border"
        noDataMessage={"No Parameters have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading || parameterMetadata == null}
        loadData={loadData}
        getNewModel={getNewModel}
        setParentModel={setParameterData}
        tableHeight={"calc(25vh)"}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createParameter}
      showBorder={false}
      isLoading={isLoading}
      body={getParameterTable()}
      metadata={parameterMetadata}
      type={"Parameter"}
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
  getNewModel: PropTypes.func,
  setParameterData: PropTypes.func,
  isMounted: PropTypes.object,
  getAccessToken: PropTypes.func,
  cancelTokenSource: PropTypes.object
};

export default ParameterTable;