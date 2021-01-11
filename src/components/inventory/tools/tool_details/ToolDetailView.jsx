import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ToolDetailPanel from "./ToolDetailPanel";
import {faTools} from "@fortawesome/pro-solid-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import inventoryActions from "components/inventory/inventory-actions";
import toolMetadata from "components/inventory/tools/tool-metadata";
import Model from "core/data_model/model";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteToolButton from "components/common/actions/buttons/tool/ActionBarDeleteToolButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";

function ToolDetailView() {
  const { id, tab } = useParams();
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

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/inventory/tools"} />
        </div>
        <div>
          <ActionBarDeleteToolButton status={toolData?.getData("active")} toolDataObject={toolData} />
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
      activeField={"active"}
      actionBar={getActionBar()}
      detailPanel={<ToolDetailPanel toolData={toolData} isLoading={isLoading} tab={tab} setToolData={setToolData} loadData={getTool}/>}
    />
  )
}

export default ToolDetailView;