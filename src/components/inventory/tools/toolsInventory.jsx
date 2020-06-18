import React, { useState, useEffect, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";  
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import LoadingDialog from "components/common/loading";
import Modal from "components/common/modal";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";

import ToolsTable from "./toolsTable";
import NewTool from "./newTool/newTool";
import ToolDetails from "./toolDetails/toolDetails"; //tool summary view

import "./tools.css";


function ToolInventory () {
  let history = useHistory();
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const [isEditModal, toggleEditModal] = useState(false);
  const [isViewModal, toggleViewModal] = useState(false);
  const [toolId, setToolId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("new");
  const [toolList, setToolList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {    
    if(id && id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("ID Found? ", id);
      setModalType("view");
      setToolId(id);
      toggleViewModal(true);
    } else {
      //don't need this to run by ID since child componetnts will handle queries
      getToolRegistryList();
      setToolId("");
    }
  }, [id]);


  const handelEditClick = (toolId, toolData) => {
    setModalType("edit");
    setToolId(toolId);
    toggleEditModal(true);
    toggleViewModal(false);
  };

  const handleDeleteClick = (e, cellData) => {
    e.stopPropagation();
    setToolId(cellData._id);
    setShowDeleteModal(true);
  };

  const deleteTool = async () => {
    setShowDeleteModal(false);
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      let apiUrl = "/registry/" + toolId;
      const response = await axiosApiService(accessToken).delete(apiUrl, {});
      console.log(response);
    }
    catch (err) {
      console.log(err.message);
    }
    getToolRegistryList(null);
  };

  const getToolRegistryList = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      let apiUrl = "/registry/";
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      setToolList(response.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };
    
  const viewTool = (rowData) => {
    console.log(rowData);
    history.push(`/inventory/tools/${rowData.original._id}`);
    setToolId(rowData.original._id);
    toggleViewModal(true);
  };

  const handleNewEntryClick = () => {
    setModalType("new");
    setToolId("");
    toggleEditModal(true);
  };

  const closeModal = (val1, saveResponse) => {
    console.log("val1 ", val1);
    console.log("saveResponse ", saveResponse);
    toggleEditModal(false);
    setToolId("");
    if (saveResponse && saveResponse._id) {
      history.push(`/inventory/tools/${saveResponse._id}`);
      setToolId(saveResponse._id);
      toggleViewModal(true);
    } else {
      history.push("/inventory/tools");
      getToolRegistryList();
      toggleViewModal(false);
      toggleEditModal(false);
    }
    
  };

  const actionButtons = (cellData) => {
    return(
      <>
        <Button variant="outline-danger" size="sm" className="mr-1" onClick={(e) => { handleDeleteClick(e, cellData); }} ><FontAwesomeIcon icon={faTrash} fixedWidth/></Button>
      </>
    );
  };

  //TODO: Nobal, Please add default sort as an option here AND the option to hide sorting on a column!
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Tool",
        accessor: "tool_identifier"
      },      
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd");
        },
        class: "no-wrap-inline"
      },
      {
        Header: "",
        accessor: "action",
        Cell: (props) => actionButtons(props.cell.row.original),
        class: "text-center"
      }
    ],
    []
  );


  const closeViewModal = () => {
    toggleViewModal(false);
    history.push("/inventory/tools");
  };

  return (
    <>
      
      {/*Both of these should be doing a lookup of the altest tool data, not using data passed form ehre */}
      <ToolDetails showModal={isViewModal} closeModal={(toggleModal) => closeViewModal(toggleModal)} toolId={toolId} fnEditTool={handelEditClick}/>
      {isEditModal && <NewTool showModal={isEditModal} closeModal={(toggleModal, response) => closeModal(toggleModal, response)} type={modalType} toolId={toolId} />} 
      

      <div className="mt-2 mb-2 text-right">
        <Button variant="primary" size="sm"  
          onClick={() => { handleNewEntryClick("new"); }}> 
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Entry
        </Button>
        <br />
      </div>

      {!isLoading && <ToolsTable rowInfo={viewTool}  columns={columns} data={toolList} />}
      {isLoading && <LoadingDialog size="sm" />}

      {showDeleteModal ? <Modal showModal={showDeleteModal} header="Confirm Tool Delete"
        message="Warning! This may impact running pipelines.  Deleting this record would stop any associated pipelines from running.  Data cannot be recovered once the tool is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => deleteTool()} /> : null}
      
    </>
  );  
}


export default ToolInventory;