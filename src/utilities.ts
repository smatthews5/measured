export const collectIdsAndDocs = (doc: any) => {
  return { id: doc.id, ...doc.data() };
};
