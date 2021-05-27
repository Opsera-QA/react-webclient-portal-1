import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  getEditableTextColumn,
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import NewParameterOverlay from "components/inventory/parameters/NewParameterOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";

function ParameterTable({ data, parameterMetadata, loadData, isLoading, onRowSelect, onCellEdit }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    setColumns([]);
    loadColumnMetadata(parameterMetadata);

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(parameterMetadata)]);

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
          getEditableTextColumn(getField(fields, "value")),
          getTableBooleanIconColumn(getField(fields, "vaultEnabled"), undefined, 150),
        ]
      );
    }
  };

  const createParameter = () => {
    toastContext.showOverlayPanel(<NewParameterOverlay parameterMetadata={parameterMetadata} loadData={loadData} isMounted={isMounted} />);
  };

  const getParameterTable = () => {
    return (
      <VanitySelectionTable
        className="table-no-border"
        onRowSelect={onRowSelect}
        noDataMessage={"No Parameters have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading || parameterMetadata == null}
        loadData={loadData}
        tableHeight={"500px"}
        onCellEdit={onCellEdit}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createParameter}
      supportSearch={true}
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
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  parameterMetadata: PropTypes.object,
  onRowSelect: PropTypes.func,
  onCellEdit: PropTypes.func
};

export default ParameterTable;