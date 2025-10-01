/**
 * Section 13.1 Inlet Validation
 * Validates Date, InspectedBy, and DecisionTaken fields
 * If valid → shows next section, hides Next button, creates entry
 * If invalid → shows ValidationFailed action
 * @param {IClientAPI} clientAPI
 */
export default function Section137ValidationInlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const formTable = pageProxy.getControl('FormSectionedTable');

        // Get Section 13.7 Inlet form
        const section137Inlet = formTable.getSection('Section137Form');

        const dateCtrl = section137Inlet.getControl('Section137DateInlet');
        const inspectedByCtrl = section137Inlet.getControl('Section137InspectedByInlet');
        const methodCtrl = section137Inlet.getControl('Section137MethodInlet');
        const decisionCtrl = section137Inlet.getControl('Section137DecisionTakenInlet');

        const dateValue = dateCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const methodValue = methodCtrl?.getValue(); // "Visual confirmation" (read-only)
        const decisionValue = decisionCtrl?.getValue();

        // ✅ Check required values
        if (dateValue && inspectedBy && decisionValue && decisionValue !== "") {

            // Show next section (13.7 or whatever is next in your app)
            

            // Hide Next button after successful validation
            const nextBtn = section137Inlet.getControl('Section137NextButtonInlet');
            if (nextBtn) {
                nextBtn.setVisible(false);
            }

            

            // Trigger create action for Section 13.1 Inlet
             clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section137Create.action'
            });
             return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2Sheet5.action',
            });

        } else {
            // Show validation failed action
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action'
            });
        }

    } catch (error) {
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ErrorMessage.action',
            Properties: {
                Message: 'Unexpected error during Section 13.7 Inlet validation. Please try again.'
            }
        });
    }
}
