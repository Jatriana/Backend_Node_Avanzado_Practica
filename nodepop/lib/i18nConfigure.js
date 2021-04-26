'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['EN', 'ES'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'EN',
  autoReload: true, // observe los cambios en los archivos JSON para volver a cargar la configuración regional en las actualizaciones; el valor predeterminado es falso
  syncFiles: true, // sincroniza la información de la configuración regional en todos los archivos; el valor predeterminado es falso
  cookie:'nodepop-locale'
});

i18n.setLocale('EN');

module.exports = i18n;
