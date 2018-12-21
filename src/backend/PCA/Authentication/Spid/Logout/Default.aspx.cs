/*
 * Licensed to Jasig under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Jasig licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a
 * copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

using System;
using System.Web;
using DotNetCasClient;
using log4net;

namespace Authentication.Spid.Logout
{
    public partial class Default : System.Web.UI.Page
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        protected void Page_Load(object sender, EventArgs e)
        {

            if (HttpContext.Current == null || HttpContext.Current.Session == null)
            {
                throw new System.ApplicationException("Current Session is null!");
            }

            CasAuthentication.SingleSignOut();

            if (!HttpContext.Current.Request.IsAuthenticated)
            {
                if(CasAuthentication.CasClientUrl != null)
                {
                    string redirectUrl = CasAuthentication.CasClientUrl + "/spid";
                    log.Info("Logout Redirect to: " + redirectUrl);
                    Response.Redirect(redirectUrl);
                }
            }

        }
    }
}