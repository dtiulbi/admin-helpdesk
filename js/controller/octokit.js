import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

export let nekot = 'Z2hwX2lmVW94RGVyaWdxWDdicXg4RzdFNklMczlQTUtGVTJnaVlZZg==';

export let octokit = new Octokit({
  auth: atob(nekot)
});