/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section195Validation(clientAPI) {
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

        const Section195 = FormSectionedTable.getSection('Section195Form');
        const decisionTakenCtrl = Section195.getControl('Section195DecisionTaken');
        const inspectedByCtrl = Section195.getControl('Section195InspectedBy');
        const inspectionMethodCtrl = Section195.getControl('Section195Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    const Section195UserInputImage1 =FormSectionedTable.getSection('Section195StaticImage');
    Section195UserInputImage1.setVisible('true');
     const Section195UserInputImage =FormSectionedTable.getSection('Section195UserInputImage');
    Section195UserInputImage.setVisible('true');
    FormSectionedTable.getSection('Section195Form').getControl('Section195StaticNextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section195Create.action'
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
                Message: 'Unexpected error during Section 19.4 validation. Please try again.'
            }
        });
    }
}

