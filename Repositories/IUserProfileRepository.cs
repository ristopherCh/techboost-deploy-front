using System.Collections.Generic;
using TechBoost.Models;

namespace TechBoost.Repositories
{
	public interface IUserProfileRepository
	{
		List<UserProfile> GetAll();
		UserProfile GetByFirebaseUserId(string firebaseUserId);
		UserProfile GetById(string id);
		void Add(UserProfile userProfile);
	}
}
