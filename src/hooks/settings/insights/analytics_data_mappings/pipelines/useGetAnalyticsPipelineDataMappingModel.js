import useGetModelBase from "hooks/model/useGetModelBase";
import {
  analyticsPipelineDataMappingHelper
} from "components/settings/data_mapping/pipelines/analyticsPipelineDataMapping.helper";
import pipelineDataMappingMetadata
  from "@opsera/definitions/constants/settings/data_mapping/pipeline/pipelineDataMapping.metadata";
import useAnalyticsPipelineDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/pipelines/useAnalyticsPipelineDataMappingActions";
import AnalyticsPipelineDataMappingRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_mappings/pipelines/analyticsPipelineDataMappingRole.helper";

export default function useGetAnalyticsPipelineDataMappingModel() {
  const getModelBase = useGetModelBase();
  const analyticsDataPipelineMappingActions = useAnalyticsPipelineDataMappingActions();

  const getAnalyticsPipelineDataMappingModel = (analyticsDataEntry, newModel) => {
    const initialModel = getModelBase(analyticsDataEntry, pipelineDataMappingMetadata, newModel);

    initialModel.createModel = async () => {
      return await analyticsDataPipelineMappingActions.createPipelineDataMapping(initialModel);
    };

    initialModel.saveModel = async () => {
      return await analyticsDataPipelineMappingActions.updatePipelineDataMapping(initialModel);
    };

    initialModel.deleteModel = async () => {
      const canDelete = initialModel.canDelete();

      if (canDelete !== true) {
        throw "Access Denied";
      }

      await analyticsDataPipelineMappingActions.deletePipelineDataMapping(initialModel?.getMongoDbId());
    };

    initialModel.canCreate = () => {
      return AnalyticsPipelineDataMappingRoleHelper.canCreateAnalyticsPipelineDataMapping(
        initialModel.userData,
      );
    };

    initialModel.canUpdate = () => {
      return AnalyticsPipelineDataMappingRoleHelper.canUpdateAnalyticsPipelineDataMapping(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canDelete = () => {
      return AnalyticsPipelineDataMappingRoleHelper.canDeleteAnalyticsPipelineDataMapping(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.canTransferOwnership = () => {
      return AnalyticsPipelineDataMappingRoleHelper.canTransferAnalyticsPipelineDataMappingOwnership(
        initialModel.userData,
        initialModel.getOriginalData(),
      );
    };

    initialModel.getDetailViewLink = () => {
      return analyticsPipelineDataMappingHelper.getDetailViewLink(initialModel.getMongoDbId());
    };

    initialModel.getDetailViewTitle = () => {
      return `Pipeline Data Mapping`;
    };

    return initialModel;
  };

  return getAnalyticsPipelineDataMappingModel;
}


