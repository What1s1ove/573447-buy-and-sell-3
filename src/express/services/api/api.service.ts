import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { ApiPath, HttpCode, HttpMethod, OfferKey } from '~/common/enums';
import { HttpError } from '~/common/exceptions';
import { IComment, IOffer, IUser } from '~/common/interfaces';
import {
  CreatedComment,
  CreatedOffer,
  CreatedUserPayload,
  ErrorResponse,
  OffersWithCount,
  PaginationPayload,
} from '~/common/types';

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

  static getData<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  static catchError(err: AxiosError<ErrorResponse>): never {
    const { response } = err;
    const status = response?.status ?? HttpCode.INTERNAL_SERVER_ERROR;
    const messages = response?.data.messages ?? [];

    throw new HttpError({
      status,
      messages,
    });
  }

  private load<T>(
    url: string,
    options: AxiosRequestConfig = {
      method: HttpMethod.GET,
    },
  ): Promise<T> {
    return this.#http
      .request<T>({ url, ...options })
      .then(Api.getData)
      .catch(Api.catchError);
  }

  public getOffers(): Promise<IOffer[]> {
    return this.load<IOffer[]>(ApiPath.OFFERS);
  }

  public getPageOffers({
    offset,
    limit,
  }: PaginationPayload): Promise<OffersWithCount> {
    return this.load<OffersWithCount>(ApiPath.OFFERS, {
      params: {
        offset,
        limit,
      },
    });
  }

  public getOffer(id: IOffer[OfferKey.ID]): Promise<IOffer> {
    return this.load<IOffer>(`${ApiPath.OFFERS}/${id}`);
  }

  public search(query: string): Promise<IOffer[]> {
    return this.load<IOffer[]>(ApiPath.SEARCH, {
      params: {
        query,
      },
    });
  }

  public getCategories(): Promise<string[]> {
    return this.load<string[]>(ApiPath.CATEGORIES);
  }

  public createOffer(payload: CreatedOffer): Promise<IOffer> {
    return this.load<IOffer>(ApiPath.OFFERS, {
      method: HttpMethod.POST,
      data: payload,
    });
  }

  public updateOffer(
    offerId: IOffer[OfferKey.ID],
    payload: CreatedOffer,
  ): Promise<IOffer> {
    return this.load<IOffer>(`${ApiPath.OFFERS}/${offerId}`, {
      method: HttpMethod.PUT,
      data: payload,
    });
  }

  public createComment(
    offerId: IOffer[OfferKey.ID],
    payload: CreatedComment,
  ): Promise<IComment> {
    return this.load<IComment>(`${ApiPath.OFFERS}/${offerId}/comments`, {
      method: HttpMethod.POST,
      data: payload,
    });
  }

  public registerUser(payload: CreatedUserPayload): Promise<IUser> {
    return this.load<IUser>(ApiPath.USERS, {
      method: HttpMethod.POST,
      data: payload,
    });
  }
}

export default Api;
