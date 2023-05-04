using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechBoost.Repositories;

namespace TechBoost.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MediaTypeController : ControllerBase
	{
		private readonly IMediaTypeRepository _mediaTypeRepository;
		public MediaTypeController(IMediaTypeRepository mediaTypeRepository)
		{
			_mediaTypeRepository = mediaTypeRepository;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_mediaTypeRepository.GetAll());
		}
	}
}
