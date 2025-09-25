export async function loadSection151Data(pageProxy, qcItem151, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section151 = FormSectionedTable.getSection('Section151Form');
        if (!Section151) throw new Error("❌ Section151Form not found in FormSectionedTable.");

        await Section151.setVisible(true);

        // --- Helpers ---
        const setValueIfPresent = async (section, controlName, value) => {
            const control = section?.getControl(controlName);
            if (control && value !== undefined && value !== null) {
                await control.setValue(value);
            }
        };

        const setButtonVisibility = async (section, buttonName, visible) => {
            const btn = section?.getControl(buttonName);
            if (btn) {
                await btn.setVisible(visible);
            }
        };

        // --- Header Values ---
        let headerHasData = false;

        if (qcItem151?.DATE_INSPECTED) {
            await setValueIfPresent(Section151, 'Section151Date', qcItem151.DATE_INSPECTED);
            headerHasData = true;
        }

        if (qcItem151?.INSPECTED_BY) {
            await setValueIfPresent(Section151, 'Section151InspectedBy', qcItem151.INSPECTED_BY);
            headerHasData = true;
        }

        if (qcItem151?.METHOD) {
            await setValueIfPresent(Section151, 'Section151Method', qcItem151.METHOD);
            headerHasData = true;
        }

        if (qcItem151?.DECISION_TAKEN) {
            await setValueIfPresent(Section151, 'Section151DecisionTaken', qcItem151.DECISION_TAKEN);
            headerHasData = true;
        }

        // --- Button Visibility Logic ---
        await setButtonVisibility(Section151, 'Section152NextButton', !headerHasData);

        // --- Show Section152Form if flags.next === false ---
        if (flags?.next === false && headerHasData) {
            const Section152Form = FormSectionedTable.getSection('Section152Form');
            if (Section152Form) {
                await Section152Form.setVisible(true);
            }
        }

        // console.log("✅ loadSection151Data executed. Header has data:", headerHasData);
    } catch (error) {
        console.error("❌ Error loading Section151 data:", error);
    }
}
