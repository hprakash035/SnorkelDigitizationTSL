/**
 * Section 12.2 Validation for Outlet
 * @param {IClientAPI} clientAPI
 */
export default function Section122ValidationOutlet(clientAPI) {
    try {
        // console.log("🚀 Section122ValidationOutlet started");

        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');

        const Section122 = FormSectionedTable.getSection('Section122FormOutlet');
        if (!Section122) {
            // console.error("❌ Section122FormOutlet not found");
            throw new Error("Section122FormOutlet not found");
        }

        const decisionTakenCtrl = Section122.getControl('Section122DecisionTakenOutlet');
        const inspectedByCtrl = Section122.getControl('Section122InspectedByOutlet');
        const inspectionMethodCtrl = Section122.getControl('Section122MethodOutlet');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        // console.log("📝 Values:", { decisionTaken, inspectedBy, inspectionMethod });

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
            // console.log("✅ All mandatory fields are filled");

            const Section122StaticImage = FormSectionedTable.getSection('Section122ImageOutlet');
            if (Section122StaticImage) {
                Section122StaticImage.setVisible(true);
                // console.log("👁️ Static image section set visible");
            }

            const Section122UserInputImage = FormSectionedTable.getSection('Section122UserInputImageOutlet');
            if (Section122UserInputImage) {
                Section122UserInputImage.setVisible(true);
                // console.log("👁️ User input image section set visible");
            }

            const nextButton = Section122.getControl('Section122StaticNextButtonOutlet');
            if (nextButton) {
                nextButton.setVisible(false);
                // console.log("➡️ Next button hidden");
            }

            // console.log("🚀 Executing Section122CreateOutlet action");
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section122CreateOutlet.action'
            });

        } else {
            // console.warn("⚠️ Validation failed - mandatory fields missing");
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action'
            });
        }

    } catch (error) {
        // console.error("❌ Error in Section122ValidationOutlet:", error);
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section 12.2 validation. Please try again.'
            }
        });
    }
}
