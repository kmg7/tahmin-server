/*
  Warnings:

  - You are about to drop the column `moderatorName` on the `Authority` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[featureId,moderatorId]` on the table `Authority` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moderatorId` to the `Authority` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Authority] DROP CONSTRAINT [Authority_moderatorName_fkey];

-- AlterTable
ALTER TABLE [dbo].[Authority] DROP COLUMN [moderatorName];
ALTER TABLE [dbo].[Authority] ADD [moderatorId] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Authority] ADD CONSTRAINT [Authority_featureId_moderatorId_key] UNIQUE NONCLUSTERED ([featureId], [moderatorId]);

-- AddForeignKey
ALTER TABLE [dbo].[Authority] ADD CONSTRAINT [Authority_moderatorId_fkey] FOREIGN KEY ([moderatorId]) REFERENCES [dbo].[Moderator]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
