export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _TRL_Snorkel_CAP_SRV = context.executeAction('/TRL_Snorkel_Digitization_TSL/Actions/TRL_Snorkel_CAP_SRV/Service/InitializeOnline.action');

    //You can add more service initialize actions here

    return Promise.all([_TRL_Snorkel_CAP_SRV]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/TRL_Snorkel_Digitization_TSL/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}