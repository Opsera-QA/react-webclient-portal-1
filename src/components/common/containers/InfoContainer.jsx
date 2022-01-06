import React from "react";
import PropTypes from "prop-types";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";

// TODO: We should probably combine with MetricInfoContainer for new UI overhaul if approved after use in Insights
function InfoContainer({ children, isLoading, titleIcon, titleText, helpComponent, className }) {
  return (
    <div className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <InputTitleBar
            customTitle={titleText}
            icon={titleIcon}
            helpComponent={helpComponent}
            isLoading={isLoading}
          />
          {children}
        </div>
      </div>
    </div>
  );
}

InfoContainer.propTypes = {
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  children: PropTypes.any,
  helpComponent: PropTypes.any,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default InfoContainer;