-- CreateTable
CREATE TABLE "ReleaseChecklist" (
    "id" TEXT NOT NULL,
    "releaseId" TEXT NOT NULL,
    "prMerged" BOOLEAN NOT NULL DEFAULT false,
    "changelogUpdated" BOOLEAN NOT NULL DEFAULT false,
    "testsPassing" BOOLEAN NOT NULL DEFAULT false,
    "githubReleaseCreated" BOOLEAN NOT NULL DEFAULT false,
    "deployedToDemo" BOOLEAN NOT NULL DEFAULT false,
    "testedInDemo" BOOLEAN NOT NULL DEFAULT false,
    "deployedToProd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReleaseChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseChecklist_releaseId_key" ON "ReleaseChecklist"("releaseId");

-- AddForeignKey
ALTER TABLE "ReleaseChecklist" ADD CONSTRAINT "ReleaseChecklist_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
