export default async function Section102Test2FormValidation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section102 = form.getSection('Section102Test2Form');

        const points = ['A', 'B', 'C', 'D'];
        const missingPoints = [];

        for (const point of points) {
            const position = section102.getControl(`Section102TestPositionGap${point}`)?.getValue();
            const tolerance = section102.getControl(`Section102TestTolerance${point}`)?.getValue();
            const method = section102.getControl(`Section102TestMethod${point}`)?.getValue();
            const actual = section102.getControl(`Section102TestActualGap${point}`)?.getValue();

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
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section102Test2CreateA.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section102Test2CreateB.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section102Test2CreateC.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section102Test2CreateD.action'
        });


     
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    FormSectionedTable.getSection('Section102Test2Form').getControl('Section102StaticNextButton').setVisible(false);
    const Section103Form =FormSectionedTable.getSection('Section103Form');
    // const Section102Form1 =FormSectionedTable.getSection('Section102UserInputImage');
    Section103Form.setVisible('true');
   

    } catch (e) {
        console.error("❌ Error in Section102Test2FormValidation:", e);
    }
}
