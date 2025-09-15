/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section183ValidationOutlet(clientAPI) {
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

        const Section183 = FormSectionedTable.getSection('Section183FormOutlet');
        const decisionTakenCtrl = Section183.getControl('Section183DecisionTaken');
        const inspectedByCtrl = Section183.getControl('Section183InspectedBy');
        const inspectionMethodCtrl = Section183.getControl('Section183Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section183UserInputImage1 =FormSectionedTable.getSection('Section184FormOutlet');
    Section183UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section183FormOutlet').getControl('Section184NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section183CreateOutlet.action'
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
                Message: 'Unexpected error during Section 18.3 validation. Please try again.'
            }
        });
    }
}

