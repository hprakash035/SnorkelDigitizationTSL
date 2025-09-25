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
            let missingFields = [];

            const powerWeight = section152.getControl(`Section152PowerWeight${i}`)?.getValue();
            const waterCasting = section152.getControl(`Section152WaterCasting${i}`)?.getValue();
            const fludity = section152.getControl(`Section152FludityOfCastable${i}`)?.getValue();
            const vibration = section152.getControl(`Section152AddingVibration${i}`)?.getValue();
            const remark = section152.getControl(`Section152Remark${i}`)?.getValue();

            if (!powerWeight) missingFields.push("Power Weight");
            if (!waterCasting) missingFields.push("Water Casting");
            if (!fludity || fludity.length === 0) missingFields.push("Fludity Of Castable");
            if (!vibration) missingFields.push("Adding Vibration");
            // Optional: if remark is mandatory, uncomment below
            // if (!remark) missingFields.push("Remark");

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
        const nextButton = section152.getControl('Section152Test2NextButton');
        if (nextButton) {
            nextButton.setVisible(false);
        }

        // const nextSection = form.getSection('Section152Test2Form');
        // if (nextSection) {
        //     nextSection.setVisible(true);
        // }



    const Section152Form =form.getSection('Section152StaticImage');
   
    const Section152Form1 =form.getSection('Section152UserInputImage');
     Section152Form.setVisible('true');
    Section152Form1.setVisible('true');

    } catch (e) {
        console.error('❌ Error in Section152TestFormValidation:', e);
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
            Properties: {
                Message: 'An unexpected error occurred during validation. Please try again.'
            }
        });
    }
}
