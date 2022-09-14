using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AquiferPE.Models.Domain.Resumes
{
    public class Experience
    {
        public string Title { get; set; }
        public int EmploymentTypeId { get; set; }
        public string EmploymentType { get; set; }
        public int LocationId { get; set; }
        public string CompanyName { get; set; }        
        public string City { get; set; }
        public string Zip { get; set; }
        public bool IsCurrentJob { get; set; }
    }
}
