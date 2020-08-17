import { axiosApiService } from "../../api/apiService";

const accountsActions = {};

accountsActions.updateUser = async (orgDomain, ldapUserDataDto, getAccessToken) => {
  const postBody = {
    domain: orgDomain,
    user: {
      ...ldapUserDataDto.getPersistData()
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/user/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
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

accountsActions.createUser = async (ldapUserDataDto, getAccessToken) => {
  let postData = {
      ...ldapUserDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/user/create";
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

accountsActions.getUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/get-users?page=1&size=10000`;";
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

accountsActions.getLdapUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/accounts";
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

accountsActions.getUserByEmail = async (email, getAccessToken) => {
  let postBody = {
    email: email
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/user";
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

accountsActions.getUser = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/${userId}`;
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

accountsActions.getUserRegistrations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/registrations";
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

accountsActions.getOrganizations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organizations";
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

accountsActions.createIdpAccount = async (ldapIdpAccountDataDto, getAccessToken) => {
  let postData = {
    ...ldapIdpAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/idp/create";
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

accountsActions.updateIdpAccount = async (ldapIdpAccountDataDto,ldapOrganizationAccountData, getAccessToken) => {
  let postData = {
    ...ldapIdpAccountDataDto.getPersistData(),
    // domain: ldapOrganizationAccountData.getData("orgDomain")
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/idp/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postData)
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

accountsActions.createOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postData = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
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

accountsActions.updateOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
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

accountsActions.createOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
      ...ldapOrganizationDataDto.getPersistData(),
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organization/create";
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

accountsActions.updateOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organization/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
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

accountsActions.getOrganizationByName = async (organizationName, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/organization/${organizationName}`;
  const response = await axiosApiService(accessToken).post(apiUrl, {})
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

accountsActions.getOrganizationByEmail = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account";
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
accountsActions.activateElk = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/tools/activate-elk/${userId}`;
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

accountsActions.create = async (accountData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/onboard";
  const response = await axiosApiService(accessToken).post(apiUrl, accountData)
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

accountsActions.getGroup = async (orgDomain, groupName, getAccessToken) => {
  let postData = {
    domain: orgDomain,
    groupName: groupName,
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group";
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

accountsActions.updateGroup = async (ldapOrganizationData, ldapGroupDataDto, getAccessToken) => {
  let putData = {
    "domain": ldapOrganizationData.orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData()
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/update";
  const response = await axiosApiService(accessToken).put(apiUrl, putData)
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

accountsActions.createGroup = async (ldapOrganizationData, ldapGroupDataDto, currentUserEmail, getAccessToken) => {
  let putData = {
    "domain": ldapOrganizationData.orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData(),
      ownerEmail: currentUserEmail,
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/create";
  const response = await axiosApiService(accessToken).post(apiUrl, putData)
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

accountsActions.syncMembership = async (ldapOrganizationData, groupName, emailList, getAccessToken) => {
  let postData = {
    domain: ldapOrganizationData.orgDomain,
    groupName: groupName,
    emails: emailList,
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/sync-membership";
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

// TODO: Should this be broken into add/remove?
accountsActions.modifyMemership = async (membershipData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/modify-membership";
  const response = await axiosApiService(accessToken).post(apiUrl, membershipData)
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

// TODO: Implement if necessary
// accountsActions.duplicate = async (tagId, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/pipelines/${tagId}/duplicate/`;
//   const response = await axiosApiService(accessToken).put(apiUrl)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };

export default accountsActions;