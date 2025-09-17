
 import { loadSection111Data } from './loadSection111Data';
import { loadSection112Data } from './loadSection112Data';
import { loadSection113Data } from './loadSection113Data';
import { loadSection121DataOutlet} from './loadSection121DataOutlet';
import { loadSection122DataOutlet } from './loadSection122DataOutlet';


export function loadOutletSectionLoader(sectionKey) {
   const sectionLoaders = {
       '11.1': loadSection111Data,
       '11.2': loadSection112Data,
       '11.3': loadSection113Data,
       '12.1': loadSection121DataOutlet,
       '12.2': loadSection122DataOutlet
   };
   return sectionLoaders[sectionKey];
}
