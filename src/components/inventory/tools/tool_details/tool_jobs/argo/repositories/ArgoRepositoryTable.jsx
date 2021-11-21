import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import argoRepositoryMetadata from "../argo-repository-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ArgoRepositoryOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/ArgoRepositoryOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function ArgoRepositoryTable({ toolData, argoRepositories, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = argoRepositoryMetadata.fields;

  const createArgoRepository = () => {
    toastContext.showOverlayPanel(<ArgoRepositoryOverlay toolData={toolData} loadData={loadData} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "service")),
      getTableTextColumn(getField(fields, "repositoryName")),
      getTableTextColumn(getField(fields, "repositoryType")),
    ],
    []
  );

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={argoRepositories}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Argo Repositories"}
      type={"Argo Repositories"}
      titleIcon={faBrowser}
      addRecordFunction={toolData?.data?.configuration ? createArgoRepository : undefined}
      body={getTable()}
      showBorder={false}
    />
  );
}

ArgoRepositoryTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  argoRepositories: PropTypes.array
};

export default ArgoRepositoryTable;
