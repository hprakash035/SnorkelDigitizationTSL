export async function loadSection131DataOutlet(pageProxy, qcItem131, FormSectionedTable, attachments, flags, testdataArray) {
  try {
    const Section131 = FormSectionedTable.getSection('Section131FormOutlet');
    if (!Section131) {
      throw new Error("Section131Form not found in FormSectionedTable.");
    }
    await Section131.setVisible(true);

    const nextButton = Section131.getControl('Section131TestNextButtonOutlet');
    if (nextButton) {
      await nextButton.setVisible(false);

      if (flags?.next === false) {
        const Section131TestNameForm = FormSectionedTable.getSection('Section131TestFormNameOutlet');
        if (Section131TestNameForm) {
          await Section131TestNameForm.setVisible(true);
        }

        const Section131TestForm = FormSectionedTable.getSection('Section131TestFormOutlet');
        if (Section131TestForm) {
          await Section131TestForm.setVisible(true);
        }
      }
    }

    // --- Meta info controls ---
    const Section131Date31Control = Section131.getControl('Section131DateOutlet');
    if (Section131Date31Control && qcItem131.DATE_INSPECTED) {
      await Section131Date31Control.setValue(qcItem131.DATE_INSPECTED);
    }

    const Section131InspectedBy31Control = Section131.getControl('Section131InspectedByOutlet');
    if (Section131InspectedBy31Control && qcItem131.INSPECTED_BY) {
      await Section131InspectedBy31Control.setValue([qcItem131.INSPECTED_BY]);
    }

    const Section131InspectionMethod31Control = Section131.getControl('Section131MethodOutlet');
    if (Section131InspectionMethod31Control && qcItem131.METHOD) {
      await Section131InspectionMethod31Control.setValue(qcItem131.METHOD);
    }

    const Section131DecisionTaken31Control = Section131.getControl('Section131DecisionTakenOutlet');
    if (Section131DecisionTaken31Control && qcItem131.DECISION_TAKEN) {
      await Section131DecisionTaken31Control.setValue([qcItem131.DECISION_TAKEN]);
    }

    // --- Handle Section131TestForm ---
    const testForm = FormSectionedTable.getSection('Section131TestFormOutlet');
    if (!testForm) {
      return;
    }
    await testForm.setVisible(true);

    // Helper for null-safe values
    const safeVal = (val) => {
      if (val === null || val === undefined || val === 'null' || val === 'undefined') {
        return '';
      }
      return String(val).trim();
    };

    // ✅ Collect all "outer castable workablity" tests
   const parsedTestDataArray = testdataArray
  .filter(item => {
    const name = (item.testname || '').toLowerCase();
    return name.includes('*8') ;
  })
  .map(item => ({
    batchNo: safeVal(item.batchNo),
    water: safeVal(item.watercasting || item.water),
    ff1: safeVal(item.ff1),
    ff2: safeVal(item.ff2),
    tf1: safeVal(item.tf1),
    tf2: safeVal(item.tf2),
    settingtime: safeVal(item.settleduration || item.settingtime),
    remark: safeVal(item.remark)
  }));


    // console.log("✅ Parsed Section131 data:", parsedTestDataArray);

    // 🔗 Control mapping for 3 rows (full set)
    const rowConfig = [
      {
        batchNo: 'Section131TestBatchNo1',
        water: 'Section131TestWaterCasteing1',
        ff1: 'Section131FF1',
        ff2: 'Section131FF12',
        tf1: 'Section131TF1',
        tf2: 'Section131TF12',
        st: 'Section131SettingTime1',
        remark: 'Section131TestRemark1'
      },
      {
        batchNo: 'Section131TestBatchNo2',
        water: 'Section131TestWaterCasteing2',
        ff1: 'Section131FF2',
        ff2: 'Section131FF22',
        tf1: 'Section131TF2',
        tf2: 'Section131TF22',
        st: 'Section131SettingTime2',
        remark: 'Section131TestRemark2'
      },
      {
        batchNo: 'Section131TestBatchNo3',
        water: 'Section131TestWaterCasteing3',
        ff1: 'Section131FF3',
        ff2: 'Section131FF32',
        tf1: 'Section131TF3',
        tf2: 'Section131TF32',
        st: 'Section131SettingTime3',
        remark: 'Section131TestRemark3'
      }
    ];

    let dataMapped = false;

    // ✅ Map each entry sequentially
    for (let idx = 0; idx < parsedTestDataArray.length; idx++) {
      const test = parsedTestDataArray[idx];
      const config = rowConfig[idx];
      if (!config) continue;

      const batchCtrl = testForm.getControl(config.batchNo);
      const waterCtrl = testForm.getControl(config.water);
      const ff1Ctrl = testForm.getControl(config.ff1);
      const ff2Ctrl = testForm.getControl(config.ff2);
      const tf1Ctrl = testForm.getControl(config.tf1);
      const tf2Ctrl = testForm.getControl(config.tf2);
      const stCtrl = testForm.getControl(config.st);
      const remarkCtrl = testForm.getControl(config.remark);

      if (batchCtrl) { await batchCtrl.setValue(test.batchNo); await batchCtrl.redraw(); dataMapped = true; }
      if (waterCtrl) { await waterCtrl.setValue(test.water); await waterCtrl.redraw(); dataMapped = true; }
      if (ff1Ctrl)   { await ff1Ctrl.setValue(test.ff1); await ff1Ctrl.redraw(); dataMapped = true; }
      if (ff2Ctrl)   { await ff2Ctrl.setValue(test.ff2); await ff2Ctrl.redraw(); dataMapped = true; }
      if (tf1Ctrl)   { await tf1Ctrl.setValue(test.tf1); await tf1Ctrl.redraw(); dataMapped = true; }
      if (tf2Ctrl)   { await tf2Ctrl.setValue(test.tf2); await tf2Ctrl.redraw(); dataMapped = true; }
      if (stCtrl)    { await stCtrl.setValue(test.settingtime); await stCtrl.redraw(); dataMapped = true; }
      if (remarkCtrl){ await remarkCtrl.setValue(test.remark); await remarkCtrl.redraw(); dataMapped = true; }
    }

    // // Handle Next button visibility for Section92
    // const nextButtonTest = testForm.getControl('Section141NextButtonOutlet');
    // if (nextButtonTest && flags?.next === false) {
    //   const nextSection = FormSectionedTable.getSection('Section141FormOutlet');
    //   if (nextSection) {
    //     await nextSection.setVisible(true);
    //   }
    // }

    // ✅ If data mapped, show Section101Form & hide its Next button
    if (dataMapped) {
      const section101 = FormSectionedTable.getSection('Section141FormOutlet');
      if (section101) {
        await section101.setVisible(true);
      }
      const section101NextBtn = FormSectionedTable.getControl('Section141NextButtonOutlet');
      if (section101NextBtn) {
        await section101NextBtn.setVisible(false);
      }
    }

  } catch (error) {
    console.error("❌ Error in loadSection131Data:", error);
  }
}
