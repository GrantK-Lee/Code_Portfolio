using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AquiferPE.Models.Requests.Resumes
{
    public class ResumeAddRequestV2
    {
        public string Description { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Notes { get; set; }
        public int ResumeFileId { get; set; }
        public List<BatchExperienceAddRequest> Experiences { get; set; }
        public List<BatchEducationAddRequest> Educations { get; set; }
        public List<string> Skills { get; set; }
        public List<string> FreelanceGoals { get; set; }
    }
}
