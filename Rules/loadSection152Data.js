export async function loadSection152Data(
    pageProxy,
    qcItem152,
    FormSectionedTable,
    attachments = [],
    flags = {},
    testdataArray = []
) {
    try {
        const section152 = FormSectionedTable.getSection('Section152Form');
        if (!section152) return;

        await section152.setVisible(true);

        // Next button of Section152
        const nextButton = section152.getControl('Section152TestNextButton');

        // Check if Section152 form has metadata
        const hasFormData =
            qcItem152?.DATE_INSPECTED ||
            qcItem152?.INSPECTED_BY ||
            qcItem152?.METHOD ||
            qcItem152?.DECISION_TAKEN;

        if (hasFormData) {
            if (nextButton) await nextButton.setVisible(false);

            // --- Populate metadata fields ---
            if (qcItem152?.DATE_INSPECTED) {
                const ctrl = section152.getControl('Section152Date');
                if (ctrl) await ctrl.setValue(qcItem152.DATE_INSPECTED);
            }

            if (qcItem152?.INSPECTED_BY) {
                const ctrl = section152.getControl('Section152InspectedBy');
                if (ctrl) await ctrl.setValue([qcItem152.INSPECTED_BY]); // ListPicker expects array
            }

            if (qcItem152?.METHOD) {
                const ctrl = section152.getControl('Section152Method');
                if (ctrl) await ctrl.setValue(qcItem152.METHOD);
            }

            if (qcItem152?.DECISION_TAKEN) {
                const ctrl = section152.getControl('Section152DecisionTaken');
                if (ctrl) await ctrl.setValue([qcItem152.DECISION_TAKEN]); // ListPicker expects array
            }

            // --- Show Test1 header & form
            const testHeader = FormSectionedTable.getSection('Section152TestName');
            const testForm = FormSectionedTable.getSection('Section152TestForm');
            if (testHeader) await testHeader.setVisible(true);
            if (testForm) await testForm.setVisible(true);

            // --- Test 1 (Mixing test data)
            const mixingTests = testdataArray.filter(t =>
                t.testname?.includes("*9")
            );

            let hasTest1Data = false;

            if (mixingTests.length > 0 && testForm) {
                for (let i = 0; i < Math.min(mixingTests.length, 5); i++) {
                    const test = mixingTests[i];
                    const suffix = i + 1;

                    const setVal = async (ctrl, val) => {
                        const c = testForm.getControl(ctrl);
                        if (c && val != null) await c.setValue(val);
                    };

                    if (test.batchNo) {
                        hasTest1Data = true;
                        await setVal(`Section152TestBatchNo${suffix}`, test.batchNo);
                    }
                    if (test.powderweight) {
                        hasTest1Data = true;
                        await setVal(`Section152PowerWeight${suffix}`, test.powderweight);
                    }
                    if (test.watercasting) {
                        hasTest1Data = true;
                        await setVal(`Section152WaterCasting${suffix}`, test.watercasting);
                    }
                    if (test.fluidity) {
                        hasTest1Data = true;
                        await setVal(`Section152FludityOfCastable${suffix}`, [test.fluidity.toLowerCase()]);
                    }
                    if (test.vibration) {
                        hasTest1Data = true;
                        await setVal(`Section152AddingVibration${suffix}`, [test.vibration.toLowerCase()]);
                    }
                    if (test.remark) {
                        hasTest1Data = true;
                        await setVal(`Section152Remark${suffix}`, test.remark);
                    }
                }

                // Hide Test1 Next button if data filled
                const test1Next = testForm.getControl('Section152Test2NextButton');
                if (hasTest1Data && test1Next) await test1Next.setVisible(false);
            }

            // --- Show image sections ONLY if TestForm has data ---
            let hasDynamicImage = false;
            if (hasTest1Data) {
                const staticImg = FormSectionedTable.getSection('Section152StaticImage');
                if (staticImg) await staticImg.setVisible(true);

                const dynamicImg = FormSectionedTable.getSection('Section152DynamicImage');
                const userInputImg = FormSectionedTable.getSection('Section152UserInputImage');
                const binding = pageProxy.getBindingObject();

                if (dynamicImg && attachments.length > 0) {
                    const file = attachments[0]?.file;
                    const mimeType = attachments[0]?.mimeType || 'image/png';

                    if (file && file.length > 100) {
                        binding.imageUri = `data:${mimeType};base64,${file}`;
                        await dynamicImg.setVisible(true);
                        await dynamicImg.redraw();
                        if (userInputImg) await userInputImg.setVisible(false);
                        hasDynamicImage = true;
                    } else {
                        binding.imageUri = '/TRL_RH_SnorkelApp/Images/NoImageAvailable.png';
                        await dynamicImg.setVisible(false);
                        await userInputImg?.setVisible(true);
                    }
                } else {
                    binding.imageUri = '/TRL_RH_SnorkelApp/Images/NoImageAvailable.png';
                    await dynamicImg?.setVisible(false);
                    await userInputImg?.setVisible(true);
                }
            }

            // --- Test 2 (Gap test, only if Test1 data + dynamic image exist)
            if ( hasDynamicImage) {
                const gapHeader = FormSectionedTable.getSection('SectionFormCell5');
                const gapForm = FormSectionedTable.getSection('Section152Test2Form');

                if (gapHeader) await gapHeader.setVisible(true);
                if (gapForm) {
                    await gapForm.setVisible(true);

                    const positionMap = {
                        "12:00 direction": "A",
                        "3:00 direction": "B",
                        "6:00 direction": "C",
                        "9:00 direction": "D"
                    };

                    const gapTests = testdataArray.filter(t =>
                        t.testname?.includes("*10")
                    );

                    let hasGapData = false;

                    for (const gap of gapTests) {
                        const suffix = positionMap[gap.position];
                        if (!suffix) continue;

                        const ctrl = gapForm.getControl(`Section152TestActualGap${suffix}`);
                        if (ctrl && gap.actualvalue) {
                            await ctrl.setValue(gap.actualvalue);
                            hasGapData = true;
                            //   FormSectionedTable.getSection('Section151FormOutlet').setVisible(true);
                              gapForm.getControl('Section152StaticNextButton').setVisible(false);;
                        }
                    }

                  
                }
            } else {
                // Hide Test2 if either Test1 data or dynamic image is missing
                await FormSectionedTable.getSection('Section152Test2FormName')?.setVisible(false);
                await FormSectionedTable.getSection('Section152Test2Form')?.setVisible(false);
            }
        } else {
            if (nextButton) await nextButton.setVisible(true);
        }
    } catch (err) {
        console.error("❌ Error in loadSection152Data:", err);
    }
}
