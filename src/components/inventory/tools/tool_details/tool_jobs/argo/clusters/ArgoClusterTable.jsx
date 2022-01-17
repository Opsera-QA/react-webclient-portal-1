import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import argoClusterMetadata from "./argo-cluster-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ArgoClusterOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/ArgoClusterOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function ArgoClusterTable({ toolData, argoClusters, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = argoClusterMetadata.fields;

  const createArgoCluster = () => {
    toastContext.showOverlayPanel(<ArgoClusterOverlay toolData={toolData} loadData={loadData} editMode={false} />);
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
      type={"Argo Clusters"}
      titleIcon={faBrowser}
      addRecordFunction={toolData?.data?.configuration ? createArgoCluster : undefined}
      body={getTable()}
      showBorder={false}
    />
  );
}

ArgoClusterTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  argoClusters: PropTypes.array
};

export default ArgoClusterTable;
