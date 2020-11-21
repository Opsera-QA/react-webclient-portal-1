import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import ToolSummaryPanel from "./ToolSummaryPanel";
import inventoryActions from "../../inventory-actions";
import toolMetadata from "../tool-metadata";
import ToolDetailPanel from "./ToolDetailPanel";
import {faTools} from "@fortawesome/pro-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import {axiosApiService} from "../../../../api/apiService";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";
import ActionBarToggleButton from "../../../common/actions/buttons/ActionBarToggleButton";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";

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
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const toggleToolType = async () => {
    if(toolData.isModelValid()) {
      try {
        const accessToken = await getAccessToken();
        let newToolData = toolData.getPersistData();
        newToolData["active"] = !newToolData["active"];
        let response = await axiosApiService(accessToken).post(`/registry/${newToolData._id}/update`, newToolData);
        let updatedDto = new Model(response.data, toolData.metaData, false);
        setToolData(updatedDto);
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/inventory/tools"} />
        </div>
        <div>
          <ActionBarToggleButton status={toolData?.getData("active")} handleActiveToggle={toggleToolType} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"toolDetailView"}
      title={toolData != null ? `Tool Details [${toolData["name"]}]` : undefined}
      managementViewLink={"/inventory/tools"}
      managementTitle={"Tool Registry"}
      type={"Tool"}
      titleIcon={faTools}
      dataObject={toolData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<ToolDetailPanel toolData={toolData} isLoading={isLoading} setToolData={setToolData} loadData={getTool}/>}
    />
  )
}

export default ToolDetailView;