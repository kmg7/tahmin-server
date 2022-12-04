/*
  Warnings:

  - You are about to drop the column `date` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `stageId` on the `MatchScore` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Match] DROP COLUMN [date];
ALTER TABLE [dbo].[Match] ADD [dateTime] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[MatchScore] DROP COLUMN [stageId];

-- AddForeignKey
ALTER TABLE [dbo].[Match] ADD CONSTRAINT [Match_matchScoreId_fkey] FOREIGN KEY ([matchScoreId]) REFERENCES [dbo].[MatchScore]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
