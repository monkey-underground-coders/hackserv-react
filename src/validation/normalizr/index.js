import { schema } from "normalizr";

export const voteCriteria = new schema.Entity("criterias");

export const user = new schema.Entity("users");

export const team = new schema.Entity("teams", {
  members: [user],
});

export const track = new schema.Entity("tracks", {
  criteriaList: [voteCriteria],
  teams: [team],
});