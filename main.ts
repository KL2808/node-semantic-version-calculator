#! /usr/bin/env node
import { simpleGit, SimpleGit, LogResult } from "simple-git";
import { commitRegex } from "./regex";
import { ConventionalCommit } from "./types";
import { notEmpty } from "./helper";
import { Version } from "./class";
import { spawn } from "child_process";

async function getAllCommitMessages(): Promise<string[]> {
  const git: SimpleGit = simpleGit();
  const logs: LogResult = await git.log();
  const messages = logs.all.map((commit) => commit.message);
  return messages;
}

function getConventionalCommit(message: string): ConventionalCommit | null {
  const matches = message.match(commitRegex);
  if (!matches) return null;
  const conventionalCommit: ConventionalCommit = {
    type: matches.groups!["type"],
    scope: matches.groups!["scope"],
    breaking: matches.groups!["breaking"] === "!",
    message: matches.groups!["message"],
  };
  return conventionalCommit;
}

function calculateVersion(conventionalCommits: ConventionalCommit[]): Version {
  const version = new Version();
  const bumpMinorTypes = ["feat", "style"];
  const bumpFixTypes = ["fix", "refactor", "perf"];
  conventionalCommits.forEach((conventionalCommit) => {
    if (conventionalCommit.breaking) version.major++;
    else if (bumpMinorTypes.includes(conventionalCommit.type)) version.minor++;
    else if (bumpFixTypes.includes(conventionalCommit.type)) version.fix++;
  });
  return version;
}

getAllCommitMessages().then((commits: string[]) => {
  const conventionalCommits: ConventionalCommit[] = commits
    .map(getConventionalCommit)
    .filter(notEmpty);
  console.log(conventionalCommits);

  const version = calculateVersion(conventionalCommits);
  const versionString = version.getVersionString();
  console.log(versionString);

  const v = spawn("npm", ["version", versionString, "--no-git-tag-version"]);
});
