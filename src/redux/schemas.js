import { schema } from "normalizr";

export const voteCriteria = new schema.Entity("criterias");

export const track = new schema.Entity("tracks", {
  criteriaList: [voteCriteria],
});
