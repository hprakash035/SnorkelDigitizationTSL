/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section172ValidationOutlet(clientAPI) {
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

        const Section172 = FormSectionedTable.getSection('Section172FormOutlet');
        const decisionTakenCtrl = Section172.getControl('Section172DecisionTaken');
        const inspectedByCtrl = Section172.getControl('Section172InspectedBy');
        const inspectionMethodCtrl = Section172.getControl('Section172Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section172UserInputImage1 =FormSectionedTable.getSection('Section173FormOutlet');
    Section172UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section172FormOutlet').getControl('Section173NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section172CreateOutlet.action'
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
                Message: 'Unexpected error during Section 17.2 validation. Please try again.'
            }
        });
    }
}

