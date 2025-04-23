type NavItem = {
  title: string;
  url: string;
  items?: NavItem[];
};

export const navItems: NavItem[] = [
  { title: 'FAQ', url: '/faq' },
  { title: 'error-handling', url: '/error-handling' },
  { title: 'storage', url: '/storage' },
  { title: 'infinite-scroll', url: '/infinite-scroll' },
  { title: 'maps', url: '/maps' },
  {
    title: 'Data Fetching',
    url: '',
    items: [
      { title: 'useQuery', url: '/data-fetching/use-query' },
      { title: 'useSuspenseQuery', url: '/data-fetching/use-suspense-query' },
      { title: 'prefetch', url: '/data-fetching/prefetch' },
    ],
  },
];
