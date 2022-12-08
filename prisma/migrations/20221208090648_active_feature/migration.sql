/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Match` table. All the data in the column will be lost.
  - Added the required column `active` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Match] DROP COLUMN [dateTime];

-- AlterTable
ALTER TABLE [dbo].[Stage] ADD [active] BIT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Tournament] ADD [active] BIT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
