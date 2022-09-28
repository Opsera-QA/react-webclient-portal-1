import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import NewScriptOverlay from "components/inventory/scripts/NewScriptOverlay";
import VanitySelectionTable from "components/common/table/VanitySelectionTable";
import VanityDataContainer from "components/common/containers/VanityDataContainer";
import ScriptLibraryRoleHelper from "@opsera/know-your-role/roles/registry/script_library/scriptLibraryRole.helper";
import scriptsLibraryMetadata from "@opsera/definitions/constants/registry/script_library/scriptsLibrary.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetScriptModel from "components/inventory/scripts/hooks/useGetScriptModel";
import {
  getOwnerNameField,
  getScriptLanguageColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";

function ScriptTable(
  {
    data,
    setScriptModel,
    scriptModel,
    loadData,
    isLoading,
    scriptFilterModel
  }) {
  const fields = scriptsLibraryMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getScriptLanguageColumn(getField(fields, "type"), "no-wrap-inline"),
      getOwnerNameField(),
    ],
    []
  );
  const { getNewScriptModel } = useGetScriptModel();
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const createScript = () => {
    toastContext.showOverlayPanel(
      <NewScriptOverlay
        loadData={loadData}
      />
    );
  };

  const handleRowSelectFunction = (row) => {
    if (row == null) {
      setScriptModel(undefined);
      return;
    }

    const newModel = getNewScriptModel(
      row,
      false,
      setScriptModel,
      loadData,
    );

    setScriptModel({...newModel});
  };

  const getScriptTable = () => {
    return (
      <VanitySelectionTable
        noDataMessage={"No Scripts have been created yet"}
        data={data}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
        paginationModel={scriptFilterModel}
        setParentModel={setScriptModel}
        tableHeight={"calc(25vh)"}
        parentModel={scriptModel}
        handleRowSelectFunction={handleRowSelectFunction}
      />
    );
  };

  const getAddRecordFunction = () => {
    const addAllowed = ScriptLibraryRoleHelper.canCreateScript(userData);

    if (addAllowed === true) {
      return createScript;
    }
  };

  return (
    <VanityDataContainer
      loadData={loadData}
      addRecordFunction={getAddRecordFunction()}
      paginationModel={scriptFilterModel}
      isLoading={isLoading}
      body={getScriptTable()}
      metadata={scriptsLibraryMetadata}
      titleIcon={faFileCode}
      title={"Scripts"}
      type={"Script"}
      className={"px-2 pb-2"}
    />
  );
}

ScriptTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  setScriptModel: PropTypes.func,
  scriptFilterModel: PropTypes.object,
  scriptModel: PropTypes.object
};

export default ScriptTable;