enum SsrOffersPath {
  $OFFER_ID = `/:id`,
  $OFFER_ID_COMMENT = `/:id/comments`,
  EDIT_$OFFER_ID = `/edit/:id`,
  ADD = `/add`,
  CATEGORY_$CATEGORY_ID = `/category/:id`,
}

export { SsrOffersPath };
