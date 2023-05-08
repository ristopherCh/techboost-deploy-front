using Microsoft.Extensions.Configuration;
using TechBoost.Models;
using TechBoost.Utils;

namespace TechBoost.Repositories
{
	public class ReviewRepository : BaseRepository, IReviewRepository
	{
		public ReviewRepository(IConfiguration configuration) : base(configuration) { }

		public void Add(Review review)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						INSERT INTO Review 
						(UserId, ResourceId, ReviewText, ReviewScore) 
									OUTPUT INSERTED.ID 
						VALUES (@UserId, @ResourceId, @ReviewText, @ReviewScore)
										";
					DbUtils.AddParameter(cmd, "@UserId", review.UserId);
					DbUtils.AddParameter(cmd, "@SubmitterId", review.ResourceId);
					DbUtils.AddParameter(cmd, "@ResourceId", review.ResourceId);
					DbUtils.AddParameter(cmd, "@ReviewText", review.ReviewText);
					DbUtils.AddParameter(cmd, "@ReviewScore", review.ReviewScore);

					review.Id = (int)cmd.ExecuteScalar();
				}
			}
		}
	}
}
