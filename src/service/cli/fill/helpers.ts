const generateInsertSql = (tableName: string, rows: string[]): string => {
  const sqlComment = `/* ${tableName} */ `;
  const sqlInsert = `INSERT INTO ${tableName} VALUES`;
  const sqlRows = `  ${rows.join(`,\n  `)};`;

  return [sqlComment, sqlInsert, sqlRows].join(`\n`).trim();
};

const joinSqlCommands = (...sqlCommands: string[]): string => {
  const joinedSqlCommands = sqlCommands.join(`\n\n`).trim();

  return joinedSqlCommands;
};

const generateCategoriesSqlRows = (categories: string[]): string[] => {
  const categoriesSql = categories.map(
    (category) => `(DEFAULT, '${category}')`,
  );

  return categoriesSql;
};

const generateOfferTypesSqlRows = (offerTypes: string[]): string[] => {
  const offerTypesSql = offerTypes.map(
    (offerType) => `(DEFAULT, '${offerType}')`,
  );

  return offerTypesSql;
};

export {
  generateInsertSql,
  joinSqlCommands,
  generateCategoriesSqlRows,
  generateOfferTypesSqlRows
};
