/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/TRL_Snorkel_Digitization_TSL/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/TRL_Snorkel_Digitization_TSL/Actions/TRL_Snorkel_CAP_SRV/QC_HEADER/QC_HEADER_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}