import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import toolMetadata from "components/inventory/tools/tool-metadata";
import ToolReadOnlyDetailPanel from "components/inventory/tools/tool_details/ToolReadOnlyDetailPanel";

function ToolInfoContainer({ toolData }) {
  const [toolModel, setToolModel] = useState(undefined);

  useEffect(() => {
    setToolModel(new Model(toolData, toolMetadata, false));
  }, [JSON.stringify(toolData)]);

  return (
    <InfoContainer
      titleIcon={faTools}
      titleText={`${toolData?.name}`}
    >
      <ToolReadOnlyDetailPanel toolModel={toolModel} />
    </InfoContainer>
  );
}

ToolInfoContainer.propTypes = {
  toolData: PropTypes.object,
  toolIdentifier: PropTypes.string,
};

export default ToolInfoContainer;