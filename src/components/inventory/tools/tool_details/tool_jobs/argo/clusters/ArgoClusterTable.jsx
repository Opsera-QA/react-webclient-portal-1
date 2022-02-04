import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import argoClusterMetadata from "./argo-cluster-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateArgoClusterOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/CreateArgoClusterOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function ArgoClusterTable(
  {
    toolId,
    argoClusters,
    loadData,
    onRowSelect,
    isLoading,
  }) {
  const toastContext = useContext(DialogToastContext);
  let fields = argoClusterMetadata.fields;

  const createArgoCluster = () => {
    toastContext.showOverlayPanel(
      <CreateArgoClusterOverlay
        toolId={toolId}
        loadData={loadData}
        clusterData={argoClusters}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "server")),
    ],
    []
  );

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={argoClusters}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Argo Clusters"}
      type={"Argo Cluster"}
      titleIcon={faBrowser}
      addRecordFunction={createArgoCluster}
      body={getTable()}
      showBorder={false}
    />
  );
}

ArgoClusterTable.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  argoClusters: PropTypes.array,
};

export default ArgoClusterTable;
