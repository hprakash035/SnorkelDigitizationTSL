/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section142ValidationOutlet(clientAPI) {
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

        const Section142 = FormSectionedTable.getSection('Section142FormOutlet');
        const decisionTakenCtrl = Section142.getControl('Section142DecisionTaken');
        const inspectedByCtrl = Section142.getControl('Section142InspectedBy');
        const inspectionMethodCtrl = Section142.getControl('Section142Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section142UserInputImage1 =FormSectionedTable.getSection('Section142TestFormOutlet');
    Section142UserInputImage1.setVisible('true');
    FormSectionedTable.getSection('Section142TestNameOutlet').setVisible(true);
    FormSectionedTable.getSection('Section142FormOutlet').getControl('Section142TestNextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section142CreateOutlet.action'
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
                Message: 'Unexpected error during Section 14.2 validation. Please try again.'
            }
        });
    }
}

