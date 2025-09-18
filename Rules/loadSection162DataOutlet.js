export async function loadSection162DataOutlet(
    pageProxy,
    qcItem162,
    FormSectionedTable,
    attachments,
    flags,
    testdataArray
) {
    try {
        const Section162 = FormSectionedTable.getSection('Section162FormOutlet');
        if (!Section162) {
            throw new Error("Section162Form not found in FormSectionedTable.");
        }

        // Always make Section162 visible
        await Section162.setVisible(true);

        // --- Hide Next button after loading ---
        const nextButton = Section162.getControl('Section163NextButton');
        if (nextButton) {
            await nextButton.setVisible(false);
        }

        // --- Conditionally open Section162 if next flag is false ---
        if (flags?.next === false) {
            const Section162Form = FormSectionedTable.getSection('Section163FormOutlet');
            if (Section162Form) {
                await Section162Form.setVisible(true);
            }
        }

        // --- Populate fields if values exist ---
        if (qcItem162?.DATE_INSPECTED) {
            const dateControl = Section162.getControl('Section162Date');
            if (dateControl) {
                await dateControl.setValue(qcItem162.DATE_INSPECTED);
            }
        }

        if (qcItem162?.INSPECTED_BY) {
            const inspectedByControl = Section162.getControl('Section162InspectedBy');
            if (inspectedByControl) {
                await inspectedByControl.setValue(qcItem162.INSPECTED_BY);
            }
        }

        if (qcItem162?.METHOD) {
            const methodControl = Section162.getControl('Section162Method');
            if (methodControl) {
                await methodControl.setValue(qcItem162.METHOD);
            }
        }

        if (qcItem162?.DECISION_TAKEN) {
            const decisionControl = Section162.getControl('Section162DecisionTaken');
            if (decisionControl) {
                await decisionControl.setValue(qcItem162.DECISION_TAKEN);
            }
        }

    } catch (error) {
        console.error("Error loading Section162 data:", error);
    }
}
