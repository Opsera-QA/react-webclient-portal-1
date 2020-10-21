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
import DataNotFoundContainer from "../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../common/status_notifications/data_not_found/DataNotFoundDialog";

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

      if (response != null && response.data && response.data[0]) {
        setToolData(new Model(response.data[0], toolMetadata, false));
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  if (!isLoading && toolData == null) {
    return (
      <DataNotFoundContainer type={"Tool"} breadcrumbDestination={"toolDetailView"}>
        <DataNotFoundDialog type={"Tool"} managementViewIcon={faTools} managementViewTitle={"Tool Registry"} managementViewLink={"/inventory/tools"} />
      </DataNotFoundContainer>
    )
  }

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