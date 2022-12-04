/*
  Warnings:

  - You are about to drop the column `matchScoreId` on the `Match` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Match] DROP CONSTRAINT [Match_matchScoreId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Match] DROP CONSTRAINT [Match_matchScoreId_key];

-- AlterTable
ALTER TABLE [dbo].[Match] DROP COLUMN [matchScoreId];

-- AlterTable
ALTER TABLE [dbo].[MatchScore] ADD [matchId] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
