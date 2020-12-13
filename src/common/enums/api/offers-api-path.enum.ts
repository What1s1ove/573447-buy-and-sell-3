enum OffersApiPath {
  ROOT = `/`,
  $OFFER_ID = `/:offerId`,
  $OFFER_ID_COMMENTS = `/:offerId/comments`,
  $OFFER_ID_COMMENTS_$COMMENT_ID = `/:offerId/comments/:commentId`,
}

export { OffersApiPath };
