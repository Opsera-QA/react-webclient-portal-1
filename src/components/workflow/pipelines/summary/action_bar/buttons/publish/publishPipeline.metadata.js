import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
const pipelineFields = pipelineMetadata?.fields;

export const publishPipelineMetadata = {
  type: "Pipeline",
  fields: [
    getField(pipelineFields, "name"),
    getField(pipelineFields, "roles"),
    getField(pipelineFields, "description"),
  ],
  newObjectFields: {
    name: "",
    roles: [],
    description: "",
  },
};
