export type ConventionalCommit = {
  type: string;
  scope: string;
  breaking: boolean;
  message: string;
};

export type CommitType =
  | "feat"
  | "fix"
  | "docs"
  | "style"
  | "refactor"
  | "perf"
  | "test"
  | "build"
  | "ci"
  | "chore"
  | "revert";
