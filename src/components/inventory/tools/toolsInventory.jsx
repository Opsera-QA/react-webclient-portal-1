import React, { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";  
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import LoadingDialog from "components/common/loading";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";

import ToolsTable from "./toolsTable";
import NewTool from "./newTool";
import ToolDetails from "./toolDetails";

function ToolInventory () {

  const { getAccessToken } = useContext(AuthContext);
  const [isEditModal, toggleEditModal] = useState(false);
  const [isViewModal, toggleViewModal] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [selectedRowDetail, setRowDetails] = useState({
    id: "",
    details: {}
  });
  const [modalType, setModalType] = useState("new");
  const [toolList, setToolList] = useState([]);
  let history = useHistory();
  const { id, view } = useParams();

  const editTool = (event, cellData) => {
    event.stopPropagation();
    setModalType("edit");
    console.log(cellData);
    setRowDetails({
      id: cellData._id,
      details: cellData
    });
    toggleEditModal(true);
  };

  const deleteTool = async (event, cellData) => {
    event.stopPropagation();
    setRowDetails({
      id: cellData.row.original._id,
      details: cellData.row.values
    });
    getToolRegistryList("");
  };

  const getToolRegistryList = async (id) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      let apiUrl = id ? "/registry/" + id : "/registry/";
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      if(id) {
        setRowDetails({
          id: id,
          details: response.data[0]
        });
        toggleViewModal(true);
      }else {
        //import { format } from "date-fns";
        setToolList(response.data);
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };
    
  useEffect(() => {    
    if(id && id.match(/^[0-9a-fA-F]{24}$/))  setModalType("edit");
    getToolRegistryList(id !=  undefined ? id : "");   
  }, []);

  const handleActionClick = () => {
    setModalType("new");
    setRowDetails({
      id: "",
      details: ""
    });
    toggleEditModal(true);
  };

  const closeModal = (data) => {
    toggleEditModal(false);
    getToolRegistryList(null);
    history.push("/inventory/tools");
  };

  const actionButtons = (cellData) => {
    return(
      <>
        <Button variant="outline-primary" size="sm" className="mr-2" onClick={(e) => { editTool(e, cellData); }} ><FontAwesomeIcon icon={faEdit} fixedWidth/></Button>
        <Button variant="outline-danger" size="sm" className="mr-1" onClick={(e) => { deleteTool(e, cellData); }} ><FontAwesomeIcon icon={faTrash} fixedWidth/></Button>
      </>
    );
  };

  
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
      /* {
        Header: "Contacts",
        accessor: "contacts"
      },
      {
        Header: "Project",
        accessor: "project"
      },
      {
        Header: "Application",
        accessor: "application"
      }, */
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd");
        },
        class: "no-wrap-inline"
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => actionButtons(props.cell.row.original),
        class: "no-wrap"
      }
    ],
    []
  );

  const viewTool = (rowData) => {
    console.log(rowData);
    history.push(`/inventory/tools/${rowData.original._id}`);
    setRowDetails({
      id: rowData._id,
      details: rowData.values
    });
    toggleViewModal(true);
  };

  const closeViewModal = () => {
    toggleViewModal(false);
    history.push("/inventory/tools");
  };

  return (
    <>
      
      {isEditModal && <NewTool showModal={isEditModal} closeModal={(toggleModal) => closeModal(toggleModal)} type={modalType} edittool={selectedRowDetail}/>}

      <ToolDetails showModal={isViewModal} closeModal={(toggleModal) => closeViewModal(toggleModal)} toolId={selectedRowDetail.id}/>

      <div className="mt-2 mb-2 text-right">
        <Button variant="primary" size="sm"  
          onClick={() => { handleActionClick("new"); }}> 
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Entry
        </Button>
        <br />
      </div>

      {isLoading && <LoadingDialog />}

      {!isLoading && <ToolsTable rowInfo={viewTool}  columns={columns} data={toolList} />}
      
    </>
  );  
}


export default ToolInventory;