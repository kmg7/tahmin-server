/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[standingsId,username]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Score] DROP COLUMN [tournamentId];

-- CreateIndex
ALTER TABLE [dbo].[Score] ADD CONSTRAINT [Score_standingsId_username_key] UNIQUE NONCLUSTERED ([standingsId], [username]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
