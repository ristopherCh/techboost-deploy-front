using Microsoft.AspNetCore.Connections;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class ResourceRepository : BaseRepository
	{
		public ResourceRepository(IConfiguration configuration) : base(configuration) { }

		public List<Resource> GetAll()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"SELECT Id, Name, SubmitterId, Creator, MediaTypeId, Description, Price, DatePublished, ImageUrl FROM Resource";
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
								ImageUrl = DbUtils.GetString(reader, "ImageUrl")
							};
							resources.Add(resource);
						}
						return resources;
					}
				}
			}
		}

	}
}
