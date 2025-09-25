export async function loadSection201Data(pageProxy, qcItem201, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section201 = FormSectionedTable.getSection('Section201Form');
        if (!Section201) {
            throw new Error("Section201Form not found in FormSectionedTable.");
        }

        // Show current section
        await Section201.setVisible(true);

        // Handle next button visibility + next section logic
        const nextButton = Section201.getControl('Section202NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section202Form = FormSectionedTable.getSection('Section202Form');
                if (Section202Form) {
                    await Section202Form.setVisible(true);
                }
            }
        }

        // Populate controls if data exists
        if (qcItem201?.DATE_INSPECTED) {
            const dateControl = Section201.getControl('Section201Date');
            if (dateControl) {
                await dateControl.setValue(qcItem201.DATE_INSPECTED);
            }
        }

        if (qcItem201?.INSPECTED_BY) {
            const inspectedByControl = Section201.getControl('Section201InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue([qcItem201.INSPECTED_BY]);
            }
        }

        if (qcItem201?.METHOD) {
            const methodControl = Section201.getControl('Section201Method');
            if (methodControl) {
                await methodControl.setValue(qcItem201.METHOD);
            }
        }

        if (qcItem201?.DECISION_TAKEN) {
            const decisionControl = Section201.getControl('Section201DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue([qcItem201.DECISION_TAKEN]);
            }
        }

    } catch (error) {
        console.error("Error loading Section201 data:", error);
    }
}
