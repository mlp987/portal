﻿<%@ Page Language="C#" Inherits="Appleseed.Framework.Web.UI.Page" MasterPageFile="~/Shared/SiteMasterDefault.master" %>


<asp:Content ID="Content1" ContentPlaceHolderID="Content" runat="Server">
    <br />
    <label id="Message" class="Error"></label>
    <br />
    <div id="Fields">
        <%  string email = string.Empty;
            if (Request.QueryString["email"] != null) {
                email = Request.QueryString["email"];
           } %>
        <label id="EmailLabel"><%= Appleseed.Framework.General.GetString("EmailAddress", "Email Address") %>: </label><input type="text" id="UsersEmail" class="NormalTextBox pwdClass" value="<%= email %>"/>
        <br />
        <input type="button" id="SendPasswordBtn" class="CommandButton" value="<%= Appleseed.Framework.General.GetString("SendEmail", "Send Email") %>" onclick="sendPasswordToken()" />
    </div>
     


     <script type="text/javascript">

         function sendPasswordToken() {

             var email = $('#UsersEmail').val();

             if (email != '' && validateEmail(email)) {

                 $.ajax({
                     url: '<%= Url.Action("sendPasswordToken")%>',
                     type: 'POST',
                     data: {
                         "email": email
                     },
                     success: function (data) {
                         $('#Message').text(data.Message);
                         if (data.ok) {
                             $('#Fields').hide();
                         }
                     },
                     error: function (data) {
                         $('#Message').text(data.Message);

                     }
                 });
             }
             else {
                 $('#Message').text('<%= Appleseed.Framework.General.GetString("InvalidEmail", "The email is invalid") %>');
             }
         }
         
         function validateEmail(email) { 
             var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             if (re.test(email)) {
                 console.log('Email true');
                 return true;
             }
             else {
                 console.log('Email false');
                 return false;
             }

         } 
     
     </script>
    

</asp:Content>