import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    {
      duration: "5s",
      target: 100
    },
    {
      duration: "10s",
      target: 100
    },
    {
      duration: "5s",
      target: 0
    }
  ],
  thresholds: {
    http_req_duration: ["p(99)<1000", "p(95)<700", "avg<500"]
  }
};

export default function () {
  const res = http.post(
    "http://localhost:8080/todo",
    JSON.stringify({
      description: `Todo: ${Math.round(Math.random() * 1000000)}`
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  check(res, {
    "response code was 200": (res) => res.status === 200
  });

  sleep(2);
}
