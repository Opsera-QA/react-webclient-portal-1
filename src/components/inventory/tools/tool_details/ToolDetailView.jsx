import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import ToolSummaryPanel from "./ToolSummaryPanel";
import inventoryActions from "../../inventory-actions";
import toolMetadata from "../tool-metadata";
import ToolDetailPanel from "./ToolDetailPanel";
import {faTools} from "@fortawesome/pro-solid-svg-icons";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function ToolDetailView() {
  const { id } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [toolData, setToolData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getTool();
  }, []);

  const getTool = async () => {
    try {
      setIsLoading(true);
      const response = await inventoryActions.getToolById(id, getAccessToken);
      setToolData(new Model(...response.data, toolMetadata, false));
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

    return (
      <DetailViewContainer
        breadcrumbDestination={"toolDetailView"}
        title={toolData != null ? `Tool Details [${toolData["name"]}]` : undefined}
        titleIcon={faTools}
        isLoading={isLoading}
        summaryPanel={<ToolSummaryPanel toolData={toolData} setToolData={setToolData}/>}
        detailPanel={<ToolDetailPanel toolData={toolData} isLoading={isLoading} setToolData={setToolData} loadData={getTool}/>}
      />
    );
}

export default ToolDetailView;