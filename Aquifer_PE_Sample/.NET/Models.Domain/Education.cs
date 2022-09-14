using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AquiferPE.Models.Domain.Resumes
{
    public class Education
    {
        public int InstitutionId { get; set; }
        public string Institution { get; set; }
        public int EducationProgramId { get; set; }
        public string EducationProgramType { get; set; }
        public int SpecializationTypeId { get; set; }
        public string Specialization { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
    }
}
