using System.Collections.Generic;
using TechBoost.Models;

namespace TechBoost.Repositories
{
	public interface IReviewRepository
	{
		void Add(Review review);
		List<Review> GetAll();
		Review GetReviewById(int id);
		List<Review> GetReviewsByResourceId(int id);
		Review GetReviewByResourceIdAndUser(int id, int currentUserId);
		void Edit(Review review, int id);
	}
}