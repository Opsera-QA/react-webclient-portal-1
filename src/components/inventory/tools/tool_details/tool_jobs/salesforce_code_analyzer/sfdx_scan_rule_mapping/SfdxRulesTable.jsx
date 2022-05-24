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
import sfdxRulesMapMetadata from "./sfdx-mapping-metadata";
import CreateSfdxRulesOverlay from "./CreateSfdxRulesOverlay";

function SfdxRulesTable({
  toolData,
  pmdRules,
  loadData,
  isLoading,
  setSelectedRule,
  toolRules,
}) {
  const toastContext = useContext(DialogToastContext);
  let fields = sfdxRulesMapMetadata.fields;

  const createPmdRule = () => {
    toastContext.showOverlayPanel(
      <CreateSfdxRulesOverlay
        toolData={toolData}
        loadData={loadData}
      />,
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "category")),
    ],
    [],
  );

  const onRowSelect = (grid, row) => {
    const selectedRow = toolRules[row?.index];

    if (selectedRow) {
      const ruleId = selectedRow?._id;
      const parsedModel = modelHelpers.parseObjectIntoModel(
        selectedRow?.configuration,
          sfdxRulesMapMetadata,
      );
      parsedModel?.setData("ruleId", ruleId);
      setSelectedRule({ ...parsedModel });
    }
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={pmdRules}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"SFDX Scan Rules"}
      type={"SFDX Scan Rule"}
      titleIcon={faBrowser}
      addRecordFunction={
        toolData?.data?.configuration ? createPmdRule : undefined
      }
      body={getTable()}
      showBorder={false}
    />
  );
}

SfdxRulesTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  pmdRules: PropTypes.array,
  setSelectedRule: PropTypes.func,
  toolRules: PropTypes.array,
};

export default SfdxRulesTable;
