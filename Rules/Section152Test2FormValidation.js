export default async function Section152Test2FormValidation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section152 = form.getSection('Section152Test2Form');

        const points = ['A', 'B', 'C', 'D'];
        const missingPoints = [];

        for (const point of points) {
            const position = section152.getControl(`Section152TestPositionGap${point}`)?.getValue();
            const tolerance = section152.getControl(`Section152TestTolerance${point}`)?.getValue();
            const method = section152.getControl(`Section152TestMethod${point}`)?.getValue();
            const actual = section152.getControl(`Section152TestActualGap${point}`)?.getValue();

            if (!position || !tolerance || !method || !actual) {
                missingPoints.push(point);
            }
        }

        if (missingPoints.length > 0) {
            return clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/ValidationFailed.action',
                Properties: {
                    Message: `Please fill in all required fields (Position, Tolerance, Method, Actual Gap) for point(s): ${missingPoints.join(', ')}.`
                }
            });
        }

        // If all points are filled, execute action(s) as needed
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section152Test2CreateA.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section152Test2CreateB.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section152Test2CreateC.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section152Test2CreateD.action'
        });



     
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    FormSectionedTable.getSection('Section152Test2Form').getControl('Section152StaticNextButton').setVisible(false);
     const Section153Form =FormSectionedTable.getSection('Section153Form');
    
     Section153Form.setVisible('true');

   
    } catch (e) {
        console.error("❌ Error in Section152Test2FormValidation:", e);
    }
}
