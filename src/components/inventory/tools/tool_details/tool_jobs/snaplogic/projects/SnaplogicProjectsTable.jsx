import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faBrowser } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  getColumnHeader, getColumnId,
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import modelHelpers from "components/common/model/modelHelpers";
import snaplogicProjectMetadata from "./snaplogic-project-metadata";
import CreateSnaplogicProjectOverlay from "./CreateSnaplogicProjectOverlay";

function SnaplogicProjectsTable({
  toolData,
  projects,
  loadData,
  isLoading,
  setSelectedProj,
  toolProjects,
}) {
  const toastContext = useContext(DialogToastContext);
  let fields = snaplogicProjectMetadata.fields;

  const createPmdRule = () => {
    toastContext.showOverlayPanel(
      <CreateSnaplogicProjectOverlay
        toolData={toolData}
        loadData={loadData}
      />,
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project")),
      getTableTextColumn(getField(fields, "projectSpace")),
    ],
    [],
  );

  const onRowSelect = (grid, row) => {
    const selectedRow = toolProjects[row?.index];

    if (selectedRow) {
      const projectId = selectedRow?._id;
      const parsedModel = modelHelpers.parseObjectIntoModel(
        selectedRow?.configuration,
        snaplogicProjectMetadata,
      );
      parsedModel?.setData("projectId", projectId);
      setSelectedProj({ ...parsedModel });
    }
  };

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={projects}
        // onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Snaplogic Projects"}
      type={"Snaplogic Project"}
      titleIcon={faBrowser}
      addRecordFunction={
        toolData?.data?.configuration ? createPmdRule : undefined
      }
      body={getTable()}
      showBorder={false}
    />
  );
}

SnaplogicProjectsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  projects: PropTypes.array,
  setSelectedProj: PropTypes.func,
  toolProjects: PropTypes.array,
};

export default SnaplogicProjectsTable;
