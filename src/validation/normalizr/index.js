import { schema } from "normalizr";

export const voteCriteria = new schema.Entity("criterias");

export const team = new schema.Entity("teams");

export const track = new schema.Entity("tracks", {
  criteriaList: [voteCriteria],
  teams: [team],
});
