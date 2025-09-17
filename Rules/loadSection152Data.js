export async function loadSection152Data(
    pageProxy,
    qcItem152,
    FormSectionedTable,
    attachments = [],
    flags = {},
    testdataArray = []
) {
    try {
        console.log("▶ loadSection152Data: Starting...");

        const section152 = FormSectionedTable.getSection('Section152Form');
        if (!section152) return console.error("❌ Section152Form not found.");

        await section152.setVisible(true);

        // Helper to set control values safely
        const setValueIfPresent = async (section, controlName, value) => {
            const ctrl = section?.getControl(controlName);
            if (ctrl && value !== undefined && value !== null) {
                await ctrl.setValue(value);
            }
        };

        const setButtonVisibility = async (section, buttonName, visible) => {
            const btn = section?.getControl(buttonName);
            if (btn) {
                await btn.setVisible(visible);
            }
        };

        // ---- Header Data ----
        let headerHasData = false;

        if (qcItem152?.DATE_INSPECTED) {
            await setValueIfPresent(section152, 'Section152InspectionDate', qcItem152.DATE_INSPECTED);
            headerHasData = true;
        }

        if (qcItem152?.INSPECTED_BY) {
            await setValueIfPresent(section152, 'Section152InspectedBy', qcItem152.INSPECTED_BY);
            headerHasData = true;
        }

        if (qcItem152?.METHOD) {
            await setValueIfPresent(section152, 'Section152InspectionMethod', qcItem152.METHOD);
            headerHasData = true;
        }

        if (qcItem152?.DECISION_TAKEN) {
            await setValueIfPresent(section152, 'Section152DecisionTaken', qcItem152.DECISION_TAKEN);
            headerHasData = true;
        }

        // ---- Button Visibility ----
        await setButtonVisibility(section152, 'Section152NextButton', !headerHasData);

        // Show Section171Form if flagged and header has data
        if (flags?.next === false && headerHasData) {
            const section171 = FormSectionedTable.getSection('Section171Form');
            if (section171) {
                await section171.setVisible(true);
            }
        }

        // ---- Mixing Test Section ----
        const mixingTests = testdataArray.filter(t =>
            t.testname?.includes("mixing the outer castable")
        );

        const testForm = FormSectionedTable.getSection('Section152TestForm');
        const testHeader = FormSectionedTable.getSection('Section152TestName');

        if (testHeader) await testHeader.setVisible(true);
        if (testForm && mixingTests.length > 0) {
            await testForm.setVisible(true);

            for (let i = 0; i < Math.min(mixingTests.length, 5); i++) {
                const test = mixingTests[i];
                const suffix = i + 1;

                const setTestValue = async (ctrl, val) => {
                    const c = testForm.getControl(ctrl);
                    if (c && val !== undefined && val !== null) {
                        await c.setValue(val);
                    }
                };

                await setTestValue(`Section152PowerWeight${suffix}`, test.powderweight);
                await setTestValue(`Section152WaterCasting${suffix}`, test.watercasting);

                const fluidity = test.fluidity?.toLowerCase();
                if (fluidity === "ok" || fluidity === "not_ok") {
                    await setTestValue(`Section152FludityOfCastable${suffix}`, [fluidity]);
                }

                await setTestValue(`Section152AddingVibration${suffix}`, test.vibration);
                await setTestValue(`Section152Remark${suffix}`, test.remark);
            }
        }

        // ---- Gap Test Section ----
        const gapHeader = FormSectionedTable.getSection('SectionFormCell5');
        const gapForm = FormSectionedTable.getSection('Section152Test2Form');
        const gapTests = testdataArray.filter(t =>
            t.testname?.includes("*10  Actual situation for mixing the outer castable")
        );

        const positionMap = {
            "12:00 direction": "A",
            "3:00 direction": "B",
            "6:00 direction": "C",
            "9:00 direction": "D"
        };

        if (gapHeader) await gapHeader.setVisible(true);

        if (gapForm && gapTests.length > 0) {
            await gapForm.setVisible(true);

            for (const gap of gapTests) {
                const suffix = positionMap[gap.position];
                if (!suffix) continue;

                const ctrlName = `Section152TestActualGap${suffix}`;
                const ctrl = gapForm.getControl(ctrlName);
                if (ctrl) {
                    await ctrl.setValue(gap.actualvalue ?? "0");
                }
            }
        }

        // ---- Static & Dynamic Image Handling ----
        const staticImg = FormSectionedTable.getSection('Section152StaticImage');
        if (staticImg) await staticImg.setVisible(true);

        const dynamicImageSection = FormSectionedTable.getSection('Section152DynamicImage');
        const userImageSection = FormSectionedTable.getSection('Section152UserInputImage');
        const binding = pageProxy.getBindingObject();

        let dynamicImageVisible = false;
        if (attachments.length > 0 && dynamicImageSection) {
            const firstAttachment = attachments[0];
            const base64 = firstAttachment?.file;
            const mimeType = firstAttachment?.mimeType || 'image/png';

            if (base64 && base64.length > 100) {
                binding.imageUri = `data:${mimeType};base64,${base64}`;
                await dynamicImageSection.setVisible(true);
                await dynamicImageSection.redraw();
                dynamicImageVisible = true;
            }
        }

        if (!dynamicImageVisible) {
            binding.imageUri = '/TRL_Snorkel_Digitization_TSL/Images/NoImageAvailable.png';
            await dynamicImageSection?.setVisible(false);
            await dynamicImageSection?.redraw();

            if (userImageSection) {
                await userImageSection.setVisible(true);
            }
        }

        console.log("✔ loadSection152Data: Finished successfully.");
    } catch (error) {
        console.error("❌ Error loading Section152 data:", error);
    }
}
