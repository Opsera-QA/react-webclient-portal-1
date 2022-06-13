import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faBrowser } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcDataTransformerRulesMapMetadata from "./sfdc-data-transformer-rules-mapping-metadata";
import CreateSfdcDataTransformerRulesOverlay from "./CreateSfdcDataTransformerRulesOverlay";

function SfdcDataTransformerRulesTable({
  toolData,
  dataTransformerRules,
  loadData,
  isLoading,
  setSelectedRule,
  toolRules,
}) {
  const toastContext = useContext(DialogToastContext);
  let fields = sfdcDataTransformerRulesMapMetadata.fields;

  const createDataTransformerRule = () => {
    toastContext.showOverlayPanel(
      <CreateSfdcDataTransformerRulesOverlay
        toolData={toolData}
        loadData={loadData}
      />,
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "operation")),
      getTableTextColumn(getField(fields, "componentType")),
    ],
    [],
  );

  const onRowSelect = (grid, row) => {
    const selectedRow = toolRules[row?.index];

    if (selectedRow) {
      const ruleId = selectedRow?._id;
      const parsedModel = modelHelpers.parseObjectIntoModel(
        selectedRow?.configuration,
          sfdcDataTransformerRulesMapMetadata,
      );
      parsedModel?.setData("ruleId", ruleId);
      setSelectedRule({ ...parsedModel });
    }
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={dataTransformerRules}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"SFDC Data Transformer Rules"}
      type={"SFDC Data Transformer Rules"}
      titleIcon={faBrowser}
      addRecordFunction={
        toolData?.data?.configuration ? createDataTransformerRule : undefined
      }
      body={getTable()}
      showBorder={false}
    />
  );
}

SfdcDataTransformerRulesTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  dataTransformerRules: PropTypes.array,
  setSelectedRule: PropTypes.func,
  toolRules: PropTypes.array,
};

export default SfdcDataTransformerRulesTable;
