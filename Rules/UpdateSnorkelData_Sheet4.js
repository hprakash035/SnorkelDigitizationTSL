import UpdateSnorkelData_Sheet4Inlet from './UpdateSnorkelData_Sheet4Inlet';
import UpdateSnorkelData_Sheet4Outlet from './UpdateSnorkelData_Sheet4Outlet';

export default async function UpdateSnorkelData_Sheet4(clientAPI) {
    const type = clientAPI.binding.TYPE; // "inlet" or "outlet"
    if (type === 'inlet') {
        return UpdateSnorkelData_Sheet4Inlet(clientAPI);
    } else {
        return UpdateSnorkelData_Sheet4Outlet(clientAPI);
    }
}
