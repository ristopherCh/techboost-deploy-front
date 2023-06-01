using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class ReviewRepository : BaseRepository, IReviewRepository
	{
		public ReviewRepository(IConfiguration configuration) : base(configuration) { }

		public List<Review> GetAll()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Review.DateCreated, Review.Id, UserId, ResourceId, ReviewText, ReviewScore, UserProfile.Name, UserProfile.ImageUrl 
							FROM Review 
							LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id";

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var reviews = new List<Review>();
						while (reader.Read())
						{
							reviews.Add(new Review()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								UserId = DbUtils.GetInt(reader, "UserId"),
								UserProfile = new UserProfile()
								{
									Name = DbUtils.GetString(reader, "Name"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl")
								},
								ResourceId = DbUtils.GetInt(reader, "ResourceId"),
								ReviewText = DbUtils.GetString(reader, "ReviewText"),
								ReviewScore = DbUtils.GetInt(reader, "ReviewScore"),
								DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
							});
						}
						return reviews;
					}
				}
			}
		}

		//public List<Review> GetReviewsByResourceId(int id)
		//{
		//	using (var conn = Connection)
		//	{
		//		conn.Open();
		//		using (var cmd = conn.CreateCommand())
		//		{
		//			cmd.CommandText = @"
		//					SELECT Review.DateCreated, Review.Id, UserId, ResourceId, ReviewText, ReviewScore, UserProfile.Name, UserProfile.ImageUrl 
		//					FROM Review 
		//					LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id
		//					WHERE ResourceId = @ResourceId";

		//			DbUtils.AddParameter(cmd, "@ResourceId", id);

		//			using (SqlDataReader reader = cmd.ExecuteReader())
		//			{
		//				var reviews = new List<Review>();
		//				while (reader.Read())
		//				{
		//					reviews.Add(new Review()
		//					{
		//						Id = DbUtils.GetInt(reader, "Id"),
		//						UserId = DbUtils.GetInt(reader, "UserId"),
		//						UserProfile = new UserProfile()
		//						{
		//							Name = DbUtils.GetString(reader, "Name"),
		//							ImageUrl = DbUtils.GetString(reader, "ImageUrl")
		//						},
		//						ResourceId = DbUtils.GetInt(reader, "ResourceId"),
		//						ReviewText = DbUtils.GetString(reader, "ReviewText"),
		//						ReviewScore = DbUtils.GetInt(reader, "ReviewScore"),
		//						DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
		//					});
		//				}
		//				return reviews;
		//			}
		//		}
		//	}
		//}

		public List<Review> GetReviewsByResourceId(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"SELECT Review.DateCreated, Review.Id AS ReviewId, Review.UserId, ResourceId, ReviewText, ReviewScore, 
		UserProfile.Name, UserProfile.ImageUrl,
		ReviewLike.Id AS ReviewLikeId, ReviewLike.UserId AS ReviewLikerUserId
							FROM Review 
							LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id
							LEFT JOIN ReviewLike ON Review.Id = ReviewLike.ReviewId
							WHERE ResourceId = @ResourceId
							ORDER BY ReviewId";

					DbUtils.AddParameter(cmd, "@ResourceId", id);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var reviews = new List<Review>();
						while (reader.Read())
						{
							var reviewId = DbUtils.GetInt(reader, "ReviewId");
							var existingReview = reviews.FirstOrDefault(r => r.Id == reviewId);
							if (existingReview == null)
							{
								existingReview = new Review()
								{
									Id = DbUtils.GetInt(reader, "ReviewId"),
									UserId = DbUtils.GetInt(reader, "UserId"),
									UserProfile = new UserProfile()
									{
										Name = DbUtils.GetString(reader, "Name"),
										ImageUrl = DbUtils.GetString(reader, "ImageUrl")
									},
									ResourceId = DbUtils.GetInt(reader, "ResourceId"),
									ReviewText = DbUtils.GetString(reader, "ReviewText"),
									ReviewScore = DbUtils.GetInt(reader, "ReviewScore"),
									DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
									ReviewLikes = new List<ReviewLike>()
								};
								reviews.Add(existingReview);
							};
							if (!reader.IsDBNull(reader.GetOrdinal("ReviewLikeId")))
							{
								existingReview.ReviewLikes.Add(new ReviewLike()
								{
									Id = DbUtils.GetInt(reader, "ReviewLikeId"),
									UserId = DbUtils.GetInt(reader, "ReviewLikerUserId"),
									ReviewId = DbUtils.GetInt(reader, "ReviewId")
								});
							}
						}
						return reviews;
					}
				}
			}
		}

		public List<Review> GetReviewsByUserId(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Review.DateCreated, Review.Id, UserId, ResourceId, ReviewText, ReviewScore, UserProfile.Name, UserProfile.ImageUrl AS UPIMage 
							FROM Review 
							LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id
							WHERE UserId = @UserId";

					DbUtils.AddParameter(cmd, "@UserId", id);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var reviews = new List<Review>();
						while (reader.Read())
						{
							reviews.Add(new Review()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								UserId = DbUtils.GetInt(reader, "UserId"),
								UserProfile = new UserProfile()
								{
									Name = DbUtils.GetString(reader, "Name"),
									ImageUrl = DbUtils.GetString(reader, "UPImage")
								},
								ResourceId = DbUtils.GetInt(reader, "ResourceId"),
								ReviewText = DbUtils.GetString(reader, "ReviewText"),
								ReviewScore = DbUtils.GetInt(reader, "ReviewScore"),
								DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
							});
						}
						return reviews;
					}
				}
			}
		}

		public Review GetReviewByResourceIdAndUser(int id, int currentUserId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Review.DateCreated, Review.Id, UserId, ResourceId, ReviewText, ReviewScore, UserProfile.Name, UserProfile.ImageUrl 
							FROM Review 
							LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id
							WHERE ResourceId = @ResourceId
							AND UserId = @CurrentUserId";

					DbUtils.AddParameter(cmd, "@ResourceId", id);
					DbUtils.AddParameter(cmd, "@CurrentUserId", currentUserId);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						Review review = null;
						if (reader.Read())
						{
							review = new Review()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								UserId = DbUtils.GetInt(reader, "UserId"),
								UserProfile = new UserProfile()
								{
									Name = DbUtils.GetString(reader, "Name"),
									ImageUrl = DbUtils.GetString(reader, "ImageUrl")
								},
								ResourceId = DbUtils.GetInt(reader, "ResourceId"),
								ReviewText = DbUtils.GetString(reader, "ReviewText"),
								ReviewScore = DbUtils.GetInt(reader, "ReviewScore"),
								DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
							};
						}
						return review;
					}
				}
			}
		}

		public Review GetReviewById(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						SELECT Review.DateCreated, Review.Id, UserId, ResourceId, ReviewText, ReviewScore, UserProfile.Name 
							FROM Review 
							LEFT JOIN UserProfile ON Review.UserId = UserProfile.Id
                        WHERE Review.Id = @Id";

					DbUtils.AddParameter(cmd, "@Id", id);

					Review review = null;

					var reader = cmd.ExecuteReader();
					if (reader.Read())
					{
						review = new Review()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							UserId = DbUtils.GetInt(reader, "UserId"),
							UserProfile = new UserProfile()
							{
								Name = DbUtils.GetString(reader, "Name")
							},
							ResourceId = DbUtils.GetInt(reader, "ResourceId"),
							ReviewText = DbUtils.GetString(reader, "ReviewText"),
							ReviewScore = DbUtils.GetInt(reader, "ReviewScore"),
							DateCreated = DbUtils.GetDateTime(reader, "DateCreated")
						};
					}
					reader.Close();

					return review;
				}
			}
		}

		public void Add(Review review)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						INSERT INTO Review 
						(UserId, ResourceId, ReviewText, ReviewScore, DateCreated) 
									OUTPUT INSERTED.ID 
						VALUES (@UserId, @ResourceId, @ReviewText, @ReviewScore, @DateCreated)
										";
					DbUtils.AddParameter(cmd, "@UserId", review.UserId);
					DbUtils.AddParameter(cmd, "@ResourceId", review.ResourceId);
					DbUtils.AddParameter(cmd, "@ReviewText", review.ReviewText);
					DbUtils.AddParameter(cmd, "@ReviewScore", review.ReviewScore);
					DbUtils.AddParameter(cmd, "@DateCreated", review.DateCreated);

					review.Id = (int)cmd.ExecuteScalar();
				}
			}
		}

		public void Edit(Review review, int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						UPDATE Review SET ReviewText = @ReviewText, ReviewScore = @ReviewScore, DateCreated = @DateCreated WHERE Id = @Id
										";
					DbUtils.AddParameter(cmd, "@Id", id);
					DbUtils.AddParameter(cmd, "@ReviewText", review.ReviewText);
					DbUtils.AddParameter(cmd, "@ReviewScore", review.ReviewScore);
					DbUtils.AddParameter(cmd, "@DateCreated", review.DateCreated);

					cmd.ExecuteNonQuery();
				}
			}
		}

		public void DeleteReview(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = "DELETE FROM Review WHERE Id = @Id";
					DbUtils.AddParameter(cmd, "@id", id);
					cmd.ExecuteNonQuery();
				}
			}
		}

		public void AddReviewLike(ReviewLike reviewLike)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						INSERT INTO ReviewLike 
						(UserId, ReviewId) 
							OUTPUT INSERTED.ID 
						VALUES (@UserId, @ReviewId)
										";
					DbUtils.AddParameter(cmd, "@UserId", reviewLike.UserId);
					DbUtils.AddParameter(cmd, "@ReviewId", reviewLike.ReviewId);

					reviewLike.Id = (int)cmd.ExecuteScalar();
				}
			}
		}

		public List<ReviewLike> GetReviewLikesByReviewId(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Id, UserId, ReviewId
							FROM ReviewLike 
							WHERE ReviewId = @Id";

					DbUtils.AddParameter(cmd, "@Id", id);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var reviewLikes = new List<ReviewLike>();
						while (reader.Read())
						{
							reviewLikes.Add(new ReviewLike()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								UserId = DbUtils.GetInt(reader, "UserId"),
								ReviewId = DbUtils.GetInt(reader, "ReviewId")
							});
						}
						return reviewLikes;
					}
				}
			}
		}

		public void DeleteReviewLike(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = "DELETE FROM ReviewLike WHERE Id = @Id";
					DbUtils.AddParameter(cmd, "@id", id);
					cmd.ExecuteNonQuery();
				}
			}
		}
	}
}
