/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section182ValidationOutlet(clientAPI) {
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

        const Section182 = FormSectionedTable.getSection('Section182FormOutlet');
        const decisionTakenCtrl = Section182.getControl('Section182DecisionTaken');
        const inspectedByCtrl = Section182.getControl('Section182InspectedBy');
        const inspectionMethodCtrl = Section182.getControl('Section182Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section182UserInputImage1 =FormSectionedTable.getSection('Section183FormOutlet');
    Section182UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section182FormOutlet').getControl('Section183NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section182CreateOutlet.action'
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
                Message: 'Unexpected error during Section 18.2 validation. Please try again.'
            }
        });
    }
}

