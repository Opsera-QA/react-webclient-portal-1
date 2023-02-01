import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import argoRepositoryMetadata from "../argo-repository-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateArgoToolRepositoryOverlay
  from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/CreateArgoToolRepositoryOverlay";
import {getTableTextColumn, getArgoConnectionStatus} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function ArgoToolRepositoriesTable({ toolId, argoRepositories, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = argoRepositoryMetadata.fields;

  const createArgoRepository = () => {
    toastContext.showOverlayPanel(<CreateArgoToolRepositoryOverlay toolId={toolId} loadData={loadData} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), null, 300),
      getTableTextColumn(getField(fields, "type"), null, 140),
      getTableTextColumn(getField(fields, "repo")),
      getTableTextColumn(getField(fields, "project"), null, 200),
      getArgoConnectionStatus(getField(fields, "connectionState")),
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
      addRecordFunction={createArgoRepository}
      body={getTable()}
      showBorder={false}
    />
  );
}

ArgoToolRepositoriesTable.propTypes = {
  toolId: PropTypes.string,  
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  argoRepositories: PropTypes.array
};

export default ArgoToolRepositoriesTable;
