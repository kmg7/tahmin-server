BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Stage] DROP CONSTRAINT [Stage_tournamentId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Stage] ALTER COLUMN [tournamentId] NVARCHAR(1000) NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Stage] ADD CONSTRAINT [Stage_tournamentId_fkey] FOREIGN KEY ([tournamentId]) REFERENCES [dbo].[Tournament]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
