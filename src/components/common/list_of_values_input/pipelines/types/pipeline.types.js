import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import { faBracketsCurly, faDraftingCompass, faMicrochip } from "@fortawesome/pro-light-svg-icons";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import constantsHelper from "@opsera/definitions/constants/constants.helper";
import {getLargeVendorIconFromToolIdentifier} from "components/common/helpers/icon-helpers";
import {platformImageConstants} from "temp-library-components/image/platformImage.constants";
import {vendorImageConstants} from "temp-library-components/image/vendorImage.constants";
import React from "react";

// TODO: Refactor
export const pipelineTypeConstants = {};

export const PIPELINE_TYPES = {
  APIGEE: "apigee",
  INFORMATICA: "informatica",
  MACHINE_LEARNING: "ai-ml",
  SALESFORCE: "sfdc",
  SAP_CPQ: "sap-cpq",
  SOFTWARE_DEVELOPMENT: "sdlc",
};

export const PIPELINE_TYPE_LABELS = {
  APIGEE: "Apigee",
  INFORMATICA: "Informatica",
  MACHINE_LEARNING: "Machine Learning (AI)",
  SALESFORCE: "Salesforce",
  SAP_CPQ: "SAP CPQ",
  SOFTWARE_DEVELOPMENT: "Software Development Life Cycle (SDLC)",
};

pipelineTypeConstants.PIPELINE_TYPES = PIPELINE_TYPES;
pipelineTypeConstants.PIPELINE_TYPE_LABELS = PIPELINE_TYPE_LABELS;

export const getPipelineTypeLabel = (pipelineType) => {
  switch (pipelineType) {
    case PIPELINE_TYPES.APIGEE:
      return PIPELINE_TYPE_LABELS.APIGEE;
    case PIPELINE_TYPES.INFORMATICA:
      return PIPELINE_TYPE_LABELS.INFORMATICA;
    case PIPELINE_TYPES.MACHINE_LEARNING:
      return PIPELINE_TYPE_LABELS.MACHINE_LEARNING;
    case PIPELINE_TYPES.SAP_CPQ:
      return PIPELINE_TYPE_LABELS.SAP_CPQ;
    case PIPELINE_TYPES.SALESFORCE:
      return PIPELINE_TYPE_LABELS.SALESFORCE;
    case PIPELINE_TYPES.SOFTWARE_DEVELOPMENT:
      return PIPELINE_TYPE_LABELS.SOFTWARE_DEVELOPMENT;
    default:
      return "No Pipeline Type Applied";
  }
};

pipelineTypeConstants.getTypeForPipeline = (pipeline, defaultToSdlc = true) => {
  const parsedTypes = DataParsingHelper.parseNestedArray(pipeline, "type");
  return pipelineTypeConstants.getTypeForTypesArray(parsedTypes, defaultToSdlc);
};

pipelineTypeConstants.getTypeForTypesArray = (pipelineTypes, defaultToSdlc = true) => {
  const parsedTypes = DataParsingHelper.parseArray(pipelineTypes);
  const defaultType = defaultToSdlc === false ? undefined : PIPELINE_TYPES.SOFTWARE_DEVELOPMENT;

  if (!parsedTypes) {
    return defaultType;
  }

  const isTypeValid = constantsHelper.isValueValid(PIPELINE_TYPES, parsedTypes[0]);

  if (!isTypeValid) {
    return defaultType;
  }

  return parsedTypes[0];
};

pipelineTypeConstants.getLabelForPipelineTypeArray = (pipelineTypes) => {
  const primaryPipelineType = pipelineTypeConstants.getTypeForTypesArray(pipelineTypes);
  return getPipelineTypeLabel(primaryPipelineType);
};

pipelineTypeConstants.getIconForPipelineTypeArray = (pipelineTypes) => {
  const primaryPipelineType = pipelineTypeConstants.getTypeForTypesArray(pipelineTypes);
  return pipelineTypeConstants.getIconForPipelineType(primaryPipelineType);
};

pipelineTypeConstants.getIconForPipeline = (pipeline) => {
  const parsedPipeline = dataParsingHelper.parseObject(pipeline);
  return pipelineTypeConstants.getIconForPipelineType(parsedPipeline?.type);
};

