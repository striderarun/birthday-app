package com.events.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.events.beans.UserBean;
import com.events.common.Gender;
import com.events.service.UploadService;
import com.events.service.UserService;

@Service
public class UploadServiceImpl implements UploadService {

	@Autowired
	private UserService userService;
	
	@Override
	public void upload(MultipartHttpServletRequest multipartRequest) {
		final Iterator<String> fileNames = multipartRequest.getFileNames();
		byte[] fileData = null;
		while (fileNames.hasNext()) {
			final String fileName = fileNames.next();
			final MultipartFile multipartFile = multipartRequest.getFile(fileName);
			try {
				fileData = multipartFile.getBytes();
			} catch (IOException e) {
				e.printStackTrace();
			}
			ByteArrayInputStream aByteArrayInputStream = new ByteArrayInputStream(fileData);
			try {
				Workbook xssfWorkbook = WorkbookFactory.create(aByteArrayInputStream);
				Sheet sheet = xssfWorkbook.getSheetAt(0);
				List<UserBean> users = getUsersFromFile(sheet);
				for(UserBean user: users) {
					userService.createUser(user);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}
	
	@Override
	public List<UserBean> getUsersFromFile(Sheet sheet) {
		List<UserBean> userBeans = new ArrayList<>();
		int theRowNumber = sheet.getPhysicalNumberOfRows();
		Row header = sheet.getRow(0);
		for (int r = 1; r <= theRowNumber; r++) {
			Row aRow = sheet.getRow(r);
			if (aRow == null) {
				continue;
			}
			UserBean userBean = new UserBean();
			int cells = aRow.getPhysicalNumberOfCells();
			for (int c = 0; c <= cells; c++) {
				Cell cell = aRow.getCell(c);
				if (null == cell) {
					System.out.println("null");
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("First name") && StringUtils.isNotBlank(cell.getStringCellValue())) {
					userBean.setFirstName(cell.getStringCellValue());
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("Middle Name") && StringUtils.isNotBlank(cell.getStringCellValue())) {
					userBean.setMiddleName(cell.getStringCellValue());
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("Last Name") && StringUtils.isNotBlank(cell.getStringCellValue())) {
					userBean.setLastName(cell.getStringCellValue());
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("Gender") && StringUtils.isNotBlank(cell.getStringCellValue())) {
					userBean.setGender(Gender.valueOf(cell.getStringCellValue()));
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("Primary Email") && StringUtils.isNotBlank(cell.getStringCellValue())) {
					userBean.setPrimaryEmail(cell.getStringCellValue());
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("Secondary Email") && StringUtils.isNotBlank(cell.getStringCellValue())) {
					userBean.setSecondaryEmail(cell.getStringCellValue());
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("Birth Date") && null != cell.getDateCellValue()) {
					userBean.setBirthDate(new DateTime(cell.getDateCellValue()));
				} else if (header.getCell(c).getStringCellValue().equalsIgnoreCase("Nick Name") && StringUtils.isNotBlank(cell.getStringCellValue())) {
					userBean.setNickName(cell.getStringCellValue());
				}
			}
			userBeans.add(userBean);
		}
		return userBeans;
	}

}
