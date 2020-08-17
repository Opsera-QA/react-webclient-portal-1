import {axiosApiService} from "../../../api/apiService";

const toolTypeActions = {};

toolTypeActions.createToolType = async (toolTypeDataDto, getAccessToken) => {
  let postData = {
    ...toolTypeDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/type/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.updateToolType = async (toolTypeDataDto, getAccessToken) => {
  const postBody = {
    ...toolTypeDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/type/${toolTypeDataDto.getData("_id")}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.deleteToolType = async (toolTypeDataDto, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/tool/${toolTypeDataDto.getData("_id")}`;
  const response = await axiosApiService(accessToken).delete(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.getToolTypes = async (getAccessToken, hidden = true) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/types?hidden=${hidden}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.getToolTypeById = async (toolTypeId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/type/${toolTypeId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.getToolIdentifierById = async (toolIdentifierId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/tool/${toolIdentifierId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};


toolTypeActions.getToolIdentifiers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/tools?hidden=true";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.createToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  let postData = {
    ...toolIdentifierDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/tool/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.updateToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  const postBody = {
    ...toolIdentifierDataDto.getPersistData(),
    // properties: {
    //   isLiveStream: false
    // }
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/tool/${toolIdentifierDataDto.getData("_id")}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

toolTypeActions.deleteToolIdentifier = async (toolIdentifierDataDto, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/type/${toolIdentifierDataDto.getData("_id")}`;
  const response = await axiosApiService(accessToken).delete(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      return {
        error
      };
    });
  return response;
};

export default toolTypeActions;