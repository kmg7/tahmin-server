/*
  Warnings:

  - A unique constraint covering the columns `[matchId,userId]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Prediction] DROP CONSTRAINT [Prediction_id_matchId_userId_key];

-- CreateIndex
ALTER TABLE [dbo].[Prediction] ADD CONSTRAINT [Prediction_matchId_userId_key] UNIQUE NONCLUSTERED ([matchId], [userId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
