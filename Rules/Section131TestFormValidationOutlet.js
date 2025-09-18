export default async function Section131TestFormValidationOutlet(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section131 = form.getSection('Section131TestFormOutlet');

        const snorkelNo = pageProxy.binding?.SNORKEL_NO;
        const customerName = pageProxy.binding?.CUSTOMER_NAME;

        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section131TestCreateAOutlet.action'
        });

        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section131TestCreateBOutlet.action'
        });

        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section131TestCreateCOutlet.action'
        });
        


        const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
        FormSectionedTable.getSection('Section131TestFormOutlet')
            .getControl('Section141NextButtonOutlet')
            .setVisible(false);

        const Section101Form = FormSectionedTable.getSection('Section141FormOutlet');
        Section101Form.setVisible(true);

    } catch (e) {
        console.error('❌ Error in Section131TestFormValidationOutlet:', e);
    }
}
