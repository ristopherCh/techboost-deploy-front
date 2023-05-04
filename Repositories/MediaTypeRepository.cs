using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class MediaTypeRepository : BaseRepository, IMediaTypeRepository
	{
		public MediaTypeRepository(IConfiguration configuration) : base(configuration) { }

		public List<MediaType> GetAll()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Id, Name
							FROM MediaType";
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var mediaTypes = new List<MediaType>();
						while (reader.Read())
						{
							var mediaType = new MediaType()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								Name = DbUtils.GetString(reader, "Name"),

							};
							mediaTypes.Add(mediaType);
						}
						return mediaTypes;
					}
				}
			}
		}
	}
}
