using Microsoft.AspNetCore.Connections;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class ResourceRepository : BaseRepository, IResourceRepository
	{
		public ResourceRepository(IConfiguration configuration) : base(configuration) { }

		public List<Resource> GetAll()
		{
			var resources = new List<Resource>();
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Resource.Id, Resource.Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl, 
							MediaType.Name AS MediaTypeName,
							ResourceSubject.Id AS ResourceSubjectId,
							Subject.Id AS SubjectId, Subject.Name AS SubjectName
							FROM Resource
							LEFT JOIN MediaType ON Resource.MediaTypeId = MediaType.Id
							LEFT JOIN ResourceSubject ON Resource.Id = ResourceSubject.ResourceId
							LEFT JOIN Subject ON Subject.Id = ResourceSubject.SubjectId";
					using (SqlDataReader reader = cmd.ExecuteReader())
					{

						while (reader.Read())
						{
							var resourceId = DbUtils.GetInt(reader, "Id");
							var existingResource = resources.FirstOrDefault(r => r.Id == resourceId);
							if (existingResource == null)
							{
								existingResource = new Resource()
								{
									Id = DbUtils.GetInt(reader, "Id"),
									Name = DbUtils.GetString(reader, "Name"),
									SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
									Creator = DbUtils.GetString(reader, "Creator"),
									Description = DbUtils.GetString(reader, "Description"),
									Price = reader.GetDecimal(reader.GetOrdinal("Price")),
									DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
									ResourceUrl = DbUtils.GetString(reader, "ResourceUrl"),
									MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
									MediaType = new MediaType()
									{
										Id = DbUtils.GetInt(reader, "MediaTypeId"),
										Name = DbUtils.GetString(reader, "MediaTypeName")
									},
									ResourceSubjects = new List<ResourceSubject>(),
									Subjects = new List<Subject>(),
									Reviews = new List<Review>()
								};
								resources.Add(existingResource);
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ResourceSubjectId")))
							{
								existingResource.ResourceSubjects.Add(new ResourceSubject()
								{
									Id = DbUtils.GetInt(reader, "ResourceSubjectId"),
									ResourceId = DbUtils.GetInt(reader, "Id"),
									SubjectId = DbUtils.GetInt(reader, "SubjectId")
								});
							}
							if (!reader.IsDBNull(reader.GetOrdinal("SubjectId")))
							{
								existingResource.Subjects.Add(new Subject()
								{
									Id = DbUtils.GetInt(reader, "SubjectId"),
									Name = DbUtils.GetString(reader, "SubjectName")
								});
							}
						}

					}
					AddReviewsToResource(cmd, resources);
				}
			}
			return resources;
		}

		public List<Resource> GetResourcesByMediaType(string mediaType)
		{
			var resources = new List<Resource>();
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Resource.Id, Resource.Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl, 
							MediaType.Name AS MediaTypeName,
							ResourceSubject.Id AS ResourceSubjectId,
							Subject.Id AS SubjectId, Subject.Name AS SubjectName
							FROM Resource
							LEFT JOIN MediaType ON Resource.MediaTypeId = MediaType.Id
							LEFT JOIN ResourceSubject ON Resource.Id = ResourceSubject.ResourceId
							LEFT JOIN Subject ON Subject.Id = ResourceSubject.SubjectId
							WHERE MediaType.Name = @MediaType";

					DbUtils.AddParameter(cmd, "@MediaType", mediaType);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{

						while (reader.Read())
						{
							var resourceId = DbUtils.GetInt(reader, "Id");
							var existingResource = resources.FirstOrDefault(r => r.Id == resourceId);
							if (existingResource == null)
							{
								existingResource = new Resource()
								{
									Id = DbUtils.GetInt(reader, "Id"),
									Name = DbUtils.GetString(reader, "Name"),
									SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
									Creator = DbUtils.GetString(reader, "Creator"),
									Description = DbUtils.GetString(reader, "Description"),
									Price = reader.GetDecimal(reader.GetOrdinal("Price")),
									DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
									ResourceUrl = DbUtils.GetString(reader, "ResourceUrl"),
									MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
									MediaType = new MediaType()
									{
										Id = DbUtils.GetInt(reader, "MediaTypeId"),
										Name = DbUtils.GetString(reader, "MediaTypeName")
									},
									ResourceSubjects = new List<ResourceSubject>(),
									Subjects = new List<Subject>(),
									Reviews = new List<Review>()
								};
								resources.Add(existingResource);
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ResourceSubjectId")))
							{
								existingResource.ResourceSubjects.Add(new ResourceSubject()
								{
									Id = DbUtils.GetInt(reader, "ResourceSubjectId"),
									ResourceId = DbUtils.GetInt(reader, "Id"),
									SubjectId = DbUtils.GetInt(reader, "SubjectId")
								});
							}
							if (!reader.IsDBNull(reader.GetOrdinal("SubjectId")))
							{
								existingResource.Subjects.Add(new Subject()
								{
									Id = DbUtils.GetInt(reader, "SubjectId"),
									Name = DbUtils.GetString(reader, "SubjectName")
								});
							}
						}

					}
					AddReviewsToResource(cmd, resources);
				}
			}
			return resources;
		}


		public List<Resource> GetResourcesByUserId(int userId)
		{
			var resources = new List<Resource>();
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
                SELECT Resource.Id, Resource.Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl, 
                MediaType.Name AS MediaTypeName,
                ResourceSubject.Id AS ResourceSubjectId,
                Subject.Id AS SubjectId, Subject.Name AS SubjectName
                FROM Resource
                LEFT JOIN MediaType ON Resource.MediaTypeId = MediaType.Id
                LEFT JOIN ResourceSubject ON Resource.Id = ResourceSubject.ResourceId
                LEFT JOIN Subject ON Subject.Id = ResourceSubject.SubjectId
                WHERE Resource.SubmitterId = @UserId";

					DbUtils.AddParameter(cmd, "@UserId", userId);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							var resourceId = DbUtils.GetInt(reader, "Id");
							var existingResource = resources.FirstOrDefault(r => r.Id == resourceId);
							if (existingResource == null)
							{
								existingResource = new Resource()
								{
									Id = DbUtils.GetInt(reader, "Id"),
									Name = DbUtils.GetString(reader, "Name"),
									SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
									Creator = DbUtils.GetString(reader, "Creator"),
									Description = DbUtils.GetString(reader, "Description"),
									Price = reader.GetDecimal(reader.GetOrdinal("Price")),
									DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
									ResourceUrl = DbUtils.GetString(reader, "ResourceUrl"),
									MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
									MediaType = new MediaType()
									{
										Id = DbUtils.GetInt(reader, "MediaTypeId"),
										Name = DbUtils.GetString(reader, "MediaTypeName")
									},
									ResourceSubjects = new List<ResourceSubject>(),
									Subjects = new List<Subject>(),
									Reviews = new List<Review>()
								};
								resources.Add(existingResource);
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ResourceSubjectId")))
							{
								existingResource.ResourceSubjects.Add(new ResourceSubject()
								{
									Id = DbUtils.GetInt(reader, "ResourceSubjectId"),
									ResourceId = DbUtils.GetInt(reader, "Id"),
									SubjectId = DbUtils.GetInt(reader, "SubjectId")
								});
							}
							if (!reader.IsDBNull(reader.GetOrdinal("SubjectId")))
							{
								existingResource.Subjects.Add(new Subject()
								{
									Id = DbUtils.GetInt(reader, "SubjectId"),
									Name = DbUtils.GetString(reader, "SubjectName")
								});
							}
						}
					}

					AddReviewsToResource(cmd, resources);
				}
			}

			return resources;
		}

		public List<Resource> GetResourcesBySubject(string subject)
		{
			var resources = new List<Resource>();
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText =
							@"SELECT Resource.Id, Resource.Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl, 
							MediaType.Name AS MediaTypeName,
							ResourceSubject.Id AS ResourceSubjectId,
							Subject.Id AS SubjectId, Subject.Name AS SubjectName
							FROM Resource
							LEFT JOIN MediaType ON Resource.MediaTypeId = MediaType.Id
							LEFT JOIN ResourceSubject ON Resource.Id = ResourceSubject.ResourceId
							LEFT JOIN Subject ON Subject.Id = ResourceSubject.SubjectId
							WHERE Resource.Id IN 
								(SELECT Resource.Id FROM Resource 
								LEFT JOIN ResourceSubject ON ResourceSubject.ResourceId = Resource.Id 
								LEFT JOIN Subject ON ResourceSubject.SubjectId = Subject.Id 
								WHERE Subject.Name = @Subject)";

					DbUtils.AddParameter(cmd, "@Subject", subject);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{

						while (reader.Read())
						{
							var resourceId = DbUtils.GetInt(reader, "Id");
							var existingResource = resources.FirstOrDefault(r => r.Id == resourceId);
							if (existingResource == null)
							{
								existingResource = new Resource()
								{
									Id = DbUtils.GetInt(reader, "Id"),
									Name = DbUtils.GetString(reader, "Name"),
									SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
									Creator = DbUtils.GetString(reader, "Creator"),
									Description = DbUtils.GetString(reader, "Description"),
									Price = reader.GetDecimal(reader.GetOrdinal("Price")),
									DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
									ResourceUrl = DbUtils.GetString(reader, "ResourceUrl"),
									MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
									MediaType = new MediaType()
									{
										Id = DbUtils.GetInt(reader, "MediaTypeId"),
										Name = DbUtils.GetString(reader, "MediaTypeName")
									},
									ResourceSubjects = new List<ResourceSubject>(),
									Subjects = new List<Subject>(),
									Reviews = new List<Review>()
								};
								resources.Add(existingResource);
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ResourceSubjectId")))
							{
								existingResource.ResourceSubjects.Add(new ResourceSubject()
								{
									Id = DbUtils.GetInt(reader, "ResourceSubjectId"),
									ResourceId = DbUtils.GetInt(reader, "Id"),
									SubjectId = DbUtils.GetInt(reader, "SubjectId")
								});
							}
							if (!reader.IsDBNull(reader.GetOrdinal("SubjectId")))
							{
								existingResource.Subjects.Add(new Subject()
								{
									Id = DbUtils.GetInt(reader, "SubjectId"),
									Name = DbUtils.GetString(reader, "SubjectName")
								});
							}
						}

					}
					AddReviewsToResource(cmd, resources);
				}
			}
			return resources;
		}

		public List<Resource> GetResourcesByCreator(string creator)
		{
			var resources = new List<Resource>();
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Resource.Id, Resource.Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl, 
							MediaType.Name AS MediaTypeName,
							ResourceSubject.Id AS ResourceSubjectId,
							Subject.Id AS SubjectId, Subject.Name AS SubjectName
							FROM Resource
							LEFT JOIN MediaType ON Resource.MediaTypeId = MediaType.Id
							LEFT JOIN ResourceSubject ON Resource.Id = ResourceSubject.ResourceId
							LEFT JOIN Subject ON Subject.Id = ResourceSubject.SubjectId
							WHERE Resource.Creator = @Creator";

					DbUtils.AddParameter(cmd, "@Creator", creator);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{

						while (reader.Read())
						{
							var resourceId = DbUtils.GetInt(reader, "Id");
							var existingResource = resources.FirstOrDefault(r => r.Id == resourceId);
							if (existingResource == null)
							{
								existingResource = new Resource()
								{
									Id = DbUtils.GetInt(reader, "Id"),
									Name = DbUtils.GetString(reader, "Name"),
									SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
									Creator = DbUtils.GetString(reader, "Creator"),
									Description = DbUtils.GetString(reader, "Description"),
									Price = reader.GetDecimal(reader.GetOrdinal("Price")),
									DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
									ResourceUrl = DbUtils.GetString(reader, "ResourceUrl"),
									MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
									MediaType = new MediaType()
									{
										Id = DbUtils.GetInt(reader, "MediaTypeId"),
										Name = DbUtils.GetString(reader, "MediaTypeName")
									},
									ResourceSubjects = new List<ResourceSubject>(),
									Subjects = new List<Subject>(),
									Reviews = new List<Review>()
								};
								resources.Add(existingResource);
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ResourceSubjectId")))
							{
								existingResource.ResourceSubjects.Add(new ResourceSubject()
								{
									Id = DbUtils.GetInt(reader, "ResourceSubjectId"),
									ResourceId = DbUtils.GetInt(reader, "Id"),
									SubjectId = DbUtils.GetInt(reader, "SubjectId")
								});
							}
							if (!reader.IsDBNull(reader.GetOrdinal("SubjectId")))
							{
								existingResource.Subjects.Add(new Subject()
								{
									Id = DbUtils.GetInt(reader, "SubjectId"),
									Name = DbUtils.GetString(reader, "SubjectName")
								});
							}
						}

					}
					AddReviewsToResource(cmd, resources);
				}
			}
			return resources;
		}

		public Resource GetResourceById(int id)
		{
			Resource resource = null;
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						SELECT Resource.Id, Resource.Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl, 
							MediaType.Name AS MediaTypeName,
							ResourceSubject.Id AS ResourceSubjectId,
							Subject.Id AS SubjectId, Subject.Name AS SubjectName
							FROM Resource
							LEFT JOIN MediaType ON Resource.MediaTypeId = MediaType.Id
							LEFT JOIN ResourceSubject ON Resource.Id = ResourceSubject.ResourceId
							LEFT JOIN Subject ON Subject.Id = ResourceSubject.SubjectId
                        WHERE Resource.Id = @Id";

					DbUtils.AddParameter(cmd, "@Id", id);



					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							resource = new Resource()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								Name = DbUtils.GetString(reader, "Name"),
								SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
								Creator = DbUtils.GetString(reader, "Creator"),
								Description = DbUtils.GetString(reader, "Description"),
								Price = reader.GetDecimal(reader.GetOrdinal("Price")),
								DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
								ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
								ResourceUrl = DbUtils.GetString(reader, "ResourceUrl"),
								MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
								MediaType = new MediaType()
								{
									Id = DbUtils.GetInt(reader, "MediaTypeId"),
									Name = DbUtils.GetString(reader, "MediaTypeName")
								},
								ResourceSubjects = new List<ResourceSubject>(),
								Subjects = new List<Subject>(),
								Reviews = new List<Review>()
							};

							if (!reader.IsDBNull(reader.GetOrdinal("ResourceSubjectId")))
							{
								resource.ResourceSubjects.Add(new ResourceSubject()
								{
									Id = DbUtils.GetInt(reader, "ResourceSubjectId"),
									ResourceId = DbUtils.GetInt(reader, "Id"),
									SubjectId = DbUtils.GetInt(reader, "SubjectId")
								});
							}
							if (!reader.IsDBNull(reader.GetOrdinal("SubjectId")))
							{
								resource.Subjects.Add(new Subject()
								{
									Id = DbUtils.GetInt(reader, "SubjectId"),
									Name = DbUtils.GetString(reader, "SubjectName")
								});
							}

						}
					}
					cmd.CommandText = @"
								SELECT Review.Id, Review.UserId, Review.ResourceId, Review.ReviewText, Review.ReviewScore, Review.DateCreated, UserProfile.Name, UserProfile.ImageURL AS UPImage 
								FROM Review
								LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id 
								WHERE Review.ResourceId = @ResourceId";
					cmd.Parameters.AddWithValue("@ResourceId", resource.Id);
					using (SqlDataReader reader = cmd.ExecuteReader())
					{

						while (reader.Read())
						{
							Review review = new Review();
							if (!reader.IsDBNull(reader.GetOrdinal("Id")))
							{
								review.Id = DbUtils.GetInt(reader, "Id");
							}
							if (!reader.IsDBNull(reader.GetOrdinal("UserId")))
							{
								review.UserId = DbUtils.GetInt(reader, "UserId");
							}
							if (!reader.IsDBNull(reader.GetOrdinal("Name")))
							{
								review.UserProfile = new UserProfile()
								{
									Name = DbUtils.GetString(reader, "Name"),
									ImageUrl = DbUtils.GetString(reader, "UPImage")
								};
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ResourceId")))
							{
								review.ResourceId = DbUtils.GetInt(reader, "ResourceId");
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ReviewText")))
							{
								review.ReviewText = DbUtils.GetString(reader, "ReviewText");
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ReviewScore")))
							{
								review.ReviewScore = DbUtils.GetInt(reader, "ReviewScore");
							}
							if (!reader.IsDBNull(reader.GetOrdinal("DateCreated")))
							{
								review.DateCreated = DbUtils.GetDateTime(reader, "DateCreated");
							}
							resource.Reviews.Add(review);
						}
					}
				}
			}

			return resource;
		}

		public List<Resource> SearchResources(string searchTerm)
		{
			var resources = new List<Resource>();
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT 
								Resource.Id, Resource.Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl, 
								MediaType.Name AS MediaTypeName,
								ResourceSubject.Id AS ResourceSubjectId,
								Subject.Id AS SubjectId, Subject.Name AS SubjectName
							FROM Resource
							LEFT JOIN MediaType ON Resource.MediaTypeId = MediaType.Id
							LEFT JOIN ResourceSubject ON Resource.Id = ResourceSubject.ResourceId
							LEFT JOIN Subject ON Subject.Id = ResourceSubject.SubjectId
							WHERE (LOWER(Resource.Name) LIKE LOWER('%' + @SearchTerm + '%') OR LOWER(Resource.Description) LIKE LOWER('%' + @SearchTerm + '%'))
							ORDER BY Resource.Id;";

					DbUtils.AddParameter(cmd, "@SearchTerm", searchTerm);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							var resourceId = DbUtils.GetInt(reader, "Id");
							var existingResource = resources.FirstOrDefault(r => r.Id == resourceId);
							if (existingResource == null)
							{
								existingResource = new Resource()
								{
									Id = DbUtils.GetInt(reader, "Id"),
									Name = DbUtils.GetString(reader, "Name"),
									SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
									Creator = DbUtils.GetString(reader, "Creator"),
									Description = DbUtils.GetString(reader, "Description"),
									Price = reader.GetDecimal(reader.GetOrdinal("Price")),
									DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
									ResourceUrl = DbUtils.GetString(reader, "ResourceUrl"),
									MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
									MediaType = new MediaType()
									{
										Id = DbUtils.GetInt(reader, "MediaTypeId"),
										Name = DbUtils.GetString(reader, "MediaTypeName")
									},
									ResourceSubjects = new List<ResourceSubject>(),
									Subjects = new List<Subject>(),
									Reviews = new List<Review>()
								};
								resources.Add(existingResource);
							}
							if (!reader.IsDBNull(reader.GetOrdinal("ResourceSubjectId")))
							{
								existingResource.ResourceSubjects.Add(new ResourceSubject()
								{
									Id = DbUtils.GetInt(reader, "ResourceSubjectId"),
									ResourceId = DbUtils.GetInt(reader, "Id"),
									SubjectId = DbUtils.GetInt(reader, "SubjectId")
								});
							}
							if (!reader.IsDBNull(reader.GetOrdinal("SubjectId")))
							{
								existingResource.Subjects.Add(new Subject()
								{
									Id = DbUtils.GetInt(reader, "SubjectId"),
									Name = DbUtils.GetString(reader, "SubjectName")
								});
							}
						}

					}
					AddReviewsToResource(cmd, resources);
				}
			}
			return resources;
		}


		public void Add(Resource resource)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						INSERT INTO Resource 
						(Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl) 
									OUTPUT INSERTED.ID 
						VALUES (@Name, @SubmitterId, @Creator, @MediaTypeId, @Description, @Price, @DatePublished, @ImageUrl, @ResourceUrl)
										";
					DbUtils.AddParameter(cmd, "@Name", resource.Name);
					DbUtils.AddParameter(cmd, "@SubmitterId", resource.SubmitterId);
					DbUtils.AddParameter(cmd, "@Creator", resource.Creator);
					DbUtils.AddParameter(cmd, "@MediaTypeId", resource.MediaTypeId);
					DbUtils.AddParameter(cmd, "@Description", resource.Description);
					DbUtils.AddParameter(cmd, "@Price", resource.Price);
					DbUtils.AddParameter(cmd, "@DatePublished", resource.DatePublished);
					DbUtils.AddParameter(cmd, "@ImageUrl", resource.ImageUrl);
					DbUtils.AddParameter(cmd, "@ResourceUrl", resource.ResourceUrl);



					resource.Id = (int)cmd.ExecuteScalar();
				}
			}
		}

		public void EditResource(Resource resource)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using var cmd = conn.CreateCommand();
				{
					cmd.CommandText = @"UPDATE Resource
                                            SET 
											Name = @Name,
                                            Creator = @Creator,
											MediaTypeId = @MediaTypeId,
											Description = @Description,
											Price = @Price,
											DatePublished = @DatePublished,
											ImageUrl = @ImageUrl,
											ResourceUrl = @ResourceUrl
                                            WHERE Id = @Id";
					DbUtils.AddParameter(cmd, "@Id", resource.Id);
					DbUtils.AddParameter(cmd, "@Name", resource.Name);
					DbUtils.AddParameter(cmd, "@Creator", resource.Creator);
					DbUtils.AddParameter(cmd, "@MediaTypeId", resource.MediaTypeId);
					DbUtils.AddParameter(cmd, "@Description", resource.Description);
					DbUtils.AddParameter(cmd, "@Price", resource.Price);
					DbUtils.AddParameter(cmd, "@DatePublished", resource.DatePublished);
					DbUtils.AddParameter(cmd, "@ImageUrl", resource.ImageUrl);
					DbUtils.AddParameter(cmd, "@ResourceUrl", resource.ResourceUrl);

					cmd.ExecuteNonQuery();
				}
			}
		}

		public void DeleteResource(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = "DELETE FROM Resource WHERE Id = @Id";
					DbUtils.AddParameter(cmd, "@id", id);
					cmd.ExecuteNonQuery();
				}
			}
		}

		private void AddReviewsToResource(SqlCommand cmd, List<Resource> resources)
		{
			cmd.CommandText = @"
										SELECT Review.Id, Review.UserId, Review.ResourceId, Review.ReviewText, Review.ReviewScore, Review.DateCreated, UserProfile.Name, UserProfile.ImageUrl AS UPImage 
										FROM Resource 
										LEFT JOIN Review ON Review.ResourceId = Resource.ID 
										LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id 
										WHERE Resource.Id = @ResourceId";
			foreach (Resource resource in resources)
			{
				cmd.Parameters.Clear();
				cmd.Parameters.AddWithValue("@ResourceId", resource.Id);
				using (SqlDataReader reader = cmd.ExecuteReader())
				{
					while (reader.Read())
					{
						Review review = new Review();
						if (!reader.IsDBNull(reader.GetOrdinal("Id")))
						{
							review.Id = DbUtils.GetInt(reader, "Id");
						}
						if (!reader.IsDBNull(reader.GetOrdinal("UserId")))
						{
							review.UserId = DbUtils.GetInt(reader, "UserId");
						}
						if (!reader.IsDBNull(reader.GetOrdinal("Name")))
						{
							review.UserProfile = new UserProfile()
							{
								Name = DbUtils.GetString(reader, "Name"),
								ImageUrl = DbUtils.GetString(reader, "UPImage")
							};
						}
						if (!reader.IsDBNull(reader.GetOrdinal("ResourceId")))
						{
							review.ResourceId = DbUtils.GetInt(reader, "ResourceId");
						}
						if (!reader.IsDBNull(reader.GetOrdinal("ReviewText")))
						{
							review.ReviewText = DbUtils.GetString(reader, "ReviewText");
						}
						if (!reader.IsDBNull(reader.GetOrdinal("ReviewScore")))
						{
							review.ReviewScore = DbUtils.GetInt(reader, "ReviewScore");
						}
						if (!reader.IsDBNull(reader.GetOrdinal("DateCreated")))
						{
							review.DateCreated = DbUtils.GetDateTime(reader, "DateCreated");
						}
						if (review.Id != 0)
						{
							resource.Reviews.Add(review);
						}

					}
				}
			}
		}

	}
}
