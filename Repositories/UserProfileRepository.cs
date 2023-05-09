using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class UserProfileRepository : BaseRepository, IUserProfileRepository
	{
		public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

		public List<UserProfile> GetAll()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Id, Name, Email, ImageUrl, DateCreated, FirebaseUserId 
							FROM UserProfile";
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var userProfiles = new List<UserProfile>();
						while (reader.Read())
						{
							var userProfile = new UserProfile()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
								Name = DbUtils.GetString(reader, "Name"),
								Email = DbUtils.GetString(reader, "Email"),
								DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
								ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
							};
							userProfiles.Add(userProfile);
						}
						return userProfiles;
					}
				}
			}
		}

		public UserProfile GetByFirebaseUserId(string firebaseUserId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
                        SELECT Id, Name, Email, ImageUrl, DateCreated, FirebaseUserId 
						FROM UserProfile
                        WHERE FirebaseUserId = @FirebaseuserId";

					DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

					UserProfile userProfile = null;

					var reader = cmd.ExecuteReader();
					if (reader.Read())
					{
						userProfile = new UserProfile()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
							Name = DbUtils.GetString(reader, "Name"),
							Email = DbUtils.GetString(reader, "Email"),
							DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
							ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
						};
					}
					reader.Close();

					return userProfile;
				}
			}
		}

		public UserProfile GetById(string id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
                        SELECT Id, Name, Email, ImageUrl, DateCreated, FirebaseUserId 
						FROM UserProfile
                        WHERE Id = @Id";

					DbUtils.AddParameter(cmd, "@Id", id);

					UserProfile userProfile = null;

					var reader = cmd.ExecuteReader();
					if (reader.Read())
					{
						userProfile = new UserProfile()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
							Name = DbUtils.GetString(reader, "Name"),
							Email = DbUtils.GetString(reader, "Email"),
							DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
							ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
						};
					}
					reader.Close();

					return userProfile;
				}
			}
		}

		public void Add(UserProfile userProfile)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						INSERT INTO UserProfile (Name, Email, ImageUrl, DateCreated, FirebaseUserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Email, @ImageUrl, @DateCreated, @FirebaseUserId)";
					DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
					DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
					DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
					DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);
					DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);

					userProfile.Id = (int)cmd.ExecuteScalar();
				}
			}
		}


	}
}
