package com.events.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.events.beans.GroupBean;
import com.events.beans.UserBean;
import com.events.domain.Group;
import com.events.domain.User;
import com.events.domain.UserGroup;
import com.events.repository.GroupRepository;
import com.events.repository.UserGroupRepository;
import com.events.service.GroupService;


@Service
public class GroupServiceImpl implements GroupService {

	@Resource 
    private GroupRepository groupRepository;
	
	@Resource 
    private UserGroupRepository userGroupRepository;
	
	@Autowired
	private BeanMapper mapper;
	
	@Override
	public GroupBean createGroup(GroupBean groupBean) {
		Group group = mapper.map(groupBean, Group.class, null);
		group = groupRepository.save(group);
		return mapper.map(group, GroupBean.class, null);
	}

	@Override
	public void deleteGroup(Long id) {
		groupRepository.delete(id);
	}

	@Override
	public List<GroupBean> getGroups() {
		List<Group> groups = groupRepository.findAll();
		return mapper.mapIterable(groups, GroupBean.class, null);
	}

	@Override
	public List<UserBean> getGroupUsers(Long id) {
		List<UserGroup> userGroups = userGroupRepository.findByGroupId(id);
		List<User> users = userGroups.stream().map(g -> g.getUser()).collect(Collectors.toList());
		return mapper.mapIterable(users, UserBean.class, null);
	}
}
