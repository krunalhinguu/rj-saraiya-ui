import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./i18next/en.json";
import translationGU from "./i18next/gu.json";

const resources = {
  en: {
    translation: translationEN,
  },
  gu: {
    translation: translationGU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    debug: true,
    lng: localStorage.getItem("i18nextLng"),
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
