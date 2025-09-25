export async function loadSection192DataOutlet(pageProxy, qcItem192, FormSectionedTable, attachments = [], flags, testdataArray = []) {
    try {
        const Section192 = FormSectionedTable.getSection('Section192FormOutlet');
        if (!Section192) throw new Error("❌ Section192FormOutlet not found in FormSectionedTable.");

        await Section192.setVisible(true);

        // -------------------------------
        // Helpers
        // -------------------------------
        const hideNextButton = async (section, buttonName) => {
            if (section) {
                const btn = section.getControl(buttonName);
                if (btn) {
                    await btn.setVisible(false);
                    // console.log(`🚫 Hidden ${buttonName}`);
                }
            }
        };

        const setValueIfPresent = async (controlName, value) => {
            const control = Section192.getControl(controlName);
            if (control && value !== undefined && value !== null) {
                await control.setValue(value);
            }
        };

        // -------------------------------
        // Metadata
        // -------------------------------
        await setValueIfPresent('Section192DateOutlet', qcItem192.DATE_INSPECTED);
        await setValueIfPresent('Section192InspectedByOutlet', qcItem192.INSPECTED_BY ? [qcItem192.INSPECTED_BY] : undefined);
        await setValueIfPresent('Section192MethodOutlet', qcItem192.METHOD);
        await setValueIfPresent('Section192DecisionTakenOutlet', qcItem192.DECISION_TAKEN ? [qcItem192.DECISION_TAKEN] : undefined);

        // Hide static NEXT after metadata if data exists
        if (qcItem192?.DATE_INSPECTED || qcItem192?.INSPECTED_BY || qcItem192?.METHOD || qcItem192?.DECISION_TAKEN) {
            await hideNextButton(Section192, "Section192StaticNextButton");
        }

        // -------------------------------
        // Image handling
        // -------------------------------
        FormSectionedTable.getSection('Section192StaticImage')?.setVisible(true);
        const dynamicImageSection = FormSectionedTable.getSection('Section192DynamicImage');
        const userInputImageSection = FormSectionedTable.getSection('Section192UserInputForm');
        const binding = pageProxy.getBindingObject();

        let hasDynamicImage = false;

        if (dynamicImageSection && attachments.length > 0) {
            const firstAttachment = attachments[0];
            const base64 = firstAttachment?.file;
            const mimeType = firstAttachment?.mimeType || 'image/png';

            if (base64 && base64.length > 100) {
                binding.imageUri = `data:${mimeType};base64,${base64}`;
                await dynamicImageSection.setVisible(true);
                await dynamicImageSection.redraw();

                hasDynamicImage = true;

                if (userInputImageSection) {
                    await userInputImageSection.setVisible(false);
                }
            }
        }

        if (!hasDynamicImage) {
            binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
            await dynamicImageSection?.setVisible(false);
            await dynamicImageSection?.redraw();

            if (userInputImageSection) {
                await userInputImageSection.setVisible(true);
            }
        }

        // -------------------------------
        // Show next form automatically if data exists
        // -------------------------------
       const Section193 = FormSectionedTable.getSection('Section193FormOutlet');

        if (qcItem192?.DATE_INSPECTED || hasDynamicImage) {
            // ✅ Auto-show Section192
            await Section193?.setVisible(true);

            // Hide its Next button too if data is present
            await hideNextButton(Section193, "Section194NextButton");
        } else {
            // ❌ Keep Section192 hidden until button pressed
            await Section193?.setVisible(false);
        }

    } catch (error) {
        console.error("❌ Error in loadSection192DataOutlet:", error);
    }
}
