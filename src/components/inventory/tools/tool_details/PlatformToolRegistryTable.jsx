import React, {useState, useContext, useMemo, useRef, useEffect} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import {getTableTextColumn, getTableButtonColumn, getTableDateColumn, getTagColumn } from "components/common/table/table-column-helpers";
import Model from "core/data_model/model";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolRegMetadata from "components/settings/delete_tools/tool-reg-metadata";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function PlatformToolRegistryTable({ data, isLoading, reLoadData, setIsLoading, setData }) {
  const { getAccessToken } = useContext(AuthContext);
  const fields = pipelineSummaryMetadata.fields;
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const deleteToolRegistry = async(dataObject) => {
    try {
      setIsLoading(true);
      setData([]);
      let registryDTO = new Model(dataObject, ToolRegMetadata, false);

      let vaultDeleteResponse = await toolsActions.deleteOwnerVaultRecordsForToolId(registryDTO, getAccessToken);
      if (vaultDeleteResponse.status !== 200) {
        const errorMsg = `Error reported by services while deleting tool information from Vault. Please try again`;
        toastContext.showErrorDialog(errorMsg);
        return;
      }
      let result = await toolsActions.deleteToolV2(getAccessToken, cancelTokenSource, registryDTO);
      toastContext.showDeleteSuccessResultDialog("Tool registry record");
      console.log(result);
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog("Tool registry record");
      console.error(error);
    }
    finally {
      await reLoadData();
      setIsLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      // getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "tool_identifier";})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt";})),
      getTableButtonColumn("row", "", "danger", "Delete", deleteToolRegistry),
    ],
    []
  );

  return (
    <CustomTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      noDataMessage={"This tool is not used by any tool registry."}
    />
  );
}

PlatformToolRegistryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  reLoadData: PropTypes.func,
  setData: PropTypes.func
};

export default PlatformToolRegistryTable;
