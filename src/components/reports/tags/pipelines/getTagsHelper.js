import adminTagsActions from "components/settings/tags/admin-tags-actions";

  const getTagsUsedInPipeline = async (getAccessToken, cancelSource, tags) => {
    if (Array.isArray(tags) && tags.length > 0) {
      const response = await adminTagsActions.getRelevantPipelinesV2(getAccessToken, cancelSource, tags);

      if (response?.data != null) {
        console.log(response?.data?.data);
      }
    }
  };

export default getTagsUsedInPipeline;