export async function loadSection142DataOutlet(
    pageProxy,
    qcItem142,
    FormSectionedTable,
    attachments = [],
    flags = {},
    testdataArray = []
) {
    try {
        const section142 = FormSectionedTable.getSection('Section142FormOutlet');
        if (!section142) return;

        await section142.setVisible(true);

        // Next button of Section142
        const nextButton = section142.getControl('Section142TestNextButtonOutlet');

        // Check if Section142 form has metadata
        const hasFormData =
            qcItem142?.DATE_INSPECTED ||
            qcItem142?.INSPECTED_BY ||
            qcItem142?.METHOD ||
            qcItem142?.DECISION_TAKEN;

        if (hasFormData) {
            if (nextButton) await nextButton.setVisible(false);

            // --- Populate metadata fields ---
            if (qcItem142?.DATE_INSPECTED) {
                const ctrl = section142.getControl('Section142Date');
                if (ctrl) await ctrl.setValue(qcItem142.DATE_INSPECTED);
            }

            if (qcItem142?.INSPECTED_BY) {
                const ctrl = section142.getControl('Section142InspectedBy');
                if (ctrl) await ctrl.setValue([qcItem142.INSPECTED_BY]); // ListPicker expects array
            }

            if (qcItem142?.METHOD) {
                const ctrl = section142.getControl('Section142Method');
                if (ctrl) await ctrl.setValue(qcItem142.METHOD);
            }

            if (qcItem142?.DECISION_TAKEN) {
                const ctrl = section142.getControl('Section142DecisionTaken');
                if (ctrl) await ctrl.setValue([qcItem142.DECISION_TAKEN]); // ListPicker expects array
            }

            // --- Show Test1 header & form
            const testHeader = FormSectionedTable.getSection('Section142TestNameOutlet');
            const testForm = FormSectionedTable.getSection('Section142TestFormOutlet');
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
                        await setVal(`Section142TestBatchNo${suffix}`, test.batchNo);
                    }
                    if (test.powderweight) {
                        hasTest1Data = true;
                        await setVal(`Section142PowerWeight${suffix}`, test.powderweight);
                    }
                    if (test.watercasting) {
                        hasTest1Data = true;
                        await setVal(`Section142WaterCasting${suffix}`, test.watercasting);
                    }
                    if (test.fluidity) {
                        hasTest1Data = true;
                        await setVal(`Section142FludityOfCastable${suffix}`, [test.fluidity.toLowerCase()]);
                    }
                    if (test.vibration) {
                        hasTest1Data = true;
                        await setVal(`Section142AddingVibration${suffix}`, [test.vibration.toLowerCase()]);
                    }
                    if (test.remark) {
                        hasTest1Data = true;
                        await setVal(`Section142Remark${suffix}`, test.remark);
                    }
                }

                // Hide Test1 Next button if data filled
                const test1Next = testForm.getControl('Section142Test2NextButtonOutlet');
                if (hasTest1Data && test1Next) await test1Next.setVisible(false);
            }

            // --- Show image sections ONLY if TestForm has data ---
            let hasDynamicImage = false;
            if (hasTest1Data) {
                const staticImg = FormSectionedTable.getSection('Section142StaticImageOutlet');
                if (staticImg) await staticImg.setVisible(true);

                const dynamicImg = FormSectionedTable.getSection('Section142DynamicImageOutlet');
                const userInputImg = FormSectionedTable.getSection('Section142UserInputImageOutlet');
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
                const gapHeader = FormSectionedTable.getSection('Section142Test2NameOutlet');
                const gapForm = FormSectionedTable.getSection('Section142Test2FormOutlet');

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

                        const ctrl = gapForm.getControl(`Section142TestActualGap${suffix}`);
                        if (ctrl && gap.actualvalue) {
                            await ctrl.setValue(gap.actualvalue);
                            hasGapData = true;
                              FormSectionedTable.getSection('Section151FormOutlet').setVisible(true);
                              gapForm.getControl('Section142StaticNextButton').setVisible(false);;
                        }
                    }

                  
                }
            } else {
                // Hide Test2 if either Test1 data or dynamic image is missing
                await FormSectionedTable.getSection('Section142Test2FormNameOutlet')?.setVisible(false);
                await FormSectionedTable.getSection('Section142Test2FormOutlet')?.setVisible(false);
            }
        } else {
            if (nextButton) await nextButton.setVisible(true);
        }
    } catch (err) {
        console.error("❌ Error in loadSection142Data:", err);
    }
}
