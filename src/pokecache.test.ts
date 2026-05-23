import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";


test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // half a second
  },
  {
    key: "https://example.com/path",
    val: "othertestdata",
    interval: 1000, // one second
  },
])("Test caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
