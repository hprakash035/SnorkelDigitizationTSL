export default async function Section142TestFormValidationOutlet(clientAPI) {
    try {
        console.log("▶️ Section142TestFormValidationOutlet triggered");

        const pageProxy = clientAPI.getPageProxy();
        console.log("✅ pageProxy retrieved:", pageProxy);

        const form = pageProxy.getControl('FormSectionedTable');
        console.log("✅ FormSectionedTable control retrieved:", form);

        const section142 = form.getSection('Section142TestFormOutlet');
        console.log("✅ Section142TestFormOutlet section retrieved:", section142);

        const actionNames = [
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate1.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate2.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate3.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate2.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section142TestOutletCreate3.action'
        ];
        console.log("✅ Action names configured:", actionNames);

        for (let i = 1; i <= 5; i++) {
            console.log(`🔍 Validating Test ${i}...`);

            let missingFields = [];

            const powerWeight = section142.getControl(`Section142PowerWeight${i}`)?.getValue();
            const waterCasting = section142.getControl(`Section142WaterCasting${i}`)?.getValue();
            const fludity = section142.getControl(`Section142FludityOfCastable${i}`)?.getValue();
            const vibration = section142.getControl(`Section142AddingVibration${i}`)?.getValue();
            const remark = section142.getControl(`Section142Remark${i}`)?.getValue();

            console.log(`📌 Test ${i} values ->`, {
                powerWeight,
                waterCasting,
                fludity,
                vibration,
                remark
            });

            if (!powerWeight) missingFields.push("Power Weight");
            if (!waterCasting) missingFields.push("Water Casting");
            if (!fludity || fludity.length === 0) missingFields.push("Fludity Of Castable");
            if (!vibration) missingFields.push("Adding Vibration");
            // Optional: if remark is mandatory
            // if (!remark) missingFields.push("Remark");

            if (missingFields.length > 0) {
                console.warn(`⚠️ Validation failed for Test ${i}: Missing ->`, missingFields);
                return clientAPI.executeAction({
                    Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                    Properties: {
                        Message: `Please enter ${missingFields.join(', ')} for Test ${i}.`
                    }
                });
            }

            console.log(`✅ Test ${i} validation passed. Executing action:`, actionNames[i - 1]);
            await clientAPI.executeAction({ Name: actionNames[i - 1] });
        }

        // All validations passed
        console.log("🎉 All 5 test validations passed successfully.");

        const nextButton = section142.getControl('Section142Test2NextButtonOutlet');
        if (nextButton) {
            console.log("⏩ Hiding Next button");
            nextButton.setVisible(false);
        } else {
            console.warn("⚠️ Section142Test2NextButtonOutlet not found");
        }

        const nextSection = form.getSection('Section142Test2FormOutlet');
        if (nextSection) {
            form.getSection('Section142Test2NameOutlet').setVisible(true);;
            console.log("⏩ Showing Section142Test2FormOutlet");
            nextSection.setVisible(true);
        } else {
            console.warn("⚠️ Section142Test2FormOutlet not found");
        }

    } catch (e) {
        console.error('❌ Error in Section142TestFormValidationOutlet:', e);
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
            Properties: {
                Message: 'An unexpected error occurred during validation. Please try again.'
            }
        });
    }
}
