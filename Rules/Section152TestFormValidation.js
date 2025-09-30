export default async function Section152TestFormValidation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section152 = form.getSection('Section152TestForm');

        const actionNames = [
            '/TRL_Snorkel_Digitization_TSL/Actions/Section152TestCreate1.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section152TestCreate2.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section152TestCreate3.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section152TestCreate4.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section152TestCreate5.action'
        ];

        for (let i = 1; i <= 5; i++) {
            await clientAPI.executeAction({ Name: actionNames[i - 1] });
        }

        const nextButton = section152.getControl('Section152Test2NextButton');
        if (nextButton) {
            nextButton.setVisible(false);
        }

        const Section152Form = form.getSection('Section152StaticImage');
        const Section152Form1 = form.getSection('Section152UserInputImage');

        Section152Form.setVisible(true);
        Section152Form1.setVisible(true);

    } catch (e) {
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
            Properties: {
                Message: 'An unexpected error occurred. Please try again.'
            }
        });
    }
}
