/*
  Warnings:

  - Added the required column `updatedAt` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Stage] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [Stage_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Tournament] ADD [createdAt] DATETIME2 NOT NULL CONSTRAINT [Tournament_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[updatedAt] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
