-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "posterUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhilosophyConcept" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhilosophyConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisConcept" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "relevance" TEXT,

    CONSTRAINT "AnalysisConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "voterName" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pathway" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pathway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PathwayItem" (
    "id" TEXT NOT NULL,
    "pathwayId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "PathwayItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "PhilosophyConcept_name_key" ON "PhilosophyConcept"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PhilosophyConcept_slug_key" ON "PhilosophyConcept"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisConcept_analysisId_conceptId_key" ON "AnalysisConcept"("analysisId", "conceptId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_analysisId_voterName_key" ON "Vote"("analysisId", "voterName");

-- CreateIndex
CREATE UNIQUE INDEX "PathwayItem_pathwayId_movieId_key" ON "PathwayItem"("pathwayId", "movieId");

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisConcept" ADD CONSTRAINT "AnalysisConcept_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisConcept" ADD CONSTRAINT "AnalysisConcept_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "PhilosophyConcept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathwayItem" ADD CONSTRAINT "PathwayItem_pathwayId_fkey" FOREIGN KEY ("pathwayId") REFERENCES "Pathway"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathwayItem" ADD CONSTRAINT "PathwayItem_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
