export default function Section103Validation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        // console.log("PageProxy retrieved:", pageProxy);

        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        // console.log("FormSectionedTable retrieved:", FormSectionedTable);

        const snorkelNo = pageProxy.getClientData().snorkelNo;
        // console.log("Snorkel Number:", snorkelNo);

        const Section103 = FormSectionedTable.getSection('Section103Form');
        // console.log("Section103Form section retrieved:", Section103);

        const decisionTakenCtrl = Section103.getControl('Section103DecisionTaken');
        const inspectedByCtrl = Section103.getControl('Section103InspectedBy');
        const inspectionMethodCtrl = Section103.getControl('Section103InspectionMethod');

        // console.log("Controls retrieved:");
        // console.log("  - DecisionTakenCtrl:", decisionTakenCtrl);
        // console.log("  - InspectedByCtrl:", inspectedByCtrl);
        // console.log("  - InspectionMethodCtrl:", inspectionMethodCtrl);

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        // console.log("Control values:");
        // console.log("  - Decision Taken:", decisionTaken);
        // console.log("  - Inspected By:", inspectedBy);
        // console.log("  - Inspection Method:", inspectionMethod);

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken !== "") {
            // console.log("All validations passed. Executing Section103Create.action");

             clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section103Create.action'
            });
             return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2Sheet3.action',
            });

        } else {
            // console.warn("Validation failed. One or more fields are missing or empty.");
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action'
            });
        }

    } catch (error) {
        // console.error("Error in Section103Validation:", error);
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section 10.3 validation. Please try again.'
            }
        });
    }
}
