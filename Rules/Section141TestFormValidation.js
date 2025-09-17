export default async function Section141TestFormValidation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section141 = form.getSection('Section141TestForm');

        const snorkelNo = pageProxy.binding?.SNORKEL_NO;
        const customerName = pageProxy.binding?.CUSTOMER_NAME;

        // --- Test 1 ---
        const batchNo1 = section141.getControl('Section141TestBatchNo1')?.getValue();
        const water1 = section141.getControl('Section141TestWaterCasteing1')?.getValue();
        const ff1 = section141.getControl('Section141FF1')?.getValue();
        const tf1 = section141.getControl('Section141TF1')?.getValue();
        const settingTime1 = section141.getControl('Section141SettingTime1')?.getValue();

        if (!batchNo1 || !water1 || !ff1 || !tf1 || !settingTime1) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: {
                    Message: 'All values must be entered for Test 1 (Batch No, Water of casting, FF, TF, Setting time).'
                }
            });
        }

        await clientAPI.executeAction({ Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section141TestCreateA.action' });

        // --- Test 2 ---
        const batchNo2 = section141.getControl('Section141TestBatchNo2')?.getValue();
        const water2 = section141.getControl('Section141TestWaterCasteing2')?.getValue();
        const ff2 = section141.getControl('Section141FF2')?.getValue();
        const tf2 = section141.getControl('Section141TF2')?.getValue();
        const settingTime2 = section141.getControl('Section141SettingTime2')?.getValue();

        if (!batchNo2 || !water2 || !ff2 || !tf2 || !settingTime2) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: {
                    Message: 'All values must be entered for Test 2 (Batch No, Water of casting, FF, TF, Setting time).'
                }
            });
        }

        await clientAPI.executeAction({ Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section141TestCreateB.action' });

        // --- Test 3 ---
        const batchNo3 = section141.getControl('Section141TestBatchNo3')?.getValue();
        const water3 = section141.getControl('Section141TestWaterCasteing3')?.getValue();
        const ff3 = section141.getControl('Section141FF3')?.getValue();
        const tf3 = section141.getControl('Section141TF3')?.getValue();
        const settingTime3 = section141.getControl('Section141SettingTime3')?.getValue();

        if (!batchNo3 || !water3 || !ff3 || !tf3 || !settingTime3) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: {
                    Message: 'All values must be entered for Test 3 (Batch No, Water of casting, FF, TF, Setting time).'
                }
            });
        }

        await clientAPI.executeAction({ Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section141TestCreateC.action' });

        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        FormSectionedTable.getSection('Section141TestForm').getControl('Section151NextButton').setVisible(false);

        const Section101Form = FormSectionedTable.getSection('Section151Form');
        Section101Form.setVisible(true);

    } catch (e) {
        console.error('❌ Error in Section141TestFormValidation:', e);
    }
}
