export async function loadSection141DataOutlet(pageProxy, qcItem141, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section141 = FormSectionedTable.getSection('Section141FormOutlet');
        if (!Section141) {
            throw new Error("Section141Form not found in FormSectionedTable.");
        }

        await Section141.setVisible(true);

        const nextButton = Section141.getControl('Section142NextButtonOutlet');

        // 🔹 Hide Next only if data already exists
        if (nextButton) {
            if (qcItem141 && (qcItem141.DATE_INSPECTED || qcItem141.INSPECTED_BY || qcItem141.DECISION_TAKEN)) {
                await nextButton.setVisible(false);

                // if next is disabled via flags, show Section142 directly
                if (flags?.next === false) {
                    const Section142 = FormSectionedTable.getSection('Section142FormOutlet');
                    if (Section142) {
                        await Section142.setVisible(true);
                    }
                }
            } else {
                await nextButton.setVisible(true); // default case → keep visible
            }
        }

        // Populate fields if data exists
        if (qcItem141?.DATE_INSPECTED) {
            await Section141.getControl('Section141Date')?.setValue(qcItem141.DATE_INSPECTED);
        }

        if (qcItem141?.INSPECTED_BY) {
            await Section141.getControl('Section141InspectedBy')?.setValue(qcItem141.INSPECTED_BY);
        }

        if (qcItem141?.METHOD) {
            await Section141.getControl('Section141Method')?.setValue(qcItem141.METHOD);
        }

        if (qcItem141?.DECISION_TAKEN) {
            await Section141.getControl('Section141DecisionTaken')?.setValue(qcItem141.DECISION_TAKEN);
        }

    } catch (error) {
        console.error("Error loading Section141 data:", error);
    }
}
