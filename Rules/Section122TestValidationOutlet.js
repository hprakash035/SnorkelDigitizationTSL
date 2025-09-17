export default async function Section122TestFormValidationOutlet(clientAPI) {
    try {
        console.log("🚀 Starting Section122TestFormValidationOutlet");

        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section122 = form.getSection('Section122TestFormOutlet');

        if (!section122) {
            console.warn("⚠️ Section122TestFormOutlet not found");
            return;
        }

        const actionNames = [
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate1Outlet.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate2Outlet.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate3Outlet.action',
            '/TRL_Snorkel_Digitization_TSL/Actions/Section122TestCreate4Outlet.action'
        ];

        for (let i = 1; i <= 4; i++) {
            let missingFields = [];
            console.log(`🔍 Validating Test Row ${i}`);

            const position = section122.getControl(`Section122Position${i}`)?.getValue();
            const tolerance = section122.getControl(`Section122Tolerence${i}`)?.getValue();
            const method = section122.getControl(`Section122Method${i}`)?.getValue();
            const actual = section122.getControl(`Section122ActualValue${i}`)?.getValue();

            console.log(`   position: ${position}, tolerance: ${tolerance}, method: ${method}, actual: ${actual}`);

            if (!position) missingFields.push("position");
            if (!tolerance) missingFields.push("tolerance");
            if (!actual) missingFields.push("actual value");
            if (!method) missingFields.push("method"); // Optional

            if (missingFields.length > 0) {
                console.warn(`❌ Missing fields for Test ${i}:`, missingFields);
                return clientAPI.executeAction({
                    Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                    Properties: {
                        Message: `Please enter ${missingFields.join(', ')} for Test ${i}.`
                    }
                });
            }

            console.log(`✅ Test Row ${i} valid, executing action ${actionNames[i - 1]}`);
            await clientAPI.executeAction({ Name: actionNames[i - 1] });
        }

        console.log("✅ All test rows validated successfully");

        const nextButton = section122.getControl('Section133NextButton');
        if (nextButton) {
            console.log("🚫 Hiding Section133NextButton");
            await nextButton.setVisible(false);
        }

        const nextSection = form.getSection('Section123FormOutlet');
        if (nextSection) {
            console.log("➡️ Showing Section123FormOutlet");
            await nextSection.setVisible(true);
        }

        console.log("✅ Section122TestFormValidationOutlet completed");

    } catch (e) {
        console.error('❌ Error in Section122TestFormValidationOutlet:', e);
        return clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
            Properties: {
                Message: 'An unexpected error occurred during validation. Please try again.'
            }
        });
    }
}
