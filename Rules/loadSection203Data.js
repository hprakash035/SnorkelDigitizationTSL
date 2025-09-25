export async function loadSection203Data(pageProxy, qcItem203, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section203 = FormSectionedTable.getSection('Section203Form');
        if (!Section203) {
            throw new Error("Section203Form not found in FormSectionedTable.");
        }

        // Show current section
        await Section203.setVisible(true);

        // Handle next button visibility + next section logic
        const nextButton = Section203.getControl('Section204NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section203Form = FormSectionedTable.getSection('Section204Form');
                if (Section203Form) {
                    await Section203Form.setVisible(true);
                }
            }
        }

        // Populate controls if data exists
        if (qcItem203?.DATE_INSPECTED) {
            const dateControl = Section203.getControl('Section203Date');
            if (dateControl) {
                await dateControl.setValue(qcItem203.DATE_INSPECTED);
            }
        }

        if (qcItem203?.INSPECTED_BY) {
            const inspectedByControl = Section203.getControl('Section203InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue([qcItem203.INSPECTED_BY]);
            }
        }

        if (qcItem203?.METHOD) {
            const methodControl = Section203.getControl('Section203Method');
            if (methodControl) {
                await methodControl.setValue(qcItem203.METHOD);
            }
        }

        if (qcItem203?.DECISION_TAKEN) {
            const decisionControl = Section203.getControl('Section203DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue([qcItem203.DECISION_TAKEN]);
            }
        }

    } catch (error) {
        console.error("Error loading Section203 data:", error);
    }
}
