import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiPath, HttpMethod, OfferKey } from '~/common/enums';
import { HttpError } from '~/common/exceptions';
import { IOffer } from '~/common/interfaces';
import { CreatedOffer } from '~/common/types';
import { checkIsOkStatusCode } from './helpers';

type Constructor = {
  baseURL: string;
  timeout: number;
};

class Api {
  #http: AxiosInstance;

  constructor({ baseURL, timeout }: Constructor) {
    this.#http = axios.create({
      baseURL,
      timeout,
    });
  }

  static checkStatus<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    const isOk = checkIsOkStatusCode(response.status);

    if (!isOk) {
      throw new HttpError({
        status: response.status,
        message: `${response.status}: ${response.statusText}`,
      });
    }

    return response;
  }

  static getData<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  static catchError(err: Error): never {
    throw err;
  }

  private load<T>(
    url: string,
    options: AxiosRequestConfig = {
      method: HttpMethod.GET,
    },
  ): Promise<AxiosResponse<T>> {
    return this.#http
      .request<T>({ url, ...options })
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  public getOffers(): Promise<IOffer[]> {
    return this.load<IOffer[]>(ApiPath.OFFERS).then(Api.getData);
  }

  public getOffer(id: IOffer[OfferKey.ID]): Promise<IOffer> {
    return this.load<IOffer>(`${ApiPath.OFFERS}/${id}`).then(Api.getData);
  }

  public search(query: string): Promise<IOffer[]> {
    return this.load<IOffer[]>(ApiPath.SEARCH, {
      params: {
        query,
      },
    }).then(Api.getData);
  }

  public getCategories(): Promise<string[]> {
    return this.load<string[]>(ApiPath.CATEGORIES).then(Api.getData);
  }

  public createOffer(payload: CreatedOffer): Promise<IOffer> {
    return this.load<IOffer>(ApiPath.OFFERS, {
      method: HttpMethod.POST,
      data: payload,
    }).then(Api.getData);
  }
}

export default Api;
