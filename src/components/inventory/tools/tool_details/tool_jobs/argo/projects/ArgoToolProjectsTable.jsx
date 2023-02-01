import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import argoProjectMetadata from "../argo-project-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateArgoProjectOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/projects/CreateArgoProjectOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function ArgoToolProjectsTable({ toolId, argoProjects, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = argoProjectMetadata.fields;

  const createArgoProject = () => {
    toastContext.showOverlayPanel(
      <CreateArgoProjectOverlay
        toolId={toolId}
        loadData={loadData}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
    ],
    []
  );

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={argoProjects}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Argo Projects"}
      type={"Argo Projects"}
      titleIcon={faBrowser}
      addRecordFunction={createArgoProject}
      body={getTable()}
      showBorder={false}
    />
  );
}

ArgoToolProjectsTable.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  argoProjects: PropTypes.array
};

export default ArgoToolProjectsTable;
