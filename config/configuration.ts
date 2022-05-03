export default () => ({
  tenancyDbConnections: {
    bselscript: process.env.BSELSCRIPT_DB_CONN,
    elal: process.env.ELAL_DB_CONN,
    sheba: process.env.SHEBA_DB_CONN,
    intel: process.env.INTEL_DB_CONN,
    ceragon: process.env.CERAGON_DB_CONN,
  },

  lang: {
    fallbackLanguage: 'en',
  },
});