// TODO: Eventually pull out tool from pipeline for SDLC flows
pipelineTypeConstants.getIconForPipelineType = (typeString) => {
  if (hasStringValue(typeString) !== true) {
    return (faDraftingCompass);
  }

  switch (typeString) {
    case PIPELINE_TYPES.SALESFORCE:
      return (faSalesforce);
    case PIPELINE_TYPES.MACHINE_LEARNING:
      return (faMicrochip);
    case PIPELINE_TYPES.SOFTWARE_DEVELOPMENT:
      return (faBracketsCurly);
    default:
      return (faDraftingCompass);
  }
};

pipelineTypeConstants.getImageLinkForPipelineType = (typeString) => {
  const parsedType = DataParsingHelper.parseString(typeString, "");

  switch (parsedType) {
    case PIPELINE_TYPES.APIGEE:
      return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.APIGEE;
    case PIPELINE_TYPES.INFORMATICA:
      return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.INFORMATICA;
    case PIPELINE_TYPES.MACHINE_LEARNING:
      return undefined;
    case PIPELINE_TYPES.SALESFORCE:
      return platformImageConstants.PRODUCT_IMAGE_LINKS.SALESFORCE_GENERAL;
    case PIPELINE_TYPES.SAP_CPQ:
      return vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SAP;
    case PIPELINE_TYPES.SOFTWARE_DEVELOPMENT:
      return platformImageConstants.PRODUCT_IMAGE_LINKS.SOFTWARE_DEVELOPMENT_GENERAL;
    default:
      return platformImageConstants.PRODUCT_IMAGE_LINKS.PIPELINES_GENERAL;
  }
};


pipelineTypeConstants.getIconForPipeline = (pipeline) => {
  const type = pipelineTypeConstants.getTypeForPipeline(pipeline);

  if (hasStringValue(type) !== true) {
    return (faDraftingCompass);
  }

  const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);
  const toolIdentifier = DataParsingHelper.parseNestedString(plan[0], "tool.tool_identifier");

  if (type !== PIPELINE_TYPES.SOFTWARE_DEVELOPMENT || !toolIdentifier) {
    return pipelineTypeConstants.getIconForPipelineType(type);
  }

  return getLargeVendorIconFromToolIdentifier(
    toolIdentifier,
    faDraftingCompass,
  );
};

pipelineTypeConstants.getImageLinkForPipeline = (pipeline) => {
  const plan = DataParsingHelper.parseNestedArray(pipeline, "workflow.plan", []);
  const toolIdentifier = DataParsingHelper.parseNestedString(plan[0], "tool.tool_identifier");
  const type = pipelineTypeConstants.getTypeForPipeline(pipeline);

  if (type !== PIPELINE_TYPES.SOFTWARE_DEVELOPMENT || !toolIdentifier) {
    return pipelineTypeConstants.getImageLinkForPipelineType(type);
  }

  const imageLink = vendorImageConstants.getVendorImageForToolIdentifier(toolIdentifier);

  if (!toolIdentifier || !imageLink) {
    return platformImageConstants.PRODUCT_IMAGE_LINKS.PIPELINES_GENERAL;
  }

  return imageLink;
};

pipelineTypeConstants.getImageLinkForPipelineStep = (pipelineStep) => {
  const parsedPipelineStep = DataParsingHelper.parseObject(pipelineStep, {});
  const toolIdentifier = DataParsingHelper.parseNestedString(parsedPipelineStep, "tool.tool_identifier");
  const imageLink = vendorImageConstants.getVendorImageForToolIdentifier(toolIdentifier);

  if (!toolIdentifier || !imageLink) {
    return platformImageConstants.PRODUCT_IMAGE_LINKS.PIPELINES_GENERAL;
  }

  return imageLink;
};

export const PIPELINE_TYPE_SELECT_OPTIONS = [
  {
    text: PIPELINE_TYPE_LABELS.APIGEE,
    value: PIPELINE_TYPES.APIGEE,
  },
  {
    text: PIPELINE_TYPE_LABELS.INFORMATICA,
    value: PIPELINE_TYPES.INFORMATICA,
  },
  {
    text: PIPELINE_TYPE_LABELS.MACHINE_LEARNING,
    value: PIPELINE_TYPES.MACHINE_LEARNING,
  },
  {
    text: PIPELINE_TYPE_LABELS.SAP_CPQ,
    value: PIPELINE_TYPES.SAP_CPQ,
  },
  {
    text: PIPELINE_TYPE_LABELS.SALESFORCE,
    value: PIPELINE_TYPES.SALESFORCE,
  },
  {
    text: PIPELINE_TYPE_LABELS.SOFTWARE_DEVELOPMENT,
    value: PIPELINE_TYPES.SOFTWARE_DEVELOPMENT,
  },
];