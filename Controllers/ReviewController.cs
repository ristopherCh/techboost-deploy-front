using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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

		[HttpGet("getByUserId/{id}")]
		public IActionResult GetReviewsByUserId(int id)
		{
			return Ok(_reviewRepository.GetReviewsByUserId(id));
		}

		[HttpGet("getByResourceIdAndUser/{id}")]
		public IActionResult GetReviewByResourceIdAndUser(int id)
		{
			UserProfile currentUser = GetCurrentUserProfile();
			return Ok(_reviewRepository.GetReviewByResourceIdAndUser(id, currentUser.Id));
		}

		[HttpGet("reviewLikes/{id}")]
		public IActionResult GetReviewLikesByReviewId(int id)
		{
			return Ok(_reviewRepository.GetReviewLikesByReviewId(id));
		}

		[HttpPost]
		public IActionResult Post(Review review)
		{
			_reviewRepository.Add(review);
			return CreatedAtAction("GetReviewById", new { id = review.Id }, review);
		}

		[HttpPost("reviewLike")]
		public IActionResult PostReviewLike(ReviewLike reviewLike)
		{
			_reviewRepository.AddReviewLike(reviewLike);
			return CreatedAtAction("GetReviewById", new { id = reviewLike.Id }, reviewLike);
		}

		[HttpPut("{id}")]
		public IActionResult Edit(Review review, int id)
		{
			_reviewRepository.Edit(review, id);
			return CreatedAtAction("GetReviewById", new { id = review.Id }, review);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			_reviewRepository.DeleteReview(id);
			return NoContent();
		}

		[HttpDelete("reviewLikes/{id}")]
		public IActionResult DeleteReviewLike(int id)
		{
			_reviewRepository.DeleteReviewLike(id);
			return NoContent();
		}

		private UserProfile GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
		}
	}
}
