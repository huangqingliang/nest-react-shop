module.exports = {
  siteName: 'eshop-admin',
  copyright: 'eshop-admin ©2019 qizhenshuai',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true,
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],
  i18n: {
    languages: [
      {
        key: 'pt-br',
        title: 'Português',
        flag: '/portugal.svg',
      },
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh',
  }
}