export interface ReleaseChecklist {
  id: string;
  releaseId: string;
  prMerged: boolean;
  changelogUpdated: boolean;
  testsPassing: boolean;
  githubReleaseCreated: boolean;
  deployedToDemo: boolean;
  testedInDemo: boolean;
  deployedToProd: boolean;
}

export interface Release {
  id: string;
  name: string;
  date: string;
  status: string;
  additionalInfo: string | null;
  createdAt: string;
  checklist?: ReleaseChecklist;
}
