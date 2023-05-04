using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using TechBoost.Models;
using TechBoost.Repositories;

namespace TechBoost.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ResourceController : ControllerBase
	{
		private readonly IResourceRepository _resourceRepository;
		public ResourceController(IResourceRepository resourceRepository)
		{
			_resourceRepository = resourceRepository;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_resourceRepository.GetAll());
		}

		[HttpGet("details/{id}")]
		public IActionResult GetUserProfileById(int id)
		{
			return Ok(_resourceRepository.GetResourceById(id));
		}

		[HttpPost]
		public IActionResult Post(Resource resource)
		{
			_resourceRepository.Add(resource);
			return CreatedAtAction("Get", new { id = resource.Id }, resource);
		}

		//[HttpPut("{id}")]
		[HttpPut]
		public IActionResult Put(Resource resource)
		{
			_resourceRepository.EditResource(resource);
			return NoContent();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			_resourceRepository.DeleteResource(id);
			return NoContent();
		}
	}
}
