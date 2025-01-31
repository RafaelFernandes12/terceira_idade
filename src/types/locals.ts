import { courses } from "./courses";

export type locals = {
  id: number;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
  hour: "H07_00_TO_08_00" | "H08_00_TO_09_00" | "H09_00_TO_10_00";
  place: string;
  courses: courses[];
};
