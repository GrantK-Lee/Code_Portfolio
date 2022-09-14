using AquiferPE.Data;
using AquiferPE.Data.Providers;
using AquiferPE.Models;
using AquiferPE.Models.Domain.Resumes;
using AquiferPE.Models.Requests.Resumes;
using AquiferPE.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace AquiferPE.Services
{
    public class ResumesService : IResumesService
    {
        IDataProvider _data = null;

        public ResumesService(IDataProvider data)
        {
            _data = data;
        }

        public Resume GetById(int id)
        {
            string procName = "[dbo].[Resumes_SelectById_Details]";

            Resume resumeBuild = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                resumeBuild = MapResume(reader, ref startingIndex);
            }
            );
            return resumeBuild;
        }

        public Paged<Resume> GetAllByPage(int pageIndex, int pageSize)
        {

            string procName = "[dbo].[Resumes_SelectAll_Details]";
            Paged<Resume> pagedList = null;
            List<Resume> courseList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, (SqlParameterCollection inputParams) =>
            {
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);

            }, (IDataReader reader, short set) =>
            {
                int index = 0;

                Resume course = null;

                course = MapResume(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }

                if (courseList == null)
                {
                    courseList = new List<Resume>();
                }

                courseList.Add(course);
            });

            if (courseList != null)
            {
                pagedList = new Paged<Resume>(courseList, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        private Resume MapResume(IDataReader reader, ref int startingIndex)
        {
            Resume newResumeBuild = new Resume();

            newResumeBuild.Id = reader.GetSafeInt32(startingIndex++);
            newResumeBuild.Name = reader.GetSafeString(startingIndex++);
            newResumeBuild.Email = reader.GetSafeString(startingIndex++);
            newResumeBuild.PhoneNumber = reader.GetSafeString(startingIndex++);
            newResumeBuild.Description = reader.GetSafeString(startingIndex++);
            newResumeBuild.Experiences = reader.DeserializeObject<List<Experience>>(startingIndex++);
            newResumeBuild.EducationHistory = reader.DeserializeObject<List<Education>>(startingIndex++);
            newResumeBuild.FreelanceGoalTypes = reader.DeserializeObject<List<FreelanceGoalType>>(startingIndex++);
            newResumeBuild.SkillSets = reader.DeserializeObject<List<SkillSet>>(startingIndex++);
            newResumeBuild.ResumeFileId = reader.GetSafeInt32(startingIndex++);

            return newResumeBuild;
        }

        public int Add(ResumeAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Resumes_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public int AddV2(ResumeAddRequestV2 model, int userId)
        {
            int Id = 0;
            DataTable educations = null;
            DataTable experiences = null;
            DataTable skills = null;
            DataTable freelanceGoals = null;

            string procName = "[dbo].[Resumes_InsertV3]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    if (educations == null)
                    {
                        educations = MappingEducations(model.Educations, userId);
                    }
                    if (experiences == null)
                    {
                        experiences = MappingExperiences(model.Experiences, userId);
                    }
                    if (skills == null)
                    {
                        skills = MappingSkills(model.Skills);
                    }
                    if (freelanceGoals == null)
                    {
                        freelanceGoals = MappingFreeLanceGoals(model.FreelanceGoals);
                    }

                    col.AddWithValue("@Description", model.Description);
                    col.AddWithValue("@Name", model.Name);
                    col.AddWithValue("@Email", model.Email);
                    col.AddWithValue("@Phone", model.Phone);
                    col.AddWithValue("@Notes", model.Notes);
                    col.AddWithValue("@ResumeFileId", model.ResumeFileId);
                    col.AddWithValue("@CreatedBy", userId);
                    col.AddWithValue("@ModifiedBy", userId);
                    col.AddWithValue("@BatchExperience", experiences);
                    col.AddWithValue("@BatchEducation", educations);
                    col.AddWithValue("@BatchSkills", skills);
                    col.AddWithValue("@BatchFreelanceGoals", freelanceGoals);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out Id);

                });

            return Id;
        }

        public void Update(ResumeUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Resumes_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);
            },
            returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Resumes_Delete_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            },
            null);

        }

        private static void AddCommonParams(ResumeAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ResumeContactId", model.ResumeContactId);
            col.AddWithValue("@ResumeFileId", model.ResumeFileId);
        
        }
        public int AddResumeView(ResumeViewAddRequest model)
        {
            string procName = "[dbo].[ResumeViews_Insert]";
            int id = 0;
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@ViewerId", model.ViewerId);
                collection.AddWithValue("@ResumeId", model.ResumeId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                collection.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });
            return id;
        }

        public ResumeView GetResumeViewById(int id)
        {
            string procName = "[dbo].[ResumeViews_SelectById]";

            ResumeView resumeView = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {

                int startingIndex = 0;
                resumeView = MapSingleResumeView(reader, ref startingIndex);

            });
            return resumeView;
        }

        public Paged<ResumeView> GetResumeViewsByResumeId(int pageIndex, int pageSize, int id)
        {
            Paged<ResumeView> pagedViews = null;

            List<ResumeView> listViews = null;

            int totalCount = 0;

            string procName = "[dbo].[ResumeViews_PagedByResumeId]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {

                collection.AddWithValue("@PageIndex", pageIndex);
                collection.AddWithValue("@PageSize", pageSize);
                collection.AddWithValue("@ResumeId", id);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {

                ResumeView resumeView = new ResumeView();

                int startingIndex = 0;

                resumeView = MapSingleResumeView(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (listViews == null)
                {
                    listViews = new List<ResumeView>();
                }
                listViews.Add(resumeView);

            });
            if (pagedViews == null)
            {
                pagedViews = new Paged<ResumeView>(listViews, pageIndex, pageSize, totalCount);
            }

            return pagedViews;
        }

        public int GetResumeViewCount(int id)
        {
            string procName = "[dbo].[ResumeViews_Count_ByResumeId]";

            int viewCount = 0;

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {

                collection.AddWithValue("@ResumeId", id);

                SqlParameter cOut = new SqlParameter("@Count", SqlDbType.Int);
                cOut.Direction = ParameterDirection.Output;

                collection.Add(cOut);


            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object count = returnCollection["@Count"].Value;

                int.TryParse(count.ToString(), out viewCount);

            });
            return viewCount;
        }


        private static DataTable MappingSkills(List<string> skills)
        {
            DataTable data = null;

            if (skills != null)
            {
                data = new DataTable();
                data.Columns.Add("Name", typeof(string));

                foreach (string skill in skills)
                {
                    DataRow dr = data.NewRow();
                    int startingIndex = 0;
                    dr.SetField(startingIndex++, skill);
                    data.Rows.Add(dr);
                }
            }
            return data;
        }

        private static DataTable MappingFreeLanceGoals(List<string> goals)
        {
            DataTable data = null;

            if (goals != null)
            {
                data = new DataTable();
                data.Columns.Add("Name", typeof(string));

                foreach (string goal in goals)
                {
                    DataRow dr = data.NewRow();
                    int startingIndex = 0;
                    dr.SetField(startingIndex++, goal);
                    data.Rows.Add(dr);
                }
            }
            return data;
        }

        private static DataTable MappingEducations(List<BatchEducationAddRequest> educations, int userId)
        {
            DataTable data = null;

            if (educations != null)
            {
                data = new DataTable();
                data.Columns.Add("InstitutionId", typeof(int));
                data.Columns.Add("EdProgramTypeId", typeof(int));
                data.Columns.Add("SpecializationTypeId", typeof(int));
                data.Columns.Add("DateStart", typeof(DateTime));
                data.Columns.Add("DateEnd", typeof(DateTime));
                data.Columns.Add("Description", typeof(String));
                data.Columns.Add("IsGraduated", typeof(bool));
                data.Columns.Add("CreatedBy", typeof(int));
                data.Columns.Add("ModifiedBy", typeof(int));

                foreach (BatchEducationAddRequest education in educations)
                {
                    DataRow dr = data.NewRow();
                    int startingIndex = 0;
                    dr.SetField(startingIndex++, education.InstitutionId);
                    dr.SetField(startingIndex++, education.EdProgramTypeId);
                    dr.SetField(startingIndex++, education.SpecializationTypeId);
                    dr.SetField(startingIndex++, education.DateStart);
                    dr.SetField(startingIndex++, education.DateEnd);
                    dr.SetField(startingIndex++, education.Description);
                    dr.SetField(startingIndex++, education.IsGraduated);
                    dr.SetField(startingIndex++, userId);
                    dr.SetField(startingIndex++, userId);

                    data.Rows.Add(dr);
                }
            }
            return data;
        }

        private static DataTable MappingExperiences(List<BatchExperienceAddRequest> experiences, int userId)
        {
            DataTable data = null;

            if (experiences != null)
            {
                data = new DataTable();
                data.Columns.Add("Title", typeof(String));
                data.Columns.Add("EmploymentTypeId", typeof(int));
                data.Columns.Add("CompanyName", typeof(String));
                data.Columns.Add("LocationId", typeof(int));
                data.Columns.Add("IsCurrent", typeof(bool));
                data.Columns.Add("DateStart", typeof(DateTime));
                data.Columns.Add("DateEnd", typeof(DateTime));
                data.Columns.Add("Description", typeof(String));
                data.Columns.Add("CreatedBy", typeof(int));
                data.Columns.Add("ModifiedBy", typeof(int));

                foreach (BatchExperienceAddRequest experience in experiences)
                {
                    DataRow dr = data.NewRow();
                    int startingIndex = 0;
                    dr.SetField(startingIndex++, experience.Title);
                    dr.SetField(startingIndex++, experience.EmploymentTypeId);
                    dr.SetField(startingIndex++, experience.CompanyName);
                    dr.SetField(startingIndex++, experience.LocationId);
                    dr.SetField(startingIndex++, experience.IsCurrent);
                    dr.SetField(startingIndex++, experience.DateStart);
                    dr.SetField(startingIndex++, experience.DateEnd);
                    dr.SetField(startingIndex++, experience.Description);
                    dr.SetField(startingIndex++, userId);
                    dr.SetField(startingIndex++, userId);

                    data.Rows.Add(dr);
                }
            }
            return data;
        }

        private static ResumeView MapSingleResumeView(IDataReader reader, ref int startingIndex)
        {
            ResumeView resumeView = new ResumeView();
            resumeView.Id = reader.GetSafeInt32(startingIndex++);
            resumeView.ViewerId = reader.GetSafeInt32(startingIndex++);
            resumeView.ResumeId = reader.GetSafeInt32(startingIndex++);
            resumeView.DateCreated = reader.GetSafeDateTime(startingIndex++);
            return resumeView;
        }
    }
}
