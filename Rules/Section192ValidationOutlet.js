 /**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section192ValidationOutlet(clientAPI) {
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

        const Section192 = FormSectionedTable.getSection('Section192FormOutlet');
        const decisionTakenCtrl = Section192.getControl('Section192DecisionTaken');
        const inspectedByCtrl = Section192.getControl('Section192InspectedBy');
        const inspectionMethodCtrl = Section192.getControl('Section192Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section203Form =FormSectionedTable.getSection('Section192StaticImage');
    Section203Form.setVisible('true');
     const Section192UserInputImage1 =FormSectionedTable.getSection('Section192StaticImage');
     Section192UserInputImage1.setVisible('true');
     const Section192UserInputForm =FormSectionedTable.getSection('Section192UserInputForm');
     Section192UserInputForm.setVisible('true');
    FormSectionedTable.getSection('Section192FormOutlet').getControl('Section192StaticNextButton').setVisible(false);

            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section192CreateOutlet.action'
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
                Message: 'Unexpected error during Section 19.2 validation. Please try again.'
            }
        });
    }
}

