using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AquiferPE.Models.Requests.Resumes
{
    public class BatchEducationAddRequest
    {
        public int InstitutionId { get; set; }
        public int EdProgramTypeId { get; set; }
        public int SpecializationTypeId { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string Description { get; set; }
        public bool IsGraduated { get; set; }
    }
}
