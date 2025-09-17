export default async function Section151Validation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');

        const Section151 = FormSectionedTable.getSection('Section151Form');
        const decisionTakenCtrl = Section151.getControl('Section151DecisionTaken');
        const inspectedByCtrl = Section151.getControl('Section151InspectedBy');
        const inspectionMethodCtrl = Section151.getControl('Section151Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken !== "") {

            // Show Section152
            const Section152 = FormSectionedTable.getSection('Section152Form');
            if (Section152) {
                await Section152.setVisible(true);
            }

            // Hide the "Next" button inside Section151Form
            const nextButton = Section151.getControl('Section152NextButton');
            if (nextButton) {
                await nextButton.setVisible(false);
            }

            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section151Create.action'
            });

        } else {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action'
            });
        }

    } catch (error) {
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section 15.1 validation. Please try again.'
            }
        });
    }
}
