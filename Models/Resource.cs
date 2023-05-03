using System;

namespace TechBoost.Models
{
	public class Resource
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int SubmitterId { get; set; }
		public string Creator { get; set; }
		public int MediaTypeId { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public DateTime DatePublished { get; set; }
		public string ImageUrl { get; set; }
	}
}
