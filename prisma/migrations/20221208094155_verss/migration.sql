BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Stage] ADD CONSTRAINT [Stage_active_df] DEFAULT 0 FOR [active];

-- AlterTable
ALTER TABLE [dbo].[Tournament] ADD CONSTRAINT [Tournament_active_df] DEFAULT 0 FOR [active];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
