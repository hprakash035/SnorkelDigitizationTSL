export async function loadSection204Data(pageProxy, qcItem204, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section204 = FormSectionedTable.getSection('Section204Form');
        if (!Section204) {
            throw new Error("Section204Form not found in FormSectionedTable.");
        }

        // Show current section
        await Section204.setVisible(true);

        // Handle next button visibility + next section logic
        const nextButton = Section204.getControl('Section205NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);

            if (flags?.next === false) {
                const Section205Form = FormSectionedTable.getSection('Section205Form');
                if (Section205Form) {
                    await Section205Form.setVisible(true);
                }
            }
        }

        // Populate controls if data exists
        if (qcItem204?.DATE_INSPECTED) {
            const dateControl = Section204.getControl('Section204Date');
            if (dateControl) {
                await dateControl.setValue(qcItem204.DATE_INSPECTED);
            }
        }

        if (qcItem204?.INSPECTED_BY) {
            const inspectedByControl = Section204.getControl('Section204InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue([qcItem204.INSPECTED_BY]);
            }
        }

        if (qcItem204?.METHOD) {
            const methodControl = Section204.getControl('Section204Method');
            if (methodControl) {
                await methodControl.setValue(qcItem204.METHOD);
            }
        }

        if (qcItem204?.DECISION_TAKEN) {
            const decisionControl = Section204.getControl('Section204DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue([qcItem204.DECISION_TAKEN]);
            }
        }
          // ✅ Fill Pipe Numbers dynamically
                for (let i = 1; i <= 12; i++) {
                    const key = `PipeNo${i}`;
                    const ctrl = Section204.getControl(key);
                    if (ctrl && qcItem204[key] !== undefined && qcItem204[key] !== null) {
                        await ctrl.setValue(qcItem204[key]);
                        // console.log(`✔️ ${key} set to`, qcItem121[key]);
                    }
                }

    } catch (error) {
        console.error("Error loading Section204 data:", error);
    }
}
