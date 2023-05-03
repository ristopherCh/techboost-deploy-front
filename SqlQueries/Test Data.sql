-- Create some example users
INSERT INTO [UserProfile] ([Name], [Email], [FirebaseUserId], [ImageUrl], [DateCreated])
VALUES
('John Smith', 'johnsmith@example.com', 1234, 'https://example.com/johnsmith.jpg', GETDATE()),
('Jane Doe', 'janedoe@example.com', 5678, 'https://example.com/janedoe.jpg', GETDATE()),
('Bob Johnson', 'bobjohnson@example.com', 91011, 'https://example.com/bobjohnson.jpg', GETDATE())

-- Create some example subjects
INSERT INTO [Subject] ([Name])
VALUES
('JavaScript'),
('Python'),
('Java'),
('C#'),
('HTML/CSS')

-- Create some example media types
INSERT INTO [MediaType] ([Name])
VALUES
('Online course'),
('Book'),
('Video series')

-- Create some example resources
INSERT INTO [Resource] ([Name], [SubmitterId], [Creator], [MediaTypeId], [Description], [Price], [DatePublished], [ImageUrl], [ResourceUrl])
VALUES
('Algebra 1', 1, 'Khan Academy', 1, 'A series of videos explaining algebra', 0, GETDATE(), 'https://example.com/algebra.jpg', 'https://example.com/algebra.mp4'),
('Photosynthesis', 2, 'Crash Course', 1, 'A video explaining photosynthesis', 0, GETDATE(), 'https://example.com/photosynthesis.jpg', 'https://example.com/photosynthesis.mp4'),
('The Civil War', 1, 'History.com', 3, 'An article about the American Civil War', 0, GETDATE(), 'https://example.com/civilwar.jpg', 'https://example.com/civilwar.html'),
('Introduction to Painting', 3, 'Bob Ross', 2, 'An audio lecture about painting', 0, GETDATE(), 'https://example.com/painting.jpg', 'https://example.com/painting.mp3')

-- Create some example resource subjects
INSERT INTO [ResourceSubject] ([ResourceId], [SubjectId])
VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(4, 5)

-- Create some example reviews
INSERT INTO [Review] ([UserId], [ResourceId], [ReviewText], [ReviewScore])
VALUES
(1, 2, 'Great video!', 5),
(2, 1, 'This really helped me understand algebra', 4),
(3, 4, 'Bob Ross is the best', 5)