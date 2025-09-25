/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section214Validation(clientAPI) {
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

        const Section214 = FormSectionedTable.getSection('Section214Form');
        const decisionTakenCtrl = Section214.getControl('Section214DecisionTaken');
        const inspectedByCtrl = Section214.getControl('Section214InspectedBy');
        const inspectionMethodCtrl = Section214.getControl('Section214Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    
    // const Section214TakePhoto =FormSectionedTable.getSection('Section214Form');
    // Section214TakePhoto.setVisible('true');
    FormSectionedTable.getSection('Section214Form').getControl('SectionInletFinalButton').setVisible(false);
             clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section214Create.action'
            });
             return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2FinalInspection.action',
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
                Message: 'Unexpected error during Section 20.6 validation. Please try again.'
            }
        });
    }
}

