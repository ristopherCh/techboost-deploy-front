CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] int NOT NULL,
  [ImageUrl] nvarchar(255),
  [DateCreated] datetime NOT NULL
)
GO

CREATE TABLE [Subject] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Resource] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [SubmitterId] int,
  [Creator] nvarchar(255) NOT NULL,
  [MediaTypeId] int,
  [Description] nvarchar(255) NOT NULL,
  [Price] decimal,
  [DatePublished] datetime,
  [ImageUrl] nvarchar(255),
  [ResourceUrl] nvarchar(255)
)
GO

CREATE TABLE [ResourceSubject] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [ResourceId] int NOT NULL,
  [SubjectId] int NOT NULL
)
GO

CREATE TABLE [MediaType] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Review] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [ResourceId] int NOT NULL,
  [ReviewText] nvarchar(255) NOT NULL,
  [ReviewScore] int NOT NULL
)
GO

ALTER TABLE [Resource] ADD FOREIGN KEY ([SubmitterId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [ResourceSubject] ADD FOREIGN KEY ([SubjectId]) REFERENCES [Subject] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [ResourceSubject] ADD FOREIGN KEY ([ResourceId]) REFERENCES [Resource] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Resource] ADD FOREIGN KEY ([MediaTypeId]) REFERENCES [MediaType] ([Id])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([ResourceId]) REFERENCES [Resource] ([Id]) ON DELETE CASCADE
GO
