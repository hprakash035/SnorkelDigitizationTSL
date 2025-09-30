export default async function Section142TestFormValidationOutlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section142 = form.getSection('Section142TestFormOutlet');

        const actionNames = [
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate1.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate2.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate3.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate2.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate3.action'
        ];

        for (let i = 1; i <= 5; i++) {
            await clientAPI.executeAction({ Name: actionNames[i - 1] });
        }

        const nextButton = section142.getControl('Section142Test2NextButtonOutlet');
        if (nextButton) {
            nextButton.setVisible(false);
        }

        const nextSection = form.getSection('Section142Test2FormOutlet');
        if (nextSection) {
            form.getSection('Section142Test2NameOutlet').setVisible(true);
            nextSection.setVisible(true);
        }

    } catch (e) {
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
            Properties: {
                Message: 'An unexpected error occurred. Please try again.'
            }
        });
    }
}
