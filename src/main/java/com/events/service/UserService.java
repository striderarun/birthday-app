package com.events.service;

import java.util.List;

import com.events.beans.UserBean;

public interface UserService {

	UserBean createUser(UserBean userBean);
	
	void uploadUserImage(Long id, byte[] image);
	
	List<UserBean> getUsers();
	
	void deleteUser(Long id);
	
	byte[] getUserImage(Long id);
}
