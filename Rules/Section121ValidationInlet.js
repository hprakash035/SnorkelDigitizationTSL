/**
 * Section 12.1 Inlet Validation
 * Validates Date, InspectedBy, and DecisionTaken fields
 * If valid → shows next section, hides Next button, creates entry
 * If invalid → shows ValidationFailed action
 * @param {IClientAPI} clientAPI
 */
export default function Section121ValidationInlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const formTable = pageProxy.getControl('FormSectionedTable');

        // Get Section 12.1 Inlet form
        const section121Inlet = formTable.getSection('Section121FormInlet');

        const dateCtrl = section121Inlet.getControl('Section121DateInlet');
        const inspectedByCtrl = section121Inlet.getControl('Section121InspectedByInlet');
        const methodCtrl = section121Inlet.getControl('Section121MethodInlet');
        const decisionCtrl = section121Inlet.getControl('Section121DecisionTakenInlet');

        const dateValue = dateCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const methodValue = methodCtrl?.getValue(); // "Visual confirmation" (read-only)
        const decisionValue = decisionCtrl?.getValue();

        // ✅ Check required values
        if (dateValue && inspectedBy && decisionValue && decisionValue !== "") {

            // Show next section (12.2 or whatever is next in your app)
            const section122 = formTable.getSection('Section122FormInlet');
            if (section122) {
                section122.setVisible(true);
            }

            // Hide Next button after successful validation
            const nextBtn = section121Inlet.getControl('Section122NextButtonInlet');
            if (nextBtn) {
                nextBtn.setVisible(false);
            }

            

            // Trigger create action for Section 12.1 Inlet
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section121InletCreate.action'
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
                Message: 'Unexpected error during Section 12.1 Inlet validation. Please try again.'
            }
        });
    }
}
