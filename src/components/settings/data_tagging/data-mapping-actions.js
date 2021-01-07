import { axiosApiService } from "../../../api/apiService";

const dataMappingActions = {};

dataMappingActions.createProjectMapping = async (data, getAccessToken) => {
  let postData = {
    ...data.getPersistData(),
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/mappings/create/project";
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postData)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.getProjectMappings = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/projects`;
  const response = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.getProjectMappingById = async (id, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/projects/${id}`;
  const response = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.updateProject = async (data, getAccessToken) => {
  let postData = {
    ...data.getPersistData(),
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/update/project/${data.getData("_id")}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postData)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.deleteProjectMapping = async (data, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/project/${data.getData("_id")}`;
  const response = await axiosApiService(accessToken)
    .delete(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.createUserMapping = async (data, getAccessToken) => {
  let postData = {
    ...data.getPersistData(),
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/mappings/create/users";
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postData)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.getUserMappings = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/users`;
  const response = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.getUserMappingById = async (id, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/users/${id}`;
  const response = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.updateUserMapping = async (data, getAccessToken) => {
  let postData = {
    ...data.getPersistData(),
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/update/users/${data.getData("_id")}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postData)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.deleteUserMapping = async (data, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/users/${data.getData("_id")}`;
  const response = await axiosApiService(accessToken)
    .delete(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

dataMappingActions.getSCMUserList = async (data, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/mappings/users/scmlist/${data.getData("tool_identifier")}/${data.getData("tool_id")}`;
  const response = await axiosApiService(accessToken)
    .get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

export default dataMappingActions;
