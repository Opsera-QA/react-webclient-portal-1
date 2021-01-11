// TODO: put metadata on node server and pull down that way?

// TODO: Remove when finishing customer onboard
const ldapUsersFormFields = {
  idProperty: "name",
  name: {
    label: "Full User Name",
    id: "name",
    rules: {
      isRequired: true
    }
  },
  preferredName: {
    label: "Preferred Name",
    id: "preferredName",
    rules: {
      // isRequired: true
    }
  },
  firstName: {
    label: "First Name",
    id: "firstName",
    rules: {
      isRequired: true
    }
  },
  lastName: {
    label: "Last Name",
    id: "lastName",
    rules: {
      isRequired: true
    }
  },
  emailAddress: {
    label: "Email Address",
    id: "emailAddress",
    rules: {
      isRequired: true
    }
  },
  division: {
    label: "Division",
    id: "division",
    rules: {
      // isRequired: true
    }
  },
  teams: {
    label: "Teams",
    id: "teams",
    rules: {
      // isRequired: true
    }
  },
  departmentName: {
    label: "Department Name",
    id: "departmentName",
    rules: {
      // isRequired: true
    }
  },
  title: {
    label: "Title",
    id: "title",
    rules: {
      // isRequired: true
    }
  },
  site: {
    label: "Site",
    id: "site",
    rules: {
      // isRequired: true
    }
  },
  opseraId: {
    label: "Opsera Customer Record",
    id: "opseraId",
    rules: {
      // isRequired: true
    }
  },
  users: {
    label: "LDAP Users",
    id: "users",
    rules: {
      // isRequired: true
    }
  },
  region: {
    label: "Region",
    id: "region",
    rules: {
      // isRequired: true
    }
  },
};

export default ldapUsersFormFields;

export const ldapUsersMetaData = {
  idProperty: "name",
  type: "User",
  fields: [
    {
      label: "Full User Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Preferred Name",
      id: "preferredName",
      rules: {
        // isRequired: true
      }
    },
    {
      label: "First Name",
      id: "firstName",
      isRequired: true
    },
    {
      label: "Last Name",
      id: "lastName",
      isRequired: true
    },
    {
      label: "Email Address",
      id: "emailAddress",
      isRequired: true
    },
    {
      label: "Division",
      id: "division",
    },
    {
      label: "Teams",
      id: "teams",
    },
    {
      label: "Department Name",
      id: "departmentName",
    },
    {
      label: "Title",
      id: "title",
    },
    {
      label: "Site",
      id: "site",
    },
    // opseraId: {
    //   label: "Opsera Customer Record",
    //   id: "opseraId",
    //   rules: {
    //     // isRequired: true
    //   }
    // },
    {
      label: "LDAP Users",
      id: "users",
    },
    {
      label: "Region",
      id: "region",
    },
  ],
  newObjectFields: {
    name: "",
    title: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    emailAddress: "",
    departmentName: "",
    teams: [],
    division: "",
    site: "",
  }
};