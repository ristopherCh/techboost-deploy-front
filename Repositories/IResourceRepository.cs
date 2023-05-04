using System.Collections.Generic;
using TechBoost.Models;

namespace TechBoost.Repositories
{
	public interface IResourceRepository
	{
		List<Resource> GetAll();
		Resource GetResourceById(int id);
		void Add(Resource resource);
		void EditResource(Resource resource);
		void DeleteResource(int id);
	}
}