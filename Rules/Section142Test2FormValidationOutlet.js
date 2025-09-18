export default async function Section142Test2FormValidation(clientAPI) {
    try {
        const pageProxy = clientAPI.getPageProxy();
        const form = pageProxy.getControl('FormSectionedTable');
        const section142 = form.getSection('Section142Test2FormOutlet');

        const points = ['A', 'B', 'C', 'D'];
        const missingPoints = [];

        for (const point of points) {
            const position = section142.getControl(`Section142TestPositionGap${point}`)?.getValue();
            const tolerance = section142.getControl(`Section142TestTolerance${point}`)?.getValue();
            const method = section142.getControl(`Section142TestMethod${point}`)?.getValue();
            const actual = section142.getControl(`Section142TestActualGap${point}`)?.getValue();

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
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section142Test2CreateAOutlet.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section142Test2CreateBOutlet.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section142Test2CreateCOutlet.action'
        });
        await clientAPI.executeAction({
            Name: '/TRL_Snorkel_Digitization_TSL/Actions/Section142Test2CreateDOutlet.action'
        });


     
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    FormSectionedTable.getSection('Section142Test2FormOutlet').getControl('Section142StaticNextButton').setVisible(false);
    const Section142Form =FormSectionedTable.getSection('Section151FormOutlet');
    // const Section142Form1 =FormSectionedTable.getSection('Section142UserInputImageOutlet');
  
    Section142Form.setVisible('true');
//  Section142Form1.setVisible('true');

    } catch (e) {
        console.error("❌ Error in Section142Test2FormValidation:", e);
    }
}
