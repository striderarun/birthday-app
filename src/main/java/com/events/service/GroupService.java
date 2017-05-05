package com.events.service;

import java.util.List;

import com.events.beans.GroupBean;
import com.events.beans.UserBean;

public interface GroupService {

	GroupBean createGroup(GroupBean groupBean);
	
	void deleteGroup(Long id);
	
	List<GroupBean> getGroups();
	
	List<UserBean> getGroupUsers(Long id);
}
