using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AquiferPE.Models.Domain.Resumes
{
    public class Resume
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public List<Experience> Experiences { get; set; } 
        public List<Education> EducationHistory { get; set; }
        public List<FreelanceGoalType> FreelanceGoalTypes { get; set; }
        public List<SkillSet> SkillSets { get; set; }
        public int ResumeFileId { get; set; }
    }
}
