BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [authId] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_authId_key] UNIQUE NONCLUSTERED ([authId]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Team] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [shName] NVARCHAR(1000) NOT NULL,
    [logoUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Team_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Team_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tournament] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [shName] NVARCHAR(1000) NOT NULL,
    [logoUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Tournament_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Tournament_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Stage] (
    [id] NVARCHAR(1000) NOT NULL,
    [tournamentId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Stage_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Stage_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Match] (
    [id] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [homeTeamId] NVARCHAR(1000) NOT NULL,
    [awayTeamId] NVARCHAR(1000) NOT NULL,
    [matchScoreId] NVARCHAR(1000) NOT NULL,
    [stageId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Match_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Match_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Match_matchScoreId_key] UNIQUE NONCLUSTERED ([matchScoreId])
);

-- CreateTable
CREATE TABLE [dbo].[MatchScore] (
    [id] NVARCHAR(1000) NOT NULL,
    [homeScore] INT,
    [awayScore] INT,
    [stageId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [MatchScore_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [MatchScore_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Prediction] (
    [id] NVARCHAR(1000) NOT NULL,
    [matchId] NVARCHAR(1000) NOT NULL,
    [homeScore] INT NOT NULL,
    [awayScore] INT NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [processed] BIT NOT NULL CONSTRAINT [Prediction_processed_df] DEFAULT 0,
    CONSTRAINT [Prediction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Standings] (
    [id] NVARCHAR(1000) NOT NULL,
    [tournamentId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Standings_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Standings_tournamentId_key] UNIQUE NONCLUSTERED ([tournamentId])
);

-- CreateTable
CREATE TABLE [dbo].[Score] (
    [id] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [tournamentId] NVARCHAR(1000) NOT NULL,
    [standingsId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Score_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Stage] ADD CONSTRAINT [Stage_tournamentId_fkey] FOREIGN KEY ([tournamentId]) REFERENCES [dbo].[Tournament]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Match] ADD CONSTRAINT [Match_stageId_fkey] FOREIGN KEY ([stageId]) REFERENCES [dbo].[Stage]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Match] ADD CONSTRAINT [Match_homeTeamId_fkey] FOREIGN KEY ([homeTeamId]) REFERENCES [dbo].[Team]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Match] ADD CONSTRAINT [Match_awayTeamId_fkey] FOREIGN KEY ([awayTeamId]) REFERENCES [dbo].[Team]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Prediction] ADD CONSTRAINT [Prediction_matchId_fkey] FOREIGN KEY ([matchId]) REFERENCES [dbo].[Match]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Prediction] ADD CONSTRAINT [Prediction_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Standings] ADD CONSTRAINT [Standings_tournamentId_fkey] FOREIGN KEY ([tournamentId]) REFERENCES [dbo].[Tournament]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Score] ADD CONSTRAINT [Score_username_fkey] FOREIGN KEY ([username]) REFERENCES [dbo].[User]([username]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Score] ADD CONSTRAINT [Score_standingsId_fkey] FOREIGN KEY ([standingsId]) REFERENCES [dbo].[Standings]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
