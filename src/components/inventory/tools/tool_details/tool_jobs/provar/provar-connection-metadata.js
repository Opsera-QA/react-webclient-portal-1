const ProvarConnectionMetadata = {
    type: "Provar Tool Configuration",
    idProperty: "_id",
    fields: [
        {
            label: "License Type",
            id: "licenseType",
        },
        {
            label: "License Key",
            id: "licenseKey",
            // maxLength: (model) => {
            //     if (model?.getData("licenseType") === "FixedSeat" || model?.getData("licenseType") === "Floating") {
            //         return 25;
            //     }
            //     return undefined;
            // },
        },
    ],
    newObjectFields:
        {
            licenseType: "",
            licenseKey: "",
        }
};

export default ProvarConnectionMetadata;