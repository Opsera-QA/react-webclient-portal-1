import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import ToolSummaryPanel from "components/inventory/tools/tool_details/ToolSummaryPanel";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import ToolReadOnlyDetailPanel from "components/inventory/tools/tool_details/ToolReadOnlyDetailPanel";

function ToolInfoContainer({ toolData, toolIdentifier }) {
  const [toolModel, setToolModel] = useState(undefined);

  useEffect(() => {
    setToolModel(new Model(toolData, toolMetadata, false));
  }, [JSON.stringify(toolData)]);

  // TODO: Make a component that uses summary panels relating to tool connection details based on tool identifier
  const getToolConfigurationInformation = () => {
    if (toolData?.configuration && Object.entries(toolData?.configuration)?.length > 0) {
      return (
        Object.entries(toolData?.configuration).map(function(item) {
          return (
            <div key={item}>
              {item[1].length > 0 && (
                <>
                  <span className="text-muted pr-1">{item[0]}: </span> {item[1]}
                </>
              )}
            </div>
          );
        })
      );
    }
  };

  return (
    <InfoContainer
      titleIcon={faTools}
      titleText={`${toolData?.name} Tool Details`}
    >
      <ToolSummaryPanel toolData={toolModel} />
      <SummaryPanelContainer>
        <div>Configuration Properties:</div>
        {getToolConfigurationInformation()}
      </SummaryPanelContainer>
      {/*<ToolReadOnlyDetailPanel toolData={toolModel} />*/}
    </InfoContainer>
  );
}

ToolInfoContainer.propTypes = {
  toolData: PropTypes.object,
  toolIdentifier: PropTypes.string,
};

export default ToolInfoContainer;