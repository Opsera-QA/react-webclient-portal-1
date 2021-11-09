import React, {useMemo, useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import NewJFrogMavenRepositoryModal from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/NewJFrogMavenRepositoryModal";
import jfrogMavenRepositoryMetadata from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/jfrog-maven-repository-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import jfrogActions from "./jfrog-actions";
function JFrogMavenRepositoriesTable({ toolData, isLoading }) {
  
  const { getAccessToken } = useContext(AuthContext);
  const fields = jfrogMavenRepositoryMetadata.fields;
  const [showCreateRepoModal, setShowCreateRepoModal] = useState(false);
  const [jfrogMavenRepos, setJfrogMavenRepos] = useState([]);
  const [editRepoObj, setEditRepoObj] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(undefined);
  const [isRepoLoading, setIsRepoLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect (() => {
    if(cancelTokenSource){
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsRepoLoading(true);
      const response = await jfrogActions.getRepos(toolData.getData("_id"), "allMaven", getAccessToken, cancelSource);

      if(response.status === 200) {
        setJfrogMavenRepos(response.data);
      }

    } catch (error) {
      if(isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if(isMounted?.current === true) {
        setIsRepoLoading(false);
      }      
    }
  };

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
    let newDataObject = jfrogMavenRepos[rowData.index];
    setEditRepoObj(newDataObject);
    setEditMode(true);    
    setShowCreateRepoModal(true);
  };


  return (
    <div>
      <CustomTable
        columns={columns}
        data={jfrogMavenRepos}
        loadData={loadData}
        createNewRecord={createJFrogMavenRepository}
        tableTitle={"JFrog Repositories"}
        type={"JFrog Repository"}
        onRowSelect={onRowSelect}
        isLoading={isRepoLoading}
      />
      <NewJFrogMavenRepositoryModal 
        toolData={toolData} 
        loadData={loadData} 
        setShowModal={setShowCreateRepoModal} 
        showModal={showCreateRepoModal} 
        jfrogRepositories={jfrogMavenRepos}
        editRepoObj={editRepoObj}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}

JFrogMavenRepositoriesTable.propTypes = {
  toolData: PropTypes.object,  
  selectRowFunction: PropTypes.func,
  isLoading: PropTypes.bool
};

export default JFrogMavenRepositoriesTable;
