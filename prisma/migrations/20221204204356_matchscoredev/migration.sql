/*
  Warnings:

  - Made the column `homeScore` on table `MatchScore` required. This step will fail if there are existing NULL values in that column.
  - Made the column `awayScore` on table `MatchScore` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[MatchScore] ALTER COLUMN [homeScore] INT NOT NULL;
ALTER TABLE [dbo].[MatchScore] ALTER COLUMN [awayScore] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
