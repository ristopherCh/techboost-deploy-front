using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using TechBoost.Models;
using TechBoost.Repositories;

namespace TechBoost.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserProfileController : ControllerBase
	{
		private readonly IUserProfileRepository _userProfileRepository;
		public UserProfileController(IUserProfileRepository userProfileRepository)
		{
			_userProfileRepository = userProfileRepository;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_userProfileRepository.GetAll());
		}

		[HttpGet("details/{userId}")]
		public IActionResult GetUserProfileById(string userId)
		{
			return Ok(_userProfileRepository.GetById(userId));
		}

		[HttpGet("{firebaseUserId}")]
		public IActionResult GetUserProfileByFirebaseUserId(string firebaseUserId)
		{
			return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
		}

		[HttpGet("DoesUserExist/{firebaseUserId}")]
		public IActionResult DoesUserExist(string firebaseUserId)
		{
			var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
			if (userProfile == null)
			{
				return NotFound();
			}
			return Ok();
		}

		[HttpPost]
		public IActionResult Post(UserProfile userProfile)
		{
			userProfile.DateCreated = DateTime.Now;
			_userProfileRepository.Add(userProfile);
			return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
		}

		[HttpGet("Me")]
		public IActionResult Me()
		{
			var userProfile = GetCurrentUserProfile();
			if (userProfile == null)
			{
				return NotFound();
			}

			return Ok(userProfile);
		}

		private UserProfile GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
		}
	}
}
