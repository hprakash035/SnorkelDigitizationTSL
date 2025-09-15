/**
 * Section 12.2 Validation (Inlet)
 * @param {IClientAPI} clientAPI
 */
export default function Section122ValidationInlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        console.log("✅ Entered Section122ValidationInlet");

        const Section122 = FormSectionedTable.getSection('Section122FormInlet');
        console.log("Section122FormInlet:", Section122 ? "found" : "❌ not found");

        const decisionTakenCtrl = Section122?.getControl('Section122DecisionTakenInlet');
        const inspectedByCtrl = Section122?.getControl('Section122InspectedByInlet');
        const inspectionMethodCtrl = Section122?.getControl('Section122MethodInlet');

        console.log("decisionTakenCtrl:", !!decisionTakenCtrl);
        console.log("inspectedByCtrl:", !!inspectedByCtrl);
        console.log("inspectionMethodCtrl:", !!inspectionMethodCtrl);

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        console.log("decisionTaken:", decisionTaken);
        console.log("inspectedBy:", inspectedBy);
        console.log("inspectionMethod:", inspectionMethod);

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken !== "") {
            console.log("✅ Validation PASSED – showing image sections");

            const Section122StaticImage = FormSectionedTable.getSection('Section122StaticImageInlet');
            if (Section122StaticImage) {
                console.log("Found Section122StaticImageInlet – making visible");
                Section122StaticImage.setVisible(true);
            } else {
                console.log("❌ Section122StaticImageInlet not found");
            }

            const Section122UserInputImage = FormSectionedTable.getSection('Section122UserInputImageInlet');
            if (Section122UserInputImage) {
                console.log("Found Section122UserInputImageInlet – making visible");
                Section122UserInputImage.setVisible(true);
            } else {
                console.log("❌ Section122UserInputImageInlet not found");
            }

            const nextBtnCtrl = FormSectionedTable.getSection('Section122FormInlet')?.getControl('Section123NextButton');
            if (nextBtnCtrl) {
                console.log("Hiding Section123NextButton");
                nextBtnCtrl.setVisible(false);
            } else {
                console.log("❌ Section123NextButton not found");
            }

            clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section122Create.action'
            });

        } else {
            console.log("❌ Validation FAILED – some required fields missing");
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action'
            });
        }

    } catch (error) {
        console.log("❌ ERROR in Section122ValidationInlet:", error);
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section 12.2 validation. Please try again.'
            }
        });
    }
}
