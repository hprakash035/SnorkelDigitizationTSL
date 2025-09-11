export default async function Section122TestFormValidationOutlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section122 = form.getSection('Section122TestFormOutlet');

        const actionNames = [
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate1Outlet.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate2Outlet.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate3Outlet.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate4Outlet.action'
        ];

        for (let i = 1; i <= 4; i++) {
            let missingFields = [];

            const position = section122.getControl(`Section122Position${i}`)?.getValue();
            const tolerance = section122.getControl(`Section122Tolerence${i}`)?.getValue();
            const method = section122.getControl(`Section122Method${i}`)?.getValue();
            const actual = section122.getControl(`Section122ActualValue${i}`)?.getValue();
           

            if (!position) missingFields.push("position");
            if (!tolerance) missingFields.push("tolerance");
         
            if (!actual) missingFields.push(" actual value");
            // Optional: if remark is mandatory, uncomment below
             if (!method) missingFields.push("method");

            if (missingFields.length > 0) {
                return clientAPI.executeAction({
                    Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                    Properties: {
                        Message: `Please enter ${missingFields.join(', ')} for Test ${i}.`
                    }
                });
            }

            // Proceed with save if all fields are valid
            await clientAPI.executeAction({ Name: actionNames[i - 1] });
        }

        // All 5 test validations passed
        const nextButton = section122.getControl('Section133NextButton');
        if (nextButton) {
            nextButton.setVisible(false);
        }

        const nextSection = form.getSection('Section123FormOutlet');
        if (nextSection) {
            nextSection.setVisible(true);
        }

    } catch (e) {
        console.error('❌ Error in Section122TestFormValidation:', e);
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
            Properties: {
                Message: 'An unexpected error occurred during validation. Please try again.'
            }
        });
    }
}
