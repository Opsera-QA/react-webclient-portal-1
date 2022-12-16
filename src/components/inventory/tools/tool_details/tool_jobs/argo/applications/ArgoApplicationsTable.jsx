import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import argoApplicationsMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/applications/argo-application-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateArgoApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/applications/CreateArgoApplicationOverlay";
import {
    getLimitedTableTextColumn,
    getTableBooleanIconColumn,
    getTableDateTimeColumn,
    getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import modelHelpers from "components/common/model/modelHelpers";

function ArgoApplicationsTable(
  {
    toolData,
    argoApplications,
    loadData,
    isLoading,
    setSelectedArgoApplication,
  }) {
  const toastContext = useContext(DialogToastContext);
  let fields = argoApplicationsMetadata.fields;

  const createArgoApplication = () => {
    toastContext.showOverlayPanel(<CreateArgoApplicationOverlay toolData={toolData} loadData={loadData} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "namespace")),
      getTableTextColumn(getField(fields, "clusterName")),
      getLimitedTableTextColumn(getField(fields, "clusterUrl"), 40),
      getTableTextColumn(getField(fields, "path")),
      getTableTextColumn(getField(fields, "syncStatus")),
      getTableTextColumn(getField(fields, "healthStatus")),
      getTableBooleanIconColumn(getField(fields, "autoSync")),
      getTableDateTimeColumn(getField(fields, "creationTimestamp")),
    ],
    []
  );

  const onRowSelect = (grid, row) => {
    if (row) {
      const applicationName = row?.name;
      const parsedModel = modelHelpers.parseObjectIntoModel(row, argoApplicationsMetadata);
      parsedModel?.setData("name", applicationName);
      setSelectedArgoApplication({...parsedModel});
    }
  };

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
  argoApplications: PropTypes.array,
  setSelectedArgoApplication: PropTypes.func,
};

export default ArgoApplicationsTable;
