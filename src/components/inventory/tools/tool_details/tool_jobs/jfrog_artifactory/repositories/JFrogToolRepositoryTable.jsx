import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import CreateJFrogRepositoryOverlay from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/CreateJFrogRepositoryOverlay";
import jfrogMavenRepositoryMetadata from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jfrogMavenRepository.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {faAbacus} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import modelHelpers from "components/common/model/modelHelpers";

function JFrogToolRepositoryTable(
  {
    jfrogArtifactoryMavenRepositories,
    toolId,
    loadData,
    isLoading,
    isMounted,
    setJfrogRepositoryModel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const fields = jfrogMavenRepositoryMetadata.fields;

  const createJFrogMavenRepository = () => {
    toastContext.showOverlayPanel(
      <CreateJFrogRepositoryOverlay
        toolId={toolId}
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "key")),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "packageType")),
      getTableTextColumn(getField(fields, "url"))
    ],
    []
  );

  const onRowSelect = (rowData) => {
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, jfrogMavenRepositoryMetadata);
    setJfrogRepositoryModel({...parsedModel});
  };

  const getJfrogArtifactoryMavenRepositoriesTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={jfrogArtifactoryMavenRepositories}
        loadData={loadData}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      addRecordFunction={createJFrogMavenRepository}
      body={getJfrogArtifactoryMavenRepositoriesTable()}
      isLoading={isLoading}
      metadata={jfrogMavenRepositoryMetadata}
      titleIcon={faAbacus}
      title={"JFrog Maven Repositories"}
      type={"JFrog Maven Repository"}
    />
  );
}

JFrogToolRepositoryTable.propTypes = {
  jfrogArtifactoryMavenRepositories: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolId: PropTypes.string,
  isMounted: PropTypes.object,
  setJfrogRepositoryModel: PropTypes.func,
};

export default JFrogToolRepositoryTable;
