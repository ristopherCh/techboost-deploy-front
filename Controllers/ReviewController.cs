using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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
		private readonly IUserProfileRepository _userProfileRepository;
		public ReviewController(IReviewRepository reviewRepository, IUserProfileRepository userProfileRepository)
		{
			_reviewRepository = reviewRepository;
			_userProfileRepository = userProfileRepository;
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

		[HttpGet("getByResourceIdAndUser/{id}")]
		public IActionResult GetReviewByResourceIdAndUser(int id)
		{
			UserProfile currentUser = GetCurrentUserProfile();
			return Ok(_reviewRepository.GetReviewByResourceIdAndUser(id, currentUser.Id));
		}

		[HttpPost]
		public IActionResult Post(Review review)
		{
			_reviewRepository.Add(review);
			return CreatedAtAction("GetReviewById", new { id = review.Id }, review);
		}

		[HttpPut("{id}")]
		public IActionResult Edit(Review review, int id)
		{
			_reviewRepository.Edit(review, id);
			return CreatedAtAction("GetReviewById", new { id = review.Id }, review);
		}

		private UserProfile GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
		}
	}
}
