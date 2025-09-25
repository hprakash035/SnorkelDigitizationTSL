/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Section211Validation(clientAPI) {
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

        const Section211 = FormSectionedTable.getSection('Section211Form');
        const decisionTakenCtrl = Section211.getControl('Section211DecisionTaken');
        const inspectedByCtrl = Section211.getControl('Section211InspectedBy');
        const inspectionMethodCtrl = Section211.getControl('Section211Method');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    // const Section211UserInputImage1 =FormSectionedTable.getSection('Section191Form');
    // Section211UserInputImage1.setVisible('true');
    // FormSectionedTable.getSection('Section211Form').getControl('Section191NextButton').setVisible(false);

    
    const Section211UserInputImage1 =FormSectionedTable.getSection('Section211StaticImage');
    Section211UserInputImage1.setVisible('true');
     const Section211UserInputImage =FormSectionedTable.getSection('Section211UserInputForm');
    Section211UserInputImage.setVisible('true');
    FormSectionedTable.getSection('Section211Form').getControl('Section211StaticNextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section211Create.action'
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
                Message: 'Unexpected error during Section 18.4 validation. Please try again.'
            }
        });
    }
}

