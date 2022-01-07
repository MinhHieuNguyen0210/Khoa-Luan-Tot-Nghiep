import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';
import messageSquareOutline from '@iconify/icons-eva/message-square-outline';
import shoppingCartOutline from '@iconify/icons-eva/shopping-cart-outline';
import layersOutline from '@iconify/icons-eva/layers-outline';
import percentOutline from '@iconify/icons-eva/percent-outline';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Account',
    path: '/dashboard/account',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Categories',
    path: '/dashboard/categories',
    icon: getIcon(layersOutline)
  },
  {
    title: 'Order',
    path: '/dashboard/order',
    icon: getIcon(shoppingCartOutline)
  },
  {
    title: 'Feedback',
    path: '/dashboard/feedback',
    icon: getIcon(messageSquareOutline)
  },
  {
    title: 'Voucher',
    path: '/dashboard/voucher',
    icon: getIcon(percentOutline)
  }

  // {
  //   title: 'Revenue',
  //   path: '/dashboard/revenue',
  //   icon: getIcon(cubeFill)
  // }
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
