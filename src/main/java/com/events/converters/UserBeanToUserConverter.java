package com.events.converters;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.events.beans.UserBean;
import com.events.common.EventConstants;
import com.events.domain.User;
import com.events.domain.UserGroup;
import com.events.repository.GroupRepository;
import com.events.service.impl.BeanMapper;

/**
 * Converter class for converting EventBean to Event
 */
@Component
public class UserBeanToUserConverter implements Converter<UserBean, User> {

    @Autowired
    private BeanMapper mapper;
    
    @Resource 
    private GroupRepository groupRepository;

    @Override
    public User convert(UserBean userBean) {
    	Set<UserGroup> userGroups = new HashSet<>();
    	User user = mapper.map(userBean, User.class, null);
		UserGroup userGroup = new UserGroup();
    	userGroup.setGroup(groupRepository.findByName(EventConstants.GLOBAL_GROUP));
    	userGroup.setUser(user);
    	userGroups.add(userGroup);
        if (CollectionUtils.isNotEmpty(userBean.getGroups())) {
        	for(String group: userBean.getGroups()) {
        		UserGroup groupUser = new UserGroup();
        		groupUser.setGroup(groupRepository.findByName(group));
        		groupUser.setUser(user);
        		userGroups.add(groupUser);
        	}
        } 
        user.setUserGroups(userGroups);
        return user;
    }

}
