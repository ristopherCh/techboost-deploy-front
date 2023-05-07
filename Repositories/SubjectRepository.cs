using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class SubjectRepository : BaseRepository, ISubjectRepository
	{
		public SubjectRepository(IConfiguration configuration) : base(configuration) { }
		public List<Subject> GetAll()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
							SELECT Id, Name
							FROM Subject";
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var subjects = new List<Subject>();
						while (reader.Read())
						{
							var subject = new Subject()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								Name = DbUtils.GetString(reader, "Name"),

							};
							subjects.Add(subject);
						}
						return subjects;
					}
				}
			}
		}

		public Subject GetSubjectById(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						SELECT Id, Name
						FROM Subject
                        WHERE Id = @Id";

					DbUtils.AddParameter(cmd, "@Id", id);

					Subject subject = null;

					var reader = cmd.ExecuteReader();
					if (reader.Read())
					{
						subject = new Subject()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							Name = DbUtils.GetString(reader, "Name"),
						};
					}
					reader.Close();

					return subject;
				}
			}
		}

		public void AddResourceSubject(ResourceSubject resourceSubject)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
									INSERT INTO ResourceSubject (ResourceId, SubjectId)
									OUTPUT INSERTED.ID
									VALUES (@ResourceId, @SubjectID); 
										";
					DbUtils.AddParameter(cmd, "@ResourceId", resourceSubject.ResourceId);
					DbUtils.AddParameter(cmd, "@SubjectId", resourceSubject.SubjectId);

					resourceSubject.Id = (int)cmd.ExecuteScalar();

				}
			}
		}

		public void DeleteResourceSubject(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = "DELETE FROM ResourceSubject WHERE Id = @Id";
					DbUtils.AddParameter(cmd, "@id", id);
					cmd.ExecuteNonQuery();
				}
			}
		}
	}
}
