using System;
using System.ComponentModel.DataAnnotations;

namespace TechBoost.Models
{
	public class UserProfile
	{
		public int Id { get; set; }

		[Required]
		[MaxLength(50)]
		public string Name { get; set; }

		[Required]
		[DataType(DataType.EmailAddress)]
		[MaxLength(255)]
		public string Email { get; set; }

		public string ImageUrl { get; set; }

		[Required]
		public DateTime DateCreated { get; set; }


		[StringLength(28, MinimumLength = 28)]
		public string FirebaseUserId { get; set; }


	}
}
