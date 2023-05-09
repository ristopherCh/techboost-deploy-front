using System;

namespace TechBoost.Models
{
	public class Review
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public UserProfile UserProfile { get; set; }
		public int ResourceId { get; set; }
		public string ReviewText { get; set; }
		public int ReviewScore { get; set; }
		public DateTime DateCreated { get; set; }
	}
}
