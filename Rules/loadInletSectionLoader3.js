
 import { loadSection111Data } from './loadSection111Data';
import { loadSection112Data } from './loadSection112Data';
import { loadSection113Data } from './loadSection113Data';
import { loadSection114Data } from './loadSection114Data';
import { loadSection121Data} from './loadSection121Data';
import { loadSection122Data } from './loadSection122Data';


export function loadInletSectionLoader(sectionKey) {
    const sectionLoaders = {
       
        '11.1': loadSection111Data,
        '11.2': loadSection112Data,
        '11.3': loadSection113Data,
        '11.4': loadSection114Data,
        '12.1': loadSection121Data,
        '12.2': loadSection122Data
    };
    return sectionLoaders[sectionKey];
}
