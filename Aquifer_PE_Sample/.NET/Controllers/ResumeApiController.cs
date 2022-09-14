using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AquiferPE.Models;
using AquiferPE.Models.Domain;
using AquiferPE.Models.Domain.Resumes;
using AquiferPE.Models.Requests.Resumes;
using AquiferPE.Services;
using AquiferPE.Services.Interfaces;
using AquiferPE.Web.Controllers;
using AquiferPE.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace AquiferPE.Web.Api.Controllers
{
    [Route("api/resumes")]
    [ApiController]
    public class ResumeApiController : BaseApiController
    {
        private IResumesService _service = null;
        private ILookUpService _lookUp = null;   
        private IAuthenticationService<int> _authService = null;
        public ResumeApiController(IResumesService service
            , ILogger<ResumeApiController> logger
            , ILookUpService lookUp
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _lookUp = lookUp;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Resume>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Resume resumeBuild = _service.GetById(id);

                if (resumeBuild == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Resume> { Item = resumeBuild };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse("$Generic Error: ${ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Resume>>> GetByPage(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<Resume> pagedList = _service.GetAllByPage(pageIndex, pageSize);

                if (pagedList == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Resume>> response = new ItemResponse<Paged<Resume>>();
                    response.Item = pagedList;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return result;

        }

        [HttpGet("dropdown")]
        public ActionResult<ItemResponse<Dictionary<string, List<LookUp>>>> GetDropdown()
        {
            ActionResult result = null;
            string[] dropdownList = {
                "EmploymentTypes",
                "Institution",
                "EdProgramTypes",
                "SpecializationTypes",
                "FreelanceGoalTypes",
                "Skills"};

            try
            {
                Dictionary<string, List<LookUp>> dropdownArr = _lookUp.GetMany(dropdownList);

                if (dropdownArr == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Dictionary<string, List<LookUp>>> response = new ItemResponse<Dictionary<string, List<LookUp>>>();
                    response.Item = dropdownArr;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return result;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ResumeAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPost("v2")]
        public ActionResult<ItemResponse<int>> CreateV2(ResumeAddRequestV2 model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.AddV2(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ResumeUpdateRequest model, int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model, userId);
                response = new SuccessResponse();

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpPost("views/{id:int}")]
        public ActionResult<ItemResponse<int>> CreateResumeView(int id)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                ResumeViewAddRequest model = new ResumeViewAddRequest();
                model.ViewerId = _authService.GetCurrentUserId();
                model.ResumeId = id;
                int newId = _service.AddResumeView(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = newId };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }


        [HttpGet("viewscount/{id:int}")]
        public ActionResult<ItemResponse<int>> GetViewsByResumeId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int count = _service.GetResumeViewCount(id);

                if (count == 0)
                {
                    iCode = 404;
                    response = new ErrorResponse("No Views Found");
                }
                else
                {
                    response = new ItemResponse<int> { Item = count };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("views/{id:int}")]
        public ActionResult<ItemResponse<ResumeView>> GetResumeViewById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                ResumeView view = _service.GetResumeViewById(id);

                if (view == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("No Views Found");
                }
                else
                {
                    response = new ItemResponse<ResumeView> { Item = view };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("viewspage")]
        public ActionResult<ItemResponse<Paged<ResumeView>>> GetViewsPageByResumeId(int pageIndex, int pageSize, int resumeId)
        {
            ActionResult result = null;

            try
            {
                Paged<ResumeView> pagedViews = _service.GetResumeViewsByResumeId(pageIndex, pageSize, resumeId);

                if (pagedViews == null)
                {
                    result = NotFound404(new ErrorResponse("Views Not Found"));
                }
                else
                {
                    ItemResponse<Paged<ResumeView>> response = new ItemResponse<Paged<ResumeView>>();
                    response.Item = pagedViews;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return result;

        }
    }
}
