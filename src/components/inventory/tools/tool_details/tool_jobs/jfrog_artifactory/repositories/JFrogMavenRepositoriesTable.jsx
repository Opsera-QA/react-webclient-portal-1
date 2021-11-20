import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import NewJFrogMavenRepositoryModal from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/NewJFrogMavenRepositoryModal";
import jfrogMavenRepositoryMetadata from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jfrog-maven-repository-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {faAbacus} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

function JFrogMavenRepositoriesTable(
  {
    jfrogArtifactoryMavenRepositories,
    toolData,
    loadData,
    isLoading,
  }) {
  const fields = jfrogMavenRepositoryMetadata.fields;
  const [showCreateRepoModal, setShowCreateRepoModal] = useState(false);
  const [editRepoObj, setEditRepoObj] = useState({});
  const [editMode, setEditMode] = useState(false);

  const createJFrogMavenRepository = () => {
    setShowCreateRepoModal(true);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "key")),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "url"))
    ],
    []
  );

  const onRowSelect = (rowData) => {    
    let newDataObject = rowData?.original;
    setEditRepoObj(newDataObject);
    setEditMode(true);    
    setShowCreateRepoModal(true);
  };

  const getJfrogArtifactoryMavenRepositoriesTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={jfrogArtifactoryMavenRepositories}
        loadData={loadData}
        createNewRecord={createJFrogMavenRepository}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <div>
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
      <NewJFrogMavenRepositoryModal 
        toolData={toolData} 
        loadData={loadData} 
        setShowModal={setShowCreateRepoModal} 
        showModal={showCreateRepoModal} 
        jfrogRepositories={jfrogArtifactoryMavenRepositories}
        editRepoObj={editRepoObj}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}

JFrogMavenRepositoriesTable.propTypes = {
  jfrogArtifactoryMavenRepositories: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolData: PropTypes.object,
};

export default JFrogMavenRepositoriesTable;
