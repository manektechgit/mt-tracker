using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using EWebList.DataRepository.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Text;

namespace TimeTrackerMt.Common
{
    public class Email
    {
        public const string SITE_NAME = "TimeTrackerMt";
        public EmailSettings emailSettings = new EmailSettings();
        public string logoUrl = string.Empty;
        private readonly IGeneralGenericFunction _generalGenericFunction;
        private readonly IHostingEnvironment _environment;

        public Email(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration, IHostingEnvironment env)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
            _environment = env;
        }

        public IConfiguration _configuration { get; }

        public void ForgetPasswordMail(UserMaster userMaster)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.FORGET_PASSWORD;
                string subject = "Reset Your Password ! " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                string forgetPasswordUrl = _configuration["clientWebUrl"] + "reset-password?userid=" + CrptographyEngine.Base64Encode(userMaster.UserId.ToString());
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#fullname#]", userMaster.FirstName)
                    .Replace("[#resetPass#]", forgetPasswordUrl)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, userMaster.Email);
            }
            catch (Exception)
            {
            }
        }

        public void InviteUserMail(long userId, string email)
        {
            try
            {
                string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.INVITE_USER;
                string subject = "Invitation ! " + SITE_NAME;
                logoUrl = _configuration["baseUrl"] + "images/logo.png";
                string acceptinvitationUrl = _configuration["clientWebUrl"] + "accept-invitation?userid=" + CrptographyEngine.Base64Encode(userId.ToString());
                StreamReader str = new StreamReader(path);
                LoadEmailSettings();
                emailSettings.EmailTemplate = str.ReadToEnd();
                str.Close();
                string MailText = emailSettings.EmailTemplate
                    .Replace("[#LogoUrl#]", logoUrl)
                    .Replace("[#acceptinvitation#]", acceptinvitationUrl)
                    .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

                SendMail(MailText, subject, email);
            }
            catch (Exception)
            {
            }
        }

        public void SuccessMessage(object user)
        {
            throw new NotImplementedException();
        }

        public void SuccessMessage(UserMaster userMaster)
        {

            string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.REGISTRATION_ACKNOWLEDGE;
            string subject = "Message Send Sucessfully ! " + SITE_NAME;
            StreamReader str = new StreamReader(path);
            LoadEmailSettings();
            emailSettings.EmailTemplate = str.ReadToEnd();
            str.Close();
            string MailText = emailSettings.EmailTemplate
                .Replace("[#fullname#]", userMaster.Email)
                .Replace("[#password#]", CrptographyEngine.Decrypt(userMaster.Password))
                .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

            SendMail(MailText, subject, userMaster.Email);


        }

        public void ProjectMessage(UserProjects userProject)
        {
            string path = Environment.CurrentDirectory + "/TemplateEmail/" + MailTemplates.ASSIGN_PROJECT;
            string subject = "New Project Assign ! " + SITE_NAME;
            StreamReader str = new StreamReader(path);
            LoadEmailSettings();
            emailSettings.EmailTemplate = str.ReadToEnd();
            str.Close();
            string MailText = emailSettings.EmailTemplate
                .Replace("[#Name#]", userProject.Name)
                .Replace("[#ProjectName#]", userProject.ProjectName)
                .Replace("[#SignatureName#]", emailSettings.MailSignatureName);

            SendMail(MailText, subject, userProject.Email);


        }

        private void LoadEmailSettings()
        {
            var result = _generalGenericFunction.ExecuteProcedure<EmailSettings>("GetMailSetting", null);
            emailSettings.MailFrom = result.MailFrom;
            emailSettings.Password = result.Password;
            emailSettings.MailSignatureName = result.MailSignatureName;
            emailSettings.ServerName = result.ServerName;
            emailSettings.Port = result.Port;
            emailSettings.EnableSsl = result.EnableSsl;
            emailSettings.UserName = result.UserName;
            emailSettings.AdminEmail = result.AdminEmail;
        }

        private async Task SendMail(string body, string subject, string toAddress)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(emailSettings.MailFrom, "mttracker");
                    mail.To.Add(toAddress);
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = true;

                    using (SmtpClient smtp = new SmtpClient(emailSettings.ServerName, Convert.ToInt16(emailSettings.Port)))
                    {
                        smtp.EnableSsl = emailSettings.EnableSsl;
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(emailSettings.MailFrom, emailSettings.Password);
                        smtp.Host = emailSettings.ServerName;
                        smtp.Port = Convert.ToInt16(emailSettings.Port);

                        await smtp.SendMailAsync(mail);
                    }
                }
            }
            catch (Exception em)
            {
                em.ToString();
            }
        }
    }

    public class MailTemplates
    {
        public static string CONTACT_US = "ContactUs.html";
        public static string CONTACT_US_USER = "ContactUsMailToUser.html";
        public static string FORGET_PASSWORD = "ForgotPassword.html";
        public static string PASSWORD_CHANGED = "PasswordChanged.html";
        public static string REGISTER_USER = "RegisterUser.html";
        public static string REGISTRATION_ACKNOWLEDGE = "RegistrationAcknowledge.html";
        public static string SITE_ADDED = "NewSiteAdded.html";
        public static string SITE_ADDED_ADMIN = "NewSiteAddedAdmin.html";
        public static string ASSIGN_PROJECT = "AssignProject.html";
        public static string INVITE_USER = "InviteUser.html";
    }
}