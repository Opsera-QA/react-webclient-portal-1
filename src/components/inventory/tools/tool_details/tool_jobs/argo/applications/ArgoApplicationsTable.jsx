import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import argoApplicationsMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/applications/argo-application-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ArgoApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/ArgoApplicationOverlay";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function ArgoApplicationsTable({ toolData, argoApplications, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = argoApplicationsMetadata.fields;

  const createArgoApplication = () => {
    toastContext.showOverlayPanel(<ArgoApplicationOverlay toolData={toolData} loadData={loadData} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "applicationName")),
      getTableTextColumn(getField(fields, "cluster")),
      getTableTextColumn(getField(fields, "gitPath")),
      getTableBooleanIconColumn(getField(fields, "active"))
    ],
    []
  );

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={argoApplications}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Argo Applications"}
      type={"Argo Application"}
      titleIcon={faBrowser}
      addRecordFunction={toolData?.data?.configuration ? createArgoApplication : undefined}
      body={getTable()}
      showBorder={false}
    />
  );
}

ArgoApplicationsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  argoApplications: PropTypes.array
};

export default ArgoApplicationsTable;
