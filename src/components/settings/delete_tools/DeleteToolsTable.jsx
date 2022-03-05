import React, { useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ToolMetadata from "components/settings/delete_tools/tool-metadata";
import {
  getTableDateColumn,
  getTableTextColumn,
  getDeletePlatformToolTableButtonColumn,
} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import { getField } from "components/common/metadata/metadata-helpers";
import DestructiveDeleteModal from "components/common/modal/DestructiveDeleteModal";
import Model from "../../../core/data_model/model";
import CustomTable from "components/common/table/CustomTable";
import deleteToolsActions from "components/settings/delete_tools/settings-delete-tools-action.js";
import ToolPipelinesTable from 'components/inventory/tools/tool_details/ToolPipelinesTable';
import DeleteToolDependenciesView from './DeleteToolDependenciesView';

function DeleteToolsTable({ data, loadData, isLoading, className }) {
    
  let fields = ToolMetadata.fields;
  
  const toastContext = useContext(DialogToastContext);
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [confirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(undefined);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setShowConfirmationModal(false);
    setLoading(false);
    setSelectedTool(undefined);
  }, [data]);

  const toggleDeleteModal = async (dataObject) => {
    setSelectedTool(
        new Model(dataObject, ToolMetadata, false)
      );
    setShowConfirmationModal(true);
  };

  const deleteTool = async () => {
    //   console.log("delete tool ",selectedTool.getData("_id") );
    try {
      let result = await deleteToolsActions.deleteToolV2(getAccessToken, selectedTool);

      if (result) {
        if (result?.error == null) {
            await loadData();
            toastContext.showSuccessDialog("Deletion in Progress, It may take few minutes to complete the process");
        }
        else
        {
          toastContext.showDeleteFailureResultDialog(selectedTool.getType(), result.error);
        }
      }
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(selectedTool.getType());
    } finally {
        setShowConfirmationModal(false);
    }
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "toolStatus")),
      getTableTextColumn(getField(fields, "toolURL")),
      getTableDateColumn(getField(fields, "installationDate")),
      getDeletePlatformToolTableButtonColumn("row", "", "danger", "Delete", toggleDeleteModal),
    ],
    []
  );

    return (
        <>
            <CustomTable
            isLoading={isLoading}
            data={data}
            columns={columns}
            // loadData={loadData}
            />
            {selectedTool &&
                <DestructiveDeleteModal deleteDetails={<DeleteToolDependenciesView selectedTool={selectedTool}/>} showModal={confirmationModal} setShowModal={setShowConfirmationModal} dataObject={selectedTool} handleDelete={deleteTool} modalSize={"lg"}/>
            }
        </>
    );
}

DeleteToolsTable.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    loadData: PropTypes.func,
    className: PropTypes.string,
};

export default DeleteToolsTable;

