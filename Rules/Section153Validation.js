/**
 * Section 15.1 Inlet Validation
 * Validates Date, InspectedBy, and DecisionTaken fields
 * If valid → shows next section, hides Next button, creates entry
 * If invalid → shows ValidationFailed action
 * @param {IClientAPI} clientAPI
 */
export default function Section153ValidationInlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const formTable = pageProxy.getControl('FormSectionedTable');

        // Get Section 15.7 Inlet form
        const section153Inlet = formTable.getSection('Section153Form');

        const dateCtrl = section153Inlet.getControl('Section153DateInlet');
        const inspectedByCtrl = section153Inlet.getControl('Section153InspectedByInlet');
        const methodCtrl = section153Inlet.getControl('Section153MethodInlet');
        const decisionCtrl = section153Inlet.getControl('Section153DecisionTakenInlet');

        const dateValue = dateCtrl?.getValue();
        const inspectedBy = inspectedByCtrl?.getValue();
        const methodValue = methodCtrl?.getValue(); // "Visual confirmation" (read-only)
        const decisionValue = decisionCtrl?.getValue();

        // ✅ Check required values
        if (dateValue && inspectedBy && decisionValue && decisionValue !== "") {

            // Show next section (15.7 or whatever is next in your app)
            

            // Hide Next button after successful validation
            const nextBtn = section153Inlet.getControl('Section153NextButtonInlet');
            if (nextBtn) {
                nextBtn.setVisible(false);
            }

            

            // Trigger create action for Section 15.1 Inlet
             clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section153Create.action'
            });
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2Sheet6.action',
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
                Message: 'Unexpected error during Section 15.7 Inlet validation. Please try again.'
            }
        });
    }
}
