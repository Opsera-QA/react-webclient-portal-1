import React from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import SpyglassBadge from "components/common/badges/spyglass/SpyglassBadge";
import WarningBadge from "components/common/badges/warning/WarningBadge";
import SuccessBadge from "components/common/badges/success/SuccessBadge";
import VanityBadgeContainer from "components/common/badges/VanityBadgeContainer";

function RiskFactorDisplayer({riskFactors, className, showNoTagsAppliedBadge}) {
  const getRiskFactorPopover = () => {
    if (Array.isArray(riskFactors) && riskFactors.length > 0) {
      return (
        <VanityBadgeContainer>
          {riskFactors.map((riskFactor, index) => {
            if (typeof riskFactor === "string") {
              return (
                <div className={"mb-2"}>
                  <WarningBadge
                    badgeText={riskFactor}
                    key={index}
                  />
                </div>
              );
            }
          })}
        </VanityBadgeContainer>
      );
    }
  };

  if (!Array.isArray(riskFactors) || riskFactors.length === 0) {
    if (showNoTagsAppliedBadge === true) {
      return (
        <div className={className}>
          <VanityBadgeContainer>
            <SuccessBadge
              badgeText={"No Risk Factors"}
            />
          </VanityBadgeContainer>
        </div>
      );
    }

    return "N/A";
  }

  return (
    <TooltipWrapper
      innerText={getRiskFactorPopover()}
      title={"Risk Factors"}
      showCloseButton={false}
      className={"popover-filter"}
    >
      <div className={className}>
        <VanityBadgeContainer>
          <SpyglassBadge
            badgeText={`${riskFactors?.length} Risk Factor${riskFactors?.length !== 1 ? "s" : ""}`}
          />
        </VanityBadgeContainer>
      </div>
    </TooltipWrapper>
  );
}

RiskFactorDisplayer.propTypes = {
  riskFactors: PropTypes.array,
  className: PropTypes.string,
  showNoTagsAppliedBadge: PropTypes.bool,
};

export default RiskFactorDisplayer;