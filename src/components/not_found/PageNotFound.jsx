import React from "react";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import OpseraInfinityLogoLarge from "components/logo/OpseraInfinityLogoLarge";
import IconBase from "components/common/icons/IconBase";
import { faDiamondExclamation } from "@fortawesome/pro-light-svg-icons";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className={"mt-3"}>
      <ScreenContainer
        breadcrumbDestination={"pageNotFound"}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          <CenteredContentWrapper
            minHeight={screenContainerHeights.TABLE_MINIMUM_HEIGHT_WITH_DESCRIPTION}
          >
            <OpseraInfinityLogoLarge
              scale={.5}
            />
            <div className={"mx-auto"}>
              <div
                style={{
                  fontSize: "60px",
                }}
                className={"danger-red"}
              >
                <IconBase
                  icon={faDiamondExclamation}
                  className={"mr-4"}
                />
                  404
              </div>
              <H5FieldSubHeader
                subheaderText={"The page you were looking for was not found!"}
              />
              <div className={"mt-3"}>
                <Link to={"/"}>
                  Click here to go home
                </Link>
              </div>
            </div>
          </CenteredContentWrapper>
        </div>
      </ScreenContainer>
    </div>
  );
}