package com.events.service;

import java.util.List;

import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.events.beans.UserBean;

public interface UploadService {
	
	void upload(MultipartHttpServletRequest multipartRequest);
	
	List<UserBean> getUsersFromFile(Sheet sheet);
}
