export default async function Section12Visible(clientAPI) {
      const pageProxy = clientAPI.getPageProxy();
    const FormSectionedTable = pageProxy.getControl('FormSectionedTable');
    FormSectionedTable.getSection('Section1Form').getControl('Section1NextButton').setVisible(false);
    const Section12Form =FormSectionedTable.getSection('Section12Form');
    
    Section12Form.setVisible('true');
    return;

   
}
