using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechBoost.Repositories;

namespace TechBoost.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReviewController : ControllerBase
	{
		private readonly IReviewRepository _reviewRepository;
		public ReviewController(IReviewRepository reviewRepository)
		{
			_reviewRepository = reviewRepository;
		}
	}
}
