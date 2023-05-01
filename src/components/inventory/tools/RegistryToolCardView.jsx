import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import {useHistory} from "react-router-dom";
import {toolHelper} from "components/inventory/tools/tool.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import ToolCardBase from "temp-library-components/cards/tools/ToolCardBase";
import VanitySetCardView from "components/common/card/VanitySetCardView";

export default function RegistryToolCardView({ tools, loadData, isLoading }) {
  const history = useHistory();

  const loadTool = (tool) => {
    const toolLink = toolHelper.getDetailViewLink(tool._id);

    if (hasStringValue(toolLink) === true) {
      history.push(toolLink);
    }
  };

  const getRegistryToolCard = (tool) => {
    return (
      <ToolCardBase
        toolModel={new Model({ ...tool }, registryToolMetadata, false)}
        onClickFunction={() => loadTool(tool)}
        tooltip={"Click to view Tool"}
      />
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      cards={
        <VerticalCardViewBase
          data={tools}
          getCardFunction={getRegistryToolCard}
        />
      }
    />
  );
}

RegistryToolCardView.propTypes = {
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
