/*
  Warnings:

  - A unique constraint covering the columns `[countryCode,code]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Team] ADD CONSTRAINT [Team_countryCode_code_key] UNIQUE NONCLUSTERED ([countryCode], [code]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
