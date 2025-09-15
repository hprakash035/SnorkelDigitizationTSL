/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section173ValidationOutlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        //  const headerSection = FormSectionedTable.getSection('HeaderSection');
        // const snorkelNoControl = headerSection.getControl('SnorkelNo');
        // const snorkelNo = snorkelNoControl.getValue();

        // if (!snorkelNo) {
        //     return clientAPI.executeAction({
        //         Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
        //     });
        // }

        const Section173 = FormSectionedTable.getSection('Section173FormOutlet');
        const decisionTakenCtrl = Section173.getControl('Section173DecisionTaken');
        const inspectedByCtrl = Section173.getControl('Section173InspectedBy');
        const inspectionMethodCtrl = Section173.getControl('Section173Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section173UserInputImage1 =FormSectionedTable.getSection('Section174FormOutlet');
    Section173UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section173FormOutlet').getControl('Section174NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section173CreateOutlet.action'
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
                Message: 'Unexpected error during Section 17.3 validation. Please try again.'
            }
        });
    }
}

