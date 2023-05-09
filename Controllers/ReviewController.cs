using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechBoost.Models;
using TechBoost.Repositories;

namespace TechBoost.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class ReviewController : ControllerBase
	{
		private readonly IReviewRepository _reviewRepository;
		public ReviewController(IReviewRepository reviewRepository)
		{
			_reviewRepository = reviewRepository;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_reviewRepository.GetAll());
		}

		[HttpGet("{id}")]
		public IActionResult GetReviewById(int id)
		{
			return Ok(_reviewRepository.GetReviewById(id));
		}

		[HttpGet("getByResourceId/{id}")]
		public IActionResult GetReviewsByResourceId(int id)
		{
			return Ok(_reviewRepository.GetReviewsByResourceId(id));
		}

		[HttpPost]
		public IActionResult Post(Review review)
		{
			_reviewRepository.Add(review);
			return CreatedAtAction("GetReviewById", new { id = review.Id }, review);
		}
	}
}
