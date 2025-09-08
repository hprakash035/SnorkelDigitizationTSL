/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */

export default function Section122Validation(clientAPI) {
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

        const Section122 = FormSectionedTable.getSection('Section122FormInletInlet');
        const decisionTakenCtrl = Section122.getControl('Section122DecisionTakenInlet');
        const inspectedByCtrl = Section122.getControl('Section122InspectedByInlet');
        const inspectionMethodCtrl = Section122.getControl('Section122MethodInlet');

        const decisionTaken = decisionTakenCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const inspectionMethod = inspectionMethodCtrl?.getValue();

        if (decisionTaken && inspectedBy && inspectionMethod && decisionTaken != "") {
            const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
  
    const Section122StaticImage =FormSectionedTable.getSection('Section122StaticImage');
    Section122StaticImage.setVisible(true);
      const Section122UserInputImage =FormSectionedTable.getSection('Section122UserInputImage');
    Section122UserInputImage.setVisible(true);


 
    FormSectionedTable.getSection('Section122FormInlet').getControl('Section123NextButton').setVisible(false);
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section122Create.action'
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
                Message: 'Unexpected error during Section 12.2 validation. Please try again.'
            }
        });
    }
}

