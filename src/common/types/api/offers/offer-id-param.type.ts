import { RequestParam } from "~/common/enums";

type OfferIdParam = {
  [RequestParam.OFFER_ID]: string;
  [RequestParam.COMMENT_ID]: string;
};

export { OfferIdParam };
