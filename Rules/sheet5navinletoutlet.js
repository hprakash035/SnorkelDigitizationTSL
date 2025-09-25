/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function sheet5navinletoutlet(clientAPI) {
     const pageProxy = clientAPI.getPageProxy();
        const binding = pageProxy.getBindingObject();
        
    
        const type = binding.TYPE?.toLowerCase();
        if (type === 'inlet') {
       clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2Sheet6.action'
            });
    } else {
        clientAPI.executeAction({
                Name: '/TRL_Snorkel_Digitization_TSL/Actions/Nav2FinalInspection.action'
            });
    }
       
}
