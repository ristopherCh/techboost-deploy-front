using System.Collections.Generic;
using TechBoost.Models;

namespace TechBoost.Repositories
{
	public interface IMediaTypeRepository
	{
		List<MediaType> GetAll();
		MediaType GetMediaTypeById(int id);
	}
}