import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import FieldContainer from "components/common/fields/FieldContainer";
import PipelineThresholdTable from "components/common/inputs/object/pipelines/threshhold/PipelineThresholdTable";
import {AuthContext} from "contexts/AuthContext";

function PipelineThresholdFieldCard({ model, fieldName, isLoading, className }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const [field] = useState(model?.getFieldById(fieldName));

  if (featureFlagHideItemInProd() !== false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar field={field} icon={faClipboardListCheck} isLoading={isLoading} />
            <PipelineThresholdTable thresholdRows={model?.getData(fieldName)} />
        </div>
      </div>
    </FieldContainer>
  );
}

PipelineThresholdFieldCard.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default PipelineThresholdFieldCard;