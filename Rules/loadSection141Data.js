export async function loadSection141Data(pageProxy, qcItem141, FormSectionedTable, attachments = [], flags, testdataArray = []) {
    try {
        const Section141 = FormSectionedTable.getSection('Section141Form');
        if (!Section141) throw new Error("❌ Section141Form not found in FormSectionedTable.");

        await Section141.setVisible(true);

        // --- Helper Functions ---
        const setValueIfPresent = async (section, controlName, value) => {
            const control = section?.getControl(controlName);
            if (control && value !== undefined && value !== null) {
                await control.setValue(value);
            }
        };

        const setButtonVisibility = async (section, buttonName, visible) => {
            const button = section?.getControl(buttonName);
            if (button) {
                await button.setVisible(visible);
            }
        };

        // --- Header Values ---
        let headerHasData = false;

        if (qcItem141?.DATE_INSPECTED) {
            await setValueIfPresent(Section141, 'Section141Date', qcItem141.DATE_INSPECTED);
            headerHasData = true;
        }
        if (qcItem141?.INSPECTED_BY) {
            await setValueIfPresent(Section141, 'Section141InspectedBy', [qcItem141.INSPECTED_BY]);
            headerHasData = true;
        }
        if (qcItem141?.METHOD) {
            await setValueIfPresent(Section141, 'Section141Method', qcItem141.METHOD);
            headerHasData = true;
        }
        if (qcItem141?.DECISION_TAKEN) {
            await setValueIfPresent(Section141, 'Section141DecisionTaken', [qcItem141.DECISION_TAKEN]);
            headerHasData = true;
        }

        // --- Control Next Button visibility based on header data ---
        await setButtonVisibility(Section141, 'Sectiopn141TestNextButton', !headerHasData);

        // --- Test Form Section ---
        let testHasData = false;
         const testForm = FormSectionedTable.getSection('Section141TestForm');
        const Section141FormName = FormSectionedTable.getSection('Section141FormName');

        if (headerHasData && testForm) {
            await testForm.setVisible(true);
             await Section141FormName.setVisible(true);

            if (testdataArray.length > 0) {
                const tests = testdataArray.filter(t =>
                    t.testname?.includes("*8 Inspection result of outer castable workablity")
                );

                for (let i = 0; i < Math.min(tests.length, 3); i++) {
                    const test = tests[i];
                    const suffix = i + 1;

                    await setValueIfPresent(testForm, `Section141TestBatchNo${suffix}`, test.batchNo);
                    await setValueIfPresent(testForm, `Section141TestWaterCasteing${suffix}`, test.watercasting);
                    await setValueIfPresent(testForm, `Section141FF${suffix}`, test.ff1);
                    await setValueIfPresent(testForm, `Section141FF${suffix}2`, test.ff2);
                    await setValueIfPresent(testForm, `Section141TF${suffix}`, test.tf1);
                    await setValueIfPresent(testForm, `Section141TF${suffix}2`, test.tf2);
                    await setValueIfPresent(testForm, `Section141SettingTime${suffix}`, test.settleduration);
                    await setValueIfPresent(testForm, `Section141TestRemark${suffix}`, test.remark);

                    testHasData = true;
                }
            }

            // Optional: You could control visibility of a next button inside the testForm if needed
            await setButtonVisibility(testForm, 'Section151NextButton', !testHasData);
        }

        // --- Section 151 Visibility ---
        const Section151Form = FormSectionedTable.getSection('Section151Form');
        if (Section151Form) {
            await Section151Form.setVisible(testHasData);
        }

        // console.log("✅ loadSection141Data executed: headerHasData =", headerHasData, "| testHasData =", testHasData);
    } catch (error) {
         console.error("❌ Error in loadSection141Data:", error);
    }
}
