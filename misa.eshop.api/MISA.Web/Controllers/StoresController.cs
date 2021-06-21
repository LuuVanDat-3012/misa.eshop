using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entity;
using MISA.ApplicationCore.Interface;
using MISA.ApplicationCore.Interface.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Web.Controllers
{
    public class StoresController : BaseEntitiesController<Store>
    {
        IStoreService _storeService;
        public StoresController(IStoreService storeService) : base(storeService)
        {
            _storeService = storeService;
        }

        [HttpPost("Filter")]
        public IActionResult GetStoreFilter([FromBody] ObjectFilter objectFilter)
        {
            var result = _storeService.GetStoreFilter(objectFilter);
            return Ok(result);
        }
    }
}
