USE [CnmPro]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[Resumes_SelectById_Details]
								   @Id int

as

BEGIN

SELECT r_base.Id as [Id]	  
	  ,r_contact.[Name] as [Name]
	  ,r_contact.Email as [Email]
	  ,r_contact.Phone as [Phone Number]
	  ,r_base.[Description] as [Description]
	  , PastExperience =
						  (
							SELECT experience.Title as Title
								  ,experience.EmploymentTypeId as EmploymentTypeId
								  ,et.[Name] as EmploymentType
								  ,experience.CompanyName as CompanyName
								  ,experience.LocationId as LocationId
								  ,l.city as City
								  ,l.zip as Zip										    
								  ,experience.IsCurrent as IsCurrentJob
							FROM dbo.Experience as experience inner join dbo.ResumeExperience as ex
												on ex.ExperienceId = experience.Id
															  inner join dbo.EmploymentTypes as et
												on et.Id = experience.EmploymentTypeId
															  inner join dbo.Locations as l
												on l.Id = experience.LocationId
							WHERE ex.ResumeId = @Id AND r_base.Id = @Id

							FOR JSON PATH
						  )
	  ,[Education] =
						  (
							SELECT education.InstitutionId as [InstitutionId]
								  ,inst.[Name] as [Institution]
								  ,education.EdProgramTypeId as [EdProgramTypeId]
								  ,edprgm.[Name] as [EducationProgramType]
								  ,education.SpecializationTypeId as [SpecializationTypeId]
								  ,spelzn.[Name] as [Specialization]
								  ,education.DateStart as [StartDate]
								  ,education.DateEnd as [EndDate]
								  ,education.[Description] as [Description]
							FROM dbo.Education as education inner join dbo.ResumeEducation as ed
											   on ed.EducationId = education.Id
															inner join dbo.Institution as inst
											   on inst.Id = education.InstitutionId
															inner join dbo.EdProgramTypes as edprgm
											   on edprgm.Id = education.EdProgramTypeId
															inner join dbo.SpecializationTypes as spelzn
											   on spelzn.Id = education.SpecializationTypeId
							WHERE ed.ResumeId = @Id
							FOR JSON PATH
						  )

	  ,[Freelance Goals] =
						  (
							SELECT  freelance.Id as Id
								   ,freelance.[Name] as [FreelanceGoal]
							FROM dbo.FreelanceGoalTypes as freelance inner join dbo.ResumeFreelanceGoalType as fr
													    on fr.FreelanceGoalTypeId = freelance.Id
							WHERE fr.ResumeId = @Id
							FOR JSON AUTO
						  )

	  ,[List of Skills] = 
						  (
							SELECT   skills.Id as Id
									,skills.Name as [Skill]
							FROM dbo.Skills as skills inner join dbo.ResumeSkills as sk
										    on sk.SkillId = skills.Id
							WHERE sk.ResumeId = @Id
							FOR JSON AUTO
						  )
	  ,r_base.ResumeFileId as [Resume File Id]

FROM dbo.Resumes as r_base inner join dbo.ResumeContact as r_contact
				 on r_base.ResumeContactId = r_contact.Id

WHERE r_base.Id = @Id

END
