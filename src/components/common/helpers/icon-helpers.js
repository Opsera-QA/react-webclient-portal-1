import {faOctopusDeploy, faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {
  faClipboardListCheck,
  faDraftingCompass, faMicrochip,
  faShieldKeyhole,
  faTasks,
  faWrench
} from "@fortawesome/pro-light-svg-icons";
import React from "react";
import {TASK_TYPE_CATEGORIES, TASK_TYPES, taskTypeConstants} from "components/tasks/task.types";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import IconBase from "components/common/icons/IconBase";
import {
  PIPELINE_TYPES,
  pipelineTypeConstants
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import {vendorImageConstants} from "temp-library-components/image/vendorImage.constants";
import {ImageBase} from "@opsera/react-vanity-set";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import {platformImageConstants} from "temp-library-components/image/platformImage.constants";

export const getToolIdentifiersWithMissingImages = () => {
  const keys = Object.keys(vendorImageConstants.TOOL_IDENTIFIER_LOGOS);
  const noImage = [];

  keys.forEach((key) => {
    const logo = vendorImageConstants.TOOL_IDENTIFIER_LOGOS[key];

    if (logo == null) {
      noImage.push(toolIdentifierConstants.TOOL_IDENTIFIERS[key]);
    }
  });

  return noImage;
};

export function getLargeVendorIconFromToolIdentifier(
  toolIdentifier,
  defaultIcon = faWrench,
  scaleFactor = 1,
) {
  if (toolIdentifier == null) {
    return <></>;
  }

  const iconFontSize = `${75 * scaleFactor}px`;

  switch (toolIdentifier) {
    case toolIdentifierConstants.TOOL_IDENTIFIERS.OCTOPUS:
      return (
        <IconBase
          icon={faOctopusDeploy}
          iconStyling={{color: "#0D80D8"}}
          iconFontSize={iconFontSize}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR:
      return (
        <IconBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          icon={faSalesforce}
          iconStyling={{color: "#0D80D8"}}
          iconFontSize={iconFontSize}
        />
      );
  }

  const imageLink = vendorImageConstants.getVendorImageForToolIdentifier(toolIdentifier);
  const imageHeight = vendorImageConstants.getRecommendedCardVendorImageHeightForToolIdentifier(toolIdentifier);

  if (imageLink === vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA) {
    const imageSize = 100 * scaleFactor;

    return (
      <OpseraInfinityLogo
        desiredHeight={imageSize}
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
      />
    );
  }

  if (imageLink) {
    const scaledImageHeight = imageHeight ? imageHeight * scaleFactor : imageHeight;
    return (
      <ImageBase
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
        height={imageHeight}
        imageSource={scaledImageHeight}
      />
    );
  }

  return (
    <IconBase
      icon={defaultIcon}
      iconFontSize={iconFontSize}
    />
  );
}

export function getLargeVendorIconComponentFromTaskType (taskType, scaleFactor = 1) {
  if (taskType == null) {
    return <></>;
  }

  const iconFontSize = `${75 * scaleFactor}px`;

  if (taskType === TASK_TYPES.GITSCRAPER) {
    return (
      <IconBase
        icon={faShieldKeyhole}
        iconFontSize={iconFontSize}
      />
    );
  }

  const gitBasedSalesforceTasks = [
    TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE,
    TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
  ];

  if (gitBasedSalesforceTasks.includes(taskType)) {
    return (
      <IconBase
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
        icon={faSalesforce}
        iconStyling={{color: "#0D80D8"}}
        iconFontSize={iconFontSize}
      />
      // <ImageBase
      //   height={platformImageConstants.getRecommendedCardPlatformImageHeight(platformImageConstants.PLATFORM_IMAGE_LINKS.SALESFORCE_GIT_TASK)}
      //   imageSource={platformImageConstants.PLATFORM_IMAGE_LINKS.SALESFORCE_GIT_TASK}
      // />
    );
  }

  const scaledImageHeight = 100 * scaleFactor;
  const category = taskTypeConstants.getTaskCategoryForType(taskType);

  switch (category) {
    case TASK_TYPE_CATEGORIES.SALESFORCE:
      return (
        <IconBase
          className={"d-flex h-100"}
          imageClassName={"my-auto"}
          icon={faSalesforce}
          iconStyling={{color: "#0D80D8"}}
          iconFontSize={iconFontSize}
        />
        // <ImageBase
        //   height={platformImageConstants.getRecommendedCardPlatformImageHeight(platformImageConstants.PLATFORM_IMAGE_LINKS.SALESFORCE_GENERAL)}
        //   imageSource={platformImageConstants.PLATFORM_IMAGE_LINKS.SALESFORCE_GENERAL}
        // />
      );
    case TASK_TYPE_CATEGORIES.GIT:
      return (
        <ImageBase
          height={scaledImageHeight}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GIT}
        />
      );
    case TASK_TYPE_CATEGORIES.AWS:
      return (
        <ImageBase
          height={scaledImageHeight}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS}
        />
      );
    case TASK_TYPE_CATEGORIES.COMPLIANCE:
      return (
        <IconBase
          icon={faClipboardListCheck}
          iconFontSize={`${iconFontSize}px`}
        />
      );
    case TASK_TYPE_CATEGORIES.AZURE:
      return (
        <ImageBase
          height={scaledImageHeight}
          imageSource={vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE}
        />
      );
    default:
      return (
        <ImageBase
          height={scaledImageHeight}
          imageSource={platformImageConstants.PLATFORM_IMAGE_LINKS.SOFTWARE_DEVELOPMENT_GENERAL}
        />
      );
  }
}

export function getLargeVendorIconComponentFromPipeline (pipeline, scaleFactor = 1) {
  const type = pipelineTypeConstants.getTypeForPipeline(pipeline, false);
  const iconFontSize = `${75 * scaleFactor}px`;

  if (type === PIPELINE_TYPES.MACHINE_LEARNING) {
    return (
      <IconBase
        icon={faMicrochip}
        iconFontSize={iconFontSize}
      />
    );
  }

  if (type === PIPELINE_TYPES.SALESFORCE) {
    return (
      <IconBase
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
        icon={faSalesforce}
        iconStyling={{color: "#0D80D8"}}
        iconFontSize={iconFontSize}
      />
    );
  }

  const imageLink = pipelineTypeConstants.getImageLinkForPipeline(
    pipeline,
  );

  if (imageLink === vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA) {
    const imageSize = 100 * scaleFactor;

    return (
      <OpseraInfinityLogo
        desiredHeight={imageSize}
        className={"d-flex h-100"}
        imageClassName={"my-auto"}
      />
    );
  }

  const imageHeight =
    vendorImageConstants.isValidVendorImageLink(imageLink) === true
      ? vendorImageConstants.getRecommendedCardVendorImageHeightForImageLink(imageLink)
      : platformImageConstants.getRecommendedCardPlatformImageHeight(imageLink);

  const scaledImageHeight = imageHeight ? imageHeight * scaleFactor : imageHeight;

  return (
    <ImageBase
      height={scaledImageHeight}
      imageSource={imageLink}
    />
  );
}
