export default async function Section131TestFormValidationOutlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section131 = form.getSection('Section131TestFormOutlet');

        const snorkelNo = pageProxy.binding?.SNORKEL_NO;
        const customerName = pageProxy.binding?.CUSTOMER_NAME;

     
        const water1 = section131.getControl('Section131WaterCasting1')?.getValue();
        const ff1 = section131.getControl('Section131FF1')?.getValue();
        const tf1 = section131.getControl('Section131TF1')?.getValue();
        const settingTime1 = section131.getControl('Section131SettingTime1')?.getValue();

        if (!water1 || !ff1 || !tf1 || !settingTime1) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: { Message: 'All values must be entered for Test 1 (Water of casting, FF, TF, Setting time).' }
            });
        }

       

     
        await clientAPI.executeAction({ Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section131TestCreateAOutlet.action' });

        // Test 2
        const water2 = section131.getControl('Section131WaterCasting2')?.getValue();
        const ff2 = section131.getControl('Section131FF2')?.getValue();
        const tf2 = section131.getControl('Section131TF2')?.getValue();
        const settingTime2 = section131.getControl('Section131SettingTime2')?.getValue();

        if (!water2 || !ff2 || !tf2 || !settingTime2) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: { Message: 'All values must be entered for Test 2 (Water of casting, FF, TF, Setting time).' }
            });
        }

 
       
        await clientAPI.executeAction({ Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section131TestCreateBOutlet.action' });

        
        const water3 = section131.getControl('Section131WaterCasting3')?.getValue();
        const ff3 = section131.getControl('Section131FF3')?.getValue();
        const tf3 = section131.getControl('Section131TF3')?.getValue();
        const settingTime3 = section131.getControl('Section131SettingTime3')?.getValue();

        if (!water3 || !ff3 || !tf3 || !settingTime3) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: { Message: 'All values must be entered for Test 3 (Water of casting, FF, TF, Setting time).' }
            });
        }


       
        await clientAPI.executeAction({ Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section131TestCreateCOutlet.action' });
        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        
        FormSectionedTable.getSection('Section131TestFormOutlet').getControl('Section141NextButtonOutlet').setVisible(false);
        const Section101Form =FormSectionedTable.getSection('Section141FormOutlet');
        Section101Form.setVisible('true');
        

    } catch (e) {
        console.error('❌ Error in Section131TestFormValidation:', e);
    }
}
