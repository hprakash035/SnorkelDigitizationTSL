export async function loadSection122DataOutlet(
  pageProxy,
  qcItem122,
  FormSectionedTable,
  attachments = [],
  flags,
  testdataArray = []
) {
  try {
    // --- Section References ---
    const Section122 = FormSectionedTable.getSection('Section122FormOutlet');
    if (!Section122) throw new Error("❌ Section122FormOutlet not found");

    const testHeader = FormSectionedTable.getSection('Section122TestFormNameOutlet');
    const testForm = FormSectionedTable.getSection('Section122TestFormOutlet');

    const dynamicImageSection = FormSectionedTable.getSection('Section122DynamicImageOutlet');
    const userInputImageSection = FormSectionedTable.getSection('Section122UserInputImageOutlet');
    const staticImageSection = FormSectionedTable.getSection('Section122ImageOutlet');

    const binding = pageProxy.getBindingObject();

    // --- Helper Functions ---
    const setHeaderValue = async (ctrlName, value, { asArray = false } = {}) => {
      const c = Section122.getControl(ctrlName);
      if (!c) return;
      const v = asArray ? (value !== undefined && value !== null ? [value] : []) : (value ?? '');
      await c.setValue(v);
      if (c.redraw) await c.redraw();
    };

    const setTestValue = async (ctrlName, value) => {
      if (!testForm) return;
      const c = testForm.getControl(ctrlName);
      if (!c) return;
      await c.setValue(value ?? '');
      if (c.redraw) await c.redraw();
    };

    const compat = (obj, ...keys) =>
      keys.reduce((acc, k) => (acc !== undefined && acc !== null ? acc : obj?.[k]), undefined);

    // --- Header Values ---
    const rawDate = qcItem122?.DATE_INSPECTED;
    const dateVal = rawDate ? new Date(rawDate) : undefined;

    await Section122.setVisible(true);
    await setHeaderValue('Section122DateOutlet', dateVal);
    await setHeaderValue('Section122InspectedByOutlet', qcItem122?.INSPECTED_BY, { asArray: true });
    await setHeaderValue('Section122MethodOutlet', qcItem122?.METHOD);
    await setHeaderValue('Section122DecisionTakenOutlet', qcItem122?.DECISION_TAKEN, { asArray: true });

    // --- Image Logic ---
    if (staticImageSection) await staticImageSection.setVisible(true);

    if (dynamicImageSection && attachments?.length > 0) {
      const first = attachments[0];
      const base64 = first?.file;
      const mime = first?.mimeType || 'image/png';

      if (base64 && base64.length > 100) {
        binding.imageUri = `data:${mime};base64,${base64}`;
        await dynamicImageSection.setVisible(true);
        await dynamicImageSection.redraw();
        await userInputImageSection?.setVisible(false);
      } else {
        await userInputImageSection?.setVisible(true);
      }
    } else {
      await userInputImageSection?.setVisible(true);
    }

    // --- Filter and Sort Test Data (Same as 132 logic) ---
    const testsFor122 = Array.isArray(testdataArray)
      ? testdataArray.filter((t) => {
          const q = (compat(t, 'QUESTION', 'question', 'testname') || '').toLowerCase();
          return (
            q.includes('*7') ||
            q.includes('12.2') ||
            q.includes('gap measurement between 2nd ring brick') ||
            q.includes('center position of the ring brick')
          );
        })
      : [];

    const extractSuffixLetter = (str) => {
      const match = str?.match(/Gap-([A-Z])/i);
      return match ? match[1].toUpperCase() : 'Z'; // Default Z for unknowns
    };

    const sortByPosition = (a, b) => {
      const aLetter = extractSuffixLetter(compat(a, 'POSITION', 'position'));
      const bLetter = extractSuffixLetter(compat(b, 'POSITION', 'position'));
      return aLetter.localeCompare(bLetter);
    };

    const sortedTests = [...testsFor122].sort(sortByPosition);

    // --- Populate up to 4 test entries ---
    await testHeader?.setVisible(true);
    await testForm?.setVisible(true);

    for (let i = 0; i < Math.min(sortedTests.length, 4); i++) {
      const t = sortedTests[i];
      const idx = i + 1;

      const position = compat(t, 'POSITION', 'position') ?? '';
      const tolerance = compat(t, 'TOLERANCE', 'tolerance') ?? '';
      const method = compat(t, 'METHOD', 'method');
      const actualValue = compat(t, 'ACTUAL_VALUE', 'actualvalue', 'actual_value') ?? '';

      await setTestValue(`Section122Position${idx}`, position);
      await setTestValue(`Section122Tolerence${idx}`, tolerance);
      if (method !== undefined && method !== null) {
        await setTestValue(`Section122Method${idx}`, method);
      }
      await setTestValue(`Section122ActualValue${idx}`, actualValue);
    }

    // --- Next Button Logic ---
    if (testForm) {
      const nextBtn = testForm.getControl('Section133NextButton');
      if (nextBtn) {
        if (sortedTests.length > 0) {
          await nextBtn.setVisible(false);
          if (flags?.next === false) {
            const nextSection = FormSectionedTable.getSection('Section133Form');
            await nextSection?.setVisible(true);
          }
        } else {
          await nextBtn.setVisible(true);
        }
      }
    }
  } catch (error) {
    // Handle error
  }
}
