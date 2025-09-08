export async function loadSection12Data(pageProxy, qcItem12, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const section12 = FormSectionedTable.getSection('Section12Form');
        if (!section12) {
            throw new Error("Section12Form not found in FormSectionedTable.");
        }

        await section12.setVisible(true);

        const nextButton = section12.getControl('Section12NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section2Form = FormSectionedTable.getSection('Section2Form');
                if (Section2Form) {
                    await Section2Form.setVisible(true);
                }
            }
        }

        const section12Date12Control = section12.getControl('Section12Date');
        if (section12Date12Control && qcItem12.DATE_INSPECTED) {
            await section12Date12Control.setValue(qcItem12.DATE_INSPECTED);
        }

        const section12InspectedBy12Control = section12.getControl('Section12InspectedBy');
        if (section12InspectedBy12Control && qcItem12.INSPECTED_BY) {
            await section12InspectedBy12Control.setValue(qcItem12.INSPECTED_BY);
        }

        const section12InspectionMethod12Control = section12.getControl('Section12InspectionMethod');
        if (section12InspectionMethod12Control && qcItem12.METHOD) {
            await section12InspectionMethod12Control.setValue(qcItem12.METHOD);
        }

        const section12DecisionTaken12Control = section12.getControl('Section12DecisionTaken');
        if (section12DecisionTaken12Control && qcItem12.DECISION_TAKEN) {
            await section12DecisionTaken12Control.setValue(qcItem12.DECISION_TAKEN);
        }

    } catch (error) {
        console.error("Error loading Section12 data:", error);
    }
}
