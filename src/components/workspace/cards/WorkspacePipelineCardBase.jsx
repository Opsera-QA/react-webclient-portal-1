import PropTypes from "prop-types";
import React from "react";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import { hasStringValue } from "components/common/helpers/string-helpers";
import IconBase from "components/common/icons/IconBase";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";

// TODO: Rewrite
export default function WorkspacePipelineCardBase(
  {
    pipelineModel,
    getSelectButtonFunction,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getTitleBar = () => {
    let icon = getLargeVendorIconFromToolIdentifier(pipelineModel?.getArrayData("type", 0));

    if (hasStringValue(icon) === true) {
      icon = (
        <div className="d-flex w-100 h-100 mt-2 mb-4">
          <div className="my-auto tool-title-text">{icon}</div>
        </div>
      );
    }

    return (
      <IconTitleBar
        icon={icon}
        title={`${pipelineModel?.getData("name")}`}
      />
    );
  };


  const getDescription = () => {
    return (
      <div className="description-height small pl-1">
        {/*<DescriptionField dataObject={pipeline} fieldName={"description"} />*/}
      </div>
    );
  };

  const getTypeHeader = () => {
   return (
     <div
       className={"d-flex w-100"}
       style={{
         backgroundColor: themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE,
         color: themeConstants.COLOR_PALETTE.WHITE,
       }}
     >
       <div
         className={"mx-auto"}
         style={{
           fontSize: "13px",
         }}
       >
         <IconBase
           icon={faDraftingCompass}
           className={"mr-2"}
         />
         Pipeline
       </div>
     </div>
   );
  };

  return (
    <IconCardContainerBase
      header={getTypeHeader()}
      titleBar={getTitleBar()}
      contentBody={getDescription()}
      className={"vertical-selection-card"}
    >
      <div className="date-and-button">
        <div className="small pl-1">
          {/*<CreateAndUpdateDateFieldBase*/}
          {/*  className={"mt-3 mb-1"}*/}
          {/*  model={toolData}*/}
          {/*/>*/}
        </div>
        <div>
          {/*<ToolLinkButton*/}
          {/*  toolId={toolData.getData("_id")}*/}
          {/*  className={"w-100 mt-1"}*/}
          {/*  loadToolInNewWindow={loadToolInNewWindow}*/}
          {/*  variant={"primary"}*/}
          {/*/>*/}
        </div>
      </div>
    </IconCardContainerBase>
  );
}

WorkspacePipelineCardBase.propTypes = {
  pipelineModel: PropTypes.object,
  getSelectButtonFunction: PropTypes.func,
};