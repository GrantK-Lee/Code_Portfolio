using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AquiferPE.Models.Requests.Resumes
{
    public class BatchExperienceAddRequest
    {
        public string Title { get; set; }
        public int EmploymentTypeId { get; set; }
        public string CompanyName { get; set; }
        public int LocationId { get; set; }
        public bool IsCurrent { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string Description { get; set; }
    }
}
