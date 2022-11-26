import {pipelineHelper} from "components/workflow/pipeline.helper";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";

export const pipelinesPaths = {};

// Pipeline Catalog Routes
pipelinesPaths.catalog = pipelineCatalogHelper.getManagementScreenLink();
pipelinesPaths.customerPipelineTemplateDetailView = `${pipelinesPaths.catalog}/:id`;

// Pipelines Paths
pipelinesPaths.pipelines = pipelineHelper.getManagementScreenLink();
pipelinesPaths.pipelineDetailView = pipelinesPaths.pipelines + "/details";

// Pipeline Instructions Paths
pipelinesPaths.pipelineInstructionsManagement = pipelineInstructionsHelper.getManagementScreenLink();