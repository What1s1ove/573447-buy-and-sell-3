import {readFile} from '~/helpers';
import {HttpCode} from '~/common/enums';
import {IOffer} from '~/common/interfaces';
import {ServerResponse} from '~/common/types';
import {MOCKS_FILE_PATH} from './common';

const getMocks = async (): Promise<IOffer[] | never> => {
  const fileContent = await readFile(MOCKS_FILE_PATH);

  const mocks = JSON.parse(fileContent);

  return mocks;
};

const getOffersListMarkup = (offers: IOffer[]) => {
  const offerListMarkup = `
  <ul>${offers.reduce((offerTemplate, offer) =>
    offerTemplate.concat(`
    <li>${offer.title}</li>
  `), ``)}
  </ul>`;

  return offerListMarkup;
};

const sendResponse = (
  res: ServerResponse,
  statusCode: HttpCode,
  markup: string
) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${markup}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

export {getMocks, getOffersListMarkup, sendResponse};
