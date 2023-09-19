const { get_i18n_str, languages } = require("../../languages/def");

const get_i18n_link = (code, link) => `${code === "en" ? '' : '/' + code}${link}`;

const getI18NSidebar = (langCode) => [
  {
    text: get_i18n_str(langCode, "getting-started", "Getting Started"),
    link: get_i18n_link(langCode, "/getting-started/"),
    collapsible: true,
    children: [
      {
        text: get_i18n_str(langCode, "ar", "AR-io"),
        link: get_i18n_link(langCode, "/getting-started/ar"),
      },
      {
        text: get_i18n_str(langCode, "sarco", "Sarcophagus"),
        link: get_i18n_link(langCode, "/getting-started/sarco"),
      },
      {
        text: get_i18n_str(langCode, "cess", "CESS"),
        link: get_i18n_link(langCode, "/getting-started/cess"),
      },
    ],
  },
  {
    text: get_i18n_str(langCode, "blog"),
    link: get_i18n_link(langCode, "/kits/"),
    collapsible: true,
  },
];

const createSidebars = () => {
  return languages.reduce((sidebars, { code }) => {
    sidebars[`/${code}/`] = getI18NSidebar(code);
    return sidebars;
  }, {
    "/": getI18NSidebar("en")
  });
}

module.exports = createSidebars;