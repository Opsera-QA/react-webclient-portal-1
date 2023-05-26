const wizardsHelper = {};

wizardsHelper.filterTemplateByCategory = (
  pipelineTemplates,
  setupMode,
  setTemplates,
  setPipelineTemplateFilterModel,
  pipelineTemplateFilterModel,
) => {
  let filteredTemplates = [];
  for (let template in pipelineTemplates) {
    if (pipelineTemplates[template]?.type[0] && setupMode === "sfdc") {
      filteredTemplates.push(pipelineTemplates[template]);
    }
    if (setupMode === "sdlc") {
      if (
        !pipelineTemplates[template]?.type[0] ||
        pipelineTemplates[template]?.type[0] !== "sfdc"
      ) {
        filteredTemplates.push(pipelineTemplates[template]);
      }
    }
  }
  setTemplates(filteredTemplates);
  let newFilterModel = { ...pipelineTemplateFilterModel };
  newFilterModel.setData("totalCount", filteredTemplates.length);
  setPipelineTemplateFilterModel({ ...newFilterModel });
};

module.exports = wizardsHelper;
