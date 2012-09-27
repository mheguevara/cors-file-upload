$(document).ready(function(){

	var button = $("button#upload");
	button.click(function(e){
		e.preventDefault();
	
		var pgtext = $('span#pgtext');
		var img = $('img');
		var response = $('span#response');
		var progress = $("progress");

		var file = document.getElementById("file").files[0];
		var xhr = new XMLHttpRequest();
		var fd = new FormData();
		var key = (new Date().getTime())+file.name;
		fd.append("key",key);
		fd.append("AWSAccessKeyId","AKIAIXZM7UG7HANP3EUA");
		fd.append("acl","public-read");
		fd.append("policy","eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLAoiY29uZGl0aW9ucyI6IFsgCiAgeyJidWNrZXQiOiAibWhlZ3VldmFyYSJ9LCAKICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgeyJhY2wiOiAicHVibGljLXJlYWQifSwKICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDEwNzM3NDE4MjRdCl0KfQo=");
		fd.append("signature","eaXBQskgIKp20qYA8M9MNQp7TVY=");
		fd.append("Content-Type",file.type);
		fd.append("file",file);
		xhr.open("POST","https://mheguevara.s3.amazonaws.com",true);

		xhr.upload.addEventListener('progress',function(e){
			if(e.lengthComputable){
				var ratio = (e.loaded/e.total) * 100;
				progress.attr({value:ratio});
				var ratioString = ratio.toString();
				var pointIndex = ratioString.indexOf(".");
				if(pointIndex > -1)
					ratioString = ratioString.slice(0,pointIndex);
				pgtext.html("%"+ratioString);
			}
		});

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				progress.hide();
				pgtext.hide();
				img.hide();
				response.html('Download the file from <a href="https://s3.amazonaws.com/mheguevara/'+key+'">here</a>');
				response.show();
			}
		};

		response.hide();
		progress.show();
		img.show();
		pgtext.show();		
		xhr.send(fd);

	});

});
