const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,

  importOrder: [
    '^(react/(.*)$)|^(react$)|^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^(@/lib/(.*)$)|^(@/components/(.*)$)|^(@/styles/(.*)$)',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
};

export default config;