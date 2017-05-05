package com.events.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.events.logging.Loggable;
import com.events.service.UploadService;

@Controller
@RequestMapping(value = "/services/upload")
public class UploadRestService {

	@Autowired
	private UploadService uploadService;
	
	@Loggable
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void uploadUsers(MultipartHttpServletRequest multipartRequest) {
		uploadService.upload(multipartRequest);
	}
	
}
