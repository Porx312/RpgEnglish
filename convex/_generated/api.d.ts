/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as battles from "../battles.js";
import type * as characters from "../characters.js";
import type * as enemies from "../enemies.js";
import type * as http from "../http.js";
import type * as inventory from "../inventory.js";
import type * as items from "../items.js";
import type * as lemonSqueezy from "../lemonSqueezy.js";
import type * as levels from "../levels.js";
import type * as quizzes from "../quizzes.js";
import type * as users from "../users.js";
import type * as worlds from "../worlds.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  battles: typeof battles;
  characters: typeof characters;
  enemies: typeof enemies;
  http: typeof http;
  inventory: typeof inventory;
  items: typeof items;
  lemonSqueezy: typeof lemonSqueezy;
  levels: typeof levels;
  quizzes: typeof quizzes;
  users: typeof users;
  worlds: typeof worlds;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
