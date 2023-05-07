using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechBoost.Models;
using TechBoost.Repositories;

namespace TechBoost.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SubjectController : ControllerBase
	{
		private readonly ISubjectRepository _subjectRepository;
		public SubjectController(ISubjectRepository subjectRepository)
		{
			_subjectRepository = subjectRepository;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_subjectRepository.GetAll());
		}

		[HttpGet("{id}")]
		public IActionResult GetMediaTypeById(int id)
		{
			return Ok(_subjectRepository.GetSubjectById(id));
		}

		[HttpPost]
		public IActionResult Post(ResourceSubject resourceSubject)
		{
			_subjectRepository.AddResourceSubject(resourceSubject);
			return CreatedAtAction("Get", new { id = resourceSubject.Id }, resourceSubject);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			_subjectRepository.DeleteResourceSubject(id);
			return NoContent();
		}
	}
}
