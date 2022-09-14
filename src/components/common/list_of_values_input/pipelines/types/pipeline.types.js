import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import { faBracketsCurly, faDraftingCompass, faMicrochip } from "@fortawesome/pro-light-svg-icons";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

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
  SOFTWARE_DEVELOPMENT: "Software Development",
};

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
      return pipelineType;
  }
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