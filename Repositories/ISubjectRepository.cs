using System.Collections.Generic;
using TechBoost.Models;

namespace TechBoost.Repositories
{
	public interface ISubjectRepository
	{
		List<Subject> GetAll();
		Subject GetSubjectById(int id);
		void AddResourceSubject(ResourceSubject resourceSubject);
		void DeleteResourceSubject(int id);
	}
}