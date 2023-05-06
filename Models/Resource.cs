using System;
using System.Collections.Generic;

namespace TechBoost.Models
{
	public class Resource
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int SubmitterId { get; set; }
		public string Creator { get; set; }
		public int MediaTypeId { get; set; }
		public MediaType MediaType { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public DateTime DatePublished { get; set; }
		public string ImageUrl { get; set; }
		public string ResourceUrl { get; set; }
		public List<ResourceSubject> ResourceSubjects { get; set; }
	}
}
