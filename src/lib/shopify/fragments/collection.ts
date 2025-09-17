const collectionFragment = `
  fragment collection on Collection {
    handle
    title
    description
    updatedAt
    image { url altText width height }
    seo { ...seo }
  }
`;
export default collectionFragment;
