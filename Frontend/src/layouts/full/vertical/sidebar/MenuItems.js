import {
  IconAperture,
  IconShoppingCart,
  
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Service',
    icon: IconShoppingCart,
    href: '/dashboard/service',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Service Histroy',
    icon: IconAperture,
    href: '/dashboard/servicehistory',
  },
]
export default Menuitems;
