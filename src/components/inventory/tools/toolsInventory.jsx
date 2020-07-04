import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import Modal from "components/common/modal";
import { AuthContext } from "contexts/AuthContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import ToolDetails from "./toolDetails/toolDetails"; //tool summary view
import "./tools.css";
import ToolsTable from "./toolsTable";

function ToolInventory () {
  let history = useHistory();
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [isViewModal, toggleViewModal] = useState(false);
  const [toolId, setToolId] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [toolList, setToolList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {    
    if(id && id.match(/^[0-9a-fA-F]{24}$/)) {
      setToolId(id);
      toggleViewModal(true);
    } else {
      getToolRegistryList();
      setToolId("");
    }
  }, [id]);


  const handleEditClick = (toolId) => {
    setToolId(toolId);
  };

  const handleDeleteClick = (toolId) => {
    setToolId(toolId);
    setShowDeleteModal(true);
  };

  const deleteTool = async () => {
    setShowDeleteModal(false);
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      let apiUrl = "/registry/" + toolId;
      await axiosApiService(accessToken).delete(apiUrl, {});
      toggleViewModal(false);
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
    getToolRegistryList(null);
  };

  const getToolRegistryList = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      // sort by name ascending &sort=name&order=1
      const params = {
        sort: "name",
        order: 1
      };

      let apiUrl = "/registry?hidden=true";
      const response = await axiosApiService(accessToken).get(apiUrl, params);
      setToolList(response.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };
    
  const viewTool = (rowData) => {
    history.push(`/inventory/tools/${rowData.original._id}`);
    setToolId(rowData.original._id);
    toggleViewModal(true);
  };

  const handleNewEntryClick = () => {
    setToolId("");
    toggleViewModal(true);
  };


  const closeViewModal = () => {
    toggleViewModal(false);
    history.push("/inventory/tools");
  };

  return (
    <>
      <ToolDetails showModal={isViewModal} closeModal={(toggleModal) => closeViewModal(toggleModal)} toolId={toolId} fnEditTool={handleEditClick} fnDeleteTool={handleDeleteClick} setToolId={setToolId}/>
      
      {/* TODO: Refactor to be more like edit modal above */}
      {showDeleteModal ? <Modal showModal={showDeleteModal} header="Confirm Tool Delete"
        message="Warning! This may impact running pipelines.  Deleting this record would stop any associated pipelines from running.  Data cannot be recovered once the tool is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteTool()} /> : null}

      <div className="mb-2 text-right">
        <Button size="sm" variant="primary"   
          onClick={() => { handleNewEntryClick("new"); }}> 
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Entry
        </Button>        
      </div>
      {isLoading && <LoadingDialog />}
      {errors && <div className="error-text">Error Reported: {errors}</div>}
      
      {toolList && <ToolsTable rowInfo={viewTool} data={toolList} />}
      
    </>
  );  
}


export default ToolInventory;