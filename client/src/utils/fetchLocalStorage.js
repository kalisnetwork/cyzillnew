export const getLocalStorageAll = () => {
  const listingType = localStorage.getItem('listingType');
  const searchWord = JSON.parse(localStorage.getItem('searchWord'));

  return {
    listing_type: listingType,
    search_word: searchWord,
  };
};
