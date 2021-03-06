import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export const FAILURE_RATE = 0.1;
export const HTTP_TRANSACTION_SEC = 500;

class Recruit {
  constructor({
    title,
    content,
    recruit_type,
    job,
    career,
    start_date,
    end_date,
  }) {
    this.id = uuidv4();
    this.title = title;
    this.isPublished = true;
    this.content = content;
    this.recruit_type = recruit_type;
    this.job = job;
    this.career = career;
    this.start_date = start_date;
    this.end_date = end_date;
    this.created_at = dayjs().format("YYYY-MM-DD");
    this.updated_at = dayjs().format("YYYY-MM-DD");
  }
}

const recruits = JSON.parse(
  window.localStorage.getItem("react-state-management-recruits")
) || [
  new Recruit({
    title: "채용1",
    content: "content",
    isPublished: true,
    recruit_type: "ALWAYS",
    job: "DEVELOPMENT",
    career: "NEWCOMER",
    creator: "string",
    start_date: dayjs("2022-01-08").format("YYYY-MM-DD"),
    end_date: dayjs("2022-01-08").format("YYYY-MM-DD"),
    created_at: dayjs().format("YYYY-MM-DD"),
    updated_at: dayjs().format("YYYY-MM-DD"),
  }),
  new Recruit({
    title: "채용2",
    content: "content",
    isPublished: true,
    recruit_type: "ALWAYS",
    job: "DEVELOPMENT",
    career: "NEWCOMER",
    creator: "string",
    start_date: dayjs("2022-01-08").format("YYYY-MM-DD"),
    end_date: dayjs("2022-01-08").format("YYYY-MM-DD"),
    created_at: dayjs().format("YYYY-MM-DD"),
    updated_at: dayjs().format("YYYY-MM-DD"),
  }),
];

const transactionDelay = () =>
  new Promise((res, rej) =>
    setTimeout(() => {
      res();
    }, HTTP_TRANSACTION_SEC)
  );

const syncLocalStorage = () =>
  window.localStorage.setItem(
    "react-state-management-recruits",
    JSON.stringify(recruits)
  );

// recruit api
export default class RecruitsApi {
  static get(id) {
    return transactionDelay().then(
      () =>
        new Promise((res, rej) => {
          if (Math.random() < FAILURE_RATE) {
            rej({
              status: ">= 400",
              message: "status >= 400 error",
            });
          }

          const data =
            id === undefined
              ? recruits
              : recruits.find((recruit) => recruit.id === id);

          res(JSON.parse(JSON.stringify(data)));
        })
    );
  }

  static post(data) {
    return transactionDelay().then(
      () =>
        new Promise((res, rej) => {
          if (Math.random() < FAILURE_RATE) {
            rej({
              status: ">= 400",
              message: "status >= 400 error",
            });
          }

          const recruit = new Recruit(data);

          recruits.push(recruit);
          console.log("db posted", recruits);

          syncLocalStorage();

          res(JSON.parse(JSON.stringify(recruit)));
        })
    );
  }

  static delete(id) {
    return transactionDelay().then(
      () =>
        new Promise((res, rej) => {
          if (Math.random() < FAILURE_RATE) {
            rej({
              status: ">= 400",
              message: "status >= 400 error",
            });
          }

          const deletedIdx = recruits.findIndex((recruit) => recruit.id === id);
          recruits.splice(deletedIdx, 1);
          console.log("db deleted", recruits);

          syncLocalStorage();

          res();
        })
    );
  }

  static patch(id, data) {
    return transactionDelay().then(
      () =>
        new Promise((res, rej) => {
          if (Math.random() < FAILURE_RATE) {
            rej({
              status: ">= 400",
              message: "status >= 400 error",
            });
          }

          const updatedIdx = recruits.findIndex((recruit) => recruit.id === id);
          const updated = {
            ...recruits[updatedIdx],
            ...data,
            updated_at: dayjs().format("YYYY-MM-DD"),
          };
          recruits[updatedIdx] = updated;
          console.log("db updated", recruits);

          syncLocalStorage();

          res(JSON.parse(JSON.stringify(updated)));
        })
    );
  }
}
