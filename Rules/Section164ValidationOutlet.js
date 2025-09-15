/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section164Validation(clientAPI) {
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

        const Section164 = FormSectionedTable.getSection('Section164FormOutlet');
        const decisionTakenCtrl = Section164.getControl('Section164DecisionTaken');
        const inspectedByCtrl = Section164.getControl('Section164InspectedBy');
        const inspectionMethodCtrl = Section164.getControl('Section164Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section164UserInputImage1 =FormSectionedTable.getSection('Section171FormOutlet');
    Section164UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section164FormOutlet').getControl('Section171NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section164CreateOutlet.action'
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
                Message: 'Unexpected error during Section 16.4 validation. Please try again.'
            }
        });
    }
}

