using Microsoft.AspNetCore.Connections;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class ResourceRepository : BaseRepository, IResourceRepository
	{
		public ResourceRepository(IConfiguration configuration) : base(configuration) { }

		public List<Resource> GetAll()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"SELECT Id, Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl FROM Resource";
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var resources = new List<Resource>();
						while (reader.Read())
						{
							var resource = new Resource()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								Name = DbUtils.GetString(reader, "Name"),
								SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
								Creator = DbUtils.GetString(reader, "Creator"),
								MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
								Description = DbUtils.GetString(reader, "Description"),
								Price = reader.GetDecimal(reader.GetOrdinal("Price")),
								DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
								ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
								ResourceUrl = DbUtils.GetString(reader, "ResourceUrl")
							};
							resources.Add(resource);
						}
						return resources;
					}
				}
			}
		}

		public Resource GetResourceById(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						SELECT Id, Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl, ResourceUrl 
						FROM Resource
                        WHERE Id = @Id";

					DbUtils.AddParameter(cmd, "@Id", id);

					Resource resource = null;

					var reader = cmd.ExecuteReader();
					if (reader.Read())
					{
						resource = new Resource()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							Name = DbUtils.GetString(reader, "Name"),
							SubmitterId = DbUtils.GetInt(reader, "SubmitterId"),
							Creator = DbUtils.GetString(reader, "Creator"),
							MediaTypeId = DbUtils.GetInt(reader, "MediaTypeId"),
							Description = DbUtils.GetString(reader, "Description"),
							Price = reader.GetDecimal(reader.GetOrdinal("Price")),
							DatePublished = DbUtils.GetDateTime(reader, "DatePublished"),
							ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
							ResourceUrl = DbUtils.GetString(reader, "ResourceUrl")
						};
					}
					reader.Close();

					return resource;
				}
			}
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

	}
}
