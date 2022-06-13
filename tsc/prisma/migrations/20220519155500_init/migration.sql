-- CreateTable
CREATE TABLE "Person" (
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_name_key" ON "Person"("name");
