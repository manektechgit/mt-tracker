using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.IO;
using TimeTrackerMt.DataRepository.Model;

namespace EWebList.API
{
    public class ImageHelpers
    {
        private readonly IHostingEnvironment _environment;
        public IConfiguration _configuration { get; }

        public ImageHelpers(IHostingEnvironment environment, IConfiguration configuration)
        {
            _environment = environment;
            _configuration = configuration;
        }

        public void SaveImageToDirectory(UserScreenshot userScreenshot)
        {
            string directory = string.Empty;
            directory = _environment.WebRootPath + @"\" + _configuration["FileUploadDirectory:Screenshot"] + @"\" + userScreenshot.UserId;
            DirectoryInfo dir1;
            dir1 = new DirectoryInfo(directory);
            if (!dir1.Exists)
                dir1.Create();

            var uploads = Path.Combine(directory, userScreenshot.Image);
            if (System.IO.File.Exists(uploads))
            {
                System.IO.File.Delete(uploads);
            }

            using (var fs = new FileStream(uploads, FileMode.CreateNew))
            {
                fs.Write(System.Convert.FromBase64String(userScreenshot.fileAsBase64), 0, System.Convert.FromBase64String(userScreenshot.fileAsBase64).Length);
            }
        }
    }
}