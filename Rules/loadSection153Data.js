export async function loadSection153Data(pageProxy, qcItem153, FormSectionedTable, attachments, flags, testdataArray) {
    try {
        const Section153 = FormSectionedTable.getSection('Section153Form');
        if (!Section153) {
            throw new Error("Section153Form not found in FormSectionedTable.");
        }

        await Section153.setVisible(true);

        // ---------------------------
        // Hide Next Button
        // ---------------------------
        const nextButton = Section153.getControl('Section153NextButtonInlet');
        if (nextButton) {
            await nextButton.setVisible(false);

            // if (flags?.next === false) {
            //     const Section153StaticImage = FormSectionedTable.getSection('Section153StaticImage');
            //     if (Section153StaticImage) {
            //         await Section153StaticImage.setVisible(true);
            //     }
            //     const Section153UserInputImage = FormSectionedTable.getSection('Section153UserInputImage');
            //     if (Section153UserInputImage) {
            //         await Section153UserInputImage.setVisible(true);
            //     }
            // }
        }

        // ---------------------------
        // Populate form data
        // ---------------------------
        let hasData = false;

        const Section153Date = Section153.getControl('Section153DateInlet');
        if (Section153Date && qcItem153.DATE_INSPECTED) {
            await Section153Date.setValue(qcItem153.DATE_INSPECTED);
            hasData = true;
        }

        const Section153InspectedBy = Section153.getControl('Section153InspectedByInlet');
        if (Section153InspectedBy && qcItem153.INSPECTED_BY) {
            await Section153InspectedBy.setValue([qcItem153.INSPECTED_BY]);
            hasData = true;
        }

        const Section153Method = Section153.getControl('Section153MethodInlet');
        if (Section153Method && qcItem153.METHOD) {
            await Section153Method.setValue(qcItem153.METHOD);
            hasData = true;
        }

        const Section153DecisionTaken = Section153.getControl('Section153DecisionTakenInlet');
        if (Section153DecisionTaken && qcItem153.DECISION_TAKEN) {
            await Section153DecisionTaken.setValue([qcItem153.DECISION_TAKEN]);
            hasData = true;
        }

      for (let i = 1; i <= 12; i++) {
                    const key = `PipeNo${i}`;
                    const ctrl = sectionInlet.getControl(key);
                    if (ctrl && qcItem121[key] !== undefined && qcItem121[key] !== null) {
                        await ctrl.setValue(qcItem121[key]);
                        // console.log(`✔️ ${key} set to`, qcItem121[key]);
                    }
                }
  

    } catch (error) {
        // console.error("Error in loadSection153Data:", error);
    }
}
